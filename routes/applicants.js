const express = require("express");
const router = express.Router();
const { run } = require("../db/db");

router.get("/apply", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("admission/apply", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("admission/apply", { logged_in: false });
    }
  } catch {
    res.render("admission/apply", { logged_in: false });
  }
});

router.get("/applicant_dashboard", function (req, res) {
  try {
    if (
      !req.session.user.isAuthenticated ||
      req.session.user.account_type != "Applicant"
    ) {
      res.redirect("log_in");
      return;
    }
  } catch {
    res.redirect("log_in");
    return;
  }

  console.log(req.session.user);
  res.render("admission/applicant_dashboard", {
    logged_in: req.session.user.isAuthenticated,
  });
});

router.get("/exam", async function (req, res) {

  const exam_stat=await run("SELECT * FROM EXAM");
  console.log(exam_stat.data[0][0]);

  if(exam_stat.data[0][0]==="1"){
    function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let randomNumbers = new Set();

  while (randomNumbers.size < 10) {
    let randomNumber = getRandomNumber(1, 19);

    if (!randomNumbers.has(randomNumber)) {
      randomNumbers.add(randomNumber);
    }
  }

  uniqueNumbersArray = Array.from(randomNumbers);

  console.log(uniqueNumbersArray);
  res.render("admission/exam");
  }else{
    res.redirect("applicant_dashboard");
  }


  
});

router.get("/exam_started", async function (req, res) {
  try {
    const query = `
        SELECT * FROM "ACADEMIA_PLUS_NEW"."ADMISSION_QUESTIONS"
        WHERE ID IN (${uniqueNumbersArray.join(", ")})`;

    const result = await run(query);

    const questions = result.data;

    console.log("Questions:", questions);

    res.render("admission/exam_started", { questions: questions });
  } catch (error) {
    console.error("Error in /exam_started:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/result", async function (req, res) {
  const result = await run(
    'SELECT RESULT FROM "ACADEMIA_PLUS_NEW"."ADMISSION_RESULT" WHERE APPLICANT_ID= :applicant_id ORDER BY TIME ASC',
    { applicant_id: req.session.user.id }
  );

  const result_start=await run("SELECT * FROM RESULTSTATUS");
  
  console.log(result.data);
  try {
    if (req.session.user.isAuthenticated) {
      if(result_start.data[0][0]==="0"){
        res.redirect("/applicant_dashboard")
        return 
      }
      res.render("admission/result", {
        result: result.data,
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.redirect("log_in");
    }
  } catch {
    res.redirect("log_in");
  }
});

router.get("/admit_card_download", async function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      const columns = await run(`
    SELECT COLUMN_NAME
    FROM ALL_TAB_COLUMNS
    WHERE TABLE_NAME = 'APPLICANTS' AND OWNER = 'ACADEMIA_PLUS_NEW'
  `);
      console.log(columns);
      const result = await run(
        'SELECT * FROM "ACADEMIA_PLUS_NEW"."APPLICANTS" WHERE APPLICANT_ID= :applicant_id',
        { applicant_id: req.session.user.id }
      );
      console.log(result.data);
      const columnsWithSpaces = columns.data.map((item) => ({
        0: item[0].replace(/_/g, " "),
      }));
      res.render("admission/admit_card", {
        columns: columnsWithSpaces,
        result: result.data,
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.redirect("log_in");
    }
  } catch {
    res.redirect("log_in");
  }
});

///////////////////////////////////////////////////////////////////////////////////////////

router.post("/exam_submit", async function (req, res) {
  const answers = req.body;
  const keys = Object.keys(answers).map(Number);

  const values = Object.values(answers);

  const query = `
        SELECT ANSWER FROM "ACADEMIA_PLUS_NEW"."ADMISSION_QUESTIONS"
        WHERE ID IN (${keys.join(", ")})`;

  const result = await run(query);
  console.log("result.data:", result.data);
  const correct_answers = result.data.map((item) => item[0]);
  console.log("Correct:", correct_answers);
  console.log("Keys:", keys);
  console.log("Values:", values);
  const matchingCount = values.reduce((count, value, index) => {
    const correctAnswer = correct_answers[index];

    if (value === correctAnswer) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  console.log("Matching Count:", matchingCount);

  await run(
    `
        INSERT INTO ADMISSION_RESULT (
          APPLICANT_ID, RESULT, TIME
        ) VALUES (
          :applicant_id, :result, :time
        )`,
    {
      applicant_id: req.session.user.id,
      result: matchingCount,
      time: Date.now().toString(),
    }
  );

  res.redirect("/result");
});



module.exports = router;
