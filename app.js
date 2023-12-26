const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const { run } = require("./db/db");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploadimage"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.json());
var screenWidth;

app.post("/setScreenWidth", (req, res) => {
  screenWidth = req.body.screenWidth;
  console.log("Received screen width:", screenWidth);

  res.sendStatus(200);
});
//////////// start of session ////////////////////////////////

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "academia_plus_session",
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

/////////////////////end of session code///////////////////////////

////////////////////////file Upload///////////////////////////////
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadimage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

////////////////////////////////////File Upload End///////////////////

//////////////////////Database Connection Strat/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////end of bd connection prototype////////////////////////////////////////////////////////

////////////////////////////////////////////All Get Request ////////////////////////////////////////////////////////////////////////////////
app.get("/", async function (req, res) {
  res.redirect("index");
});

app.get("/index", async function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("index", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("index", { logged_in: false });
    }
  } catch {
    res.render("index", { logged_in: false });
  }
});

app.get("/admission", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("admission", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("admission", { logged_in: false });
    }
  } catch {
    res.render("admission", { logged_in: false });
  }
});

app.get("/events", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("events", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("events", { logged_in: false });
    }
  } catch {
    res.render("events", { logged_in: false });
  }
});

app.get("/history", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("history", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("history", { logged_in: false });
    }
  } catch {
    res.render("history", { logged_in: false });
  }
});

app.get("/achievements", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("achievements", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("achievements", { logged_in: false });
    }
  } catch {
    res.render("achievements", { logged_in: false });
  }
});

app.get("/facultyStaffInfo", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("facultyStaffInfo", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("facultyStaffInfo", { logged_in: false });
    }
  } catch {
    res.render("facultyStaffInfo", { logged_in: false });
  }
});

app.get("/message", async function (req, res) {
  const gline = await run('SELECT * FROM "ACADEMIA_PLUS_NEW"."MESSAGE"');
  console.log(gline.data);

  if (gline.success) {
    try {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  } else {
    try {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  }
});

app.get("/governingbody", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("governingbody", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("governingbody", { logged_in: false });
    }
  } catch {
    res.render("governingbody", { logged_in: false });
  }
});

app.get("/admin", function (req, res) {
  try {
    if (!req.session.user.isAuthenticated) {
      res.render("admin_control/admin", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.redirect("log_in");
    }
  } catch {
    res.redirect("log_in");
  }
});

app.get("/GuidelineforParents", async function (req, res) {
  const gline = await run(
    'SELECT * FROM "ACADEMIA_PLUS_NEW"."GUIDELINE_FOR_PARRENTS"'
  );
  console.log(gline.data);

  if (gline.success) {
    try {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  } else {
    try {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  }
});

app.get("/library", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("library", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("library", { logged_in: false });
    }
  } catch {
    res.render("library", { logged_in: false });
  }
});

app.get("/clubs", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("clubs", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("clubs", { logged_in: false });
    }
  } catch {
    res.render("clubs", { logged_in: false });
  }
});

app.get("/notice", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("notice", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("notice", { logged_in: false });
    }
  } catch {
    res.render("notice", { logged_in: false });
  }
});

app.get("/contact", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("contact", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("contact", { logged_in: false });
    }
  } catch {
    res.render("contact", { logged_in: false });
  }
});

app.get("/codeofconduct", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("codeofconduct", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("codeofconduct", { logged_in: false });
    }
  } catch {
    res.render("codeofconduct", { logged_in: false });
  }
});

app.get("/routine", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("routine", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("routine", { logged_in: false });
    }
  } catch {
    res.render("routine", { logged_in: false });
  }
});

app.get("/photos", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("photos", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("photos", { logged_in: false });
    }
  } catch {
    res.render("photos", { logged_in: false });
  }
});

app.get("/videos", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("videos", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("videos", { logged_in: false });
    }
  } catch {
    res.render("videos", { logged_in: false });
  }
});

app.get("/calender", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("calender", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("calender", { logged_in: false });
    }
  } catch {
    res.render("calender", { logged_in: false });
  }
});

app.get("/cocur", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("cocur", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("cocur", { logged_in: false });
    }
  } catch {
    res.render("cocur", { logged_in: false });
  }
});

app.get("/dress", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("dress", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("dress", { logged_in: false });
    }
  } catch {
    res.render("dress", { logged_in: false });
  }
});

app.get("/apply", function (req, res) {
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

app.get("/applicant_dashboard", function (req, res) {
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

app.get("/log_in", async function (req, res) {
  res.render("log_in");
});

let uniqueNumbersArray = [0, 0];

app.get("/exam", async function (req, res) {
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
});

app.get("/exam_started", async function (req, res) {
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

app.get("/result", async function (req, res) {
  const result = await run(
    'SELECT RESULT FROM "ACADEMIA_PLUS_NEW"."ADMISSION_RESULT" WHERE APPLICANT_ID= :applicant_id ORDER BY TIME ASC',
    { applicant_id: req.session.user.id }
  );
  console.log(result.data);
  try {
    if (req.session.user.isAuthenticated) {
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
app.get("/forgetpass", async function (req, res) {
  res.render("forgetpass");
});

app.get("/admit_card_download", async function (req, res) {
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
      const columnsWithSpaces = columns.data.map(item => ({
        0: item[0].replace(/_/g, ' '),
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

app.get("/students_dashboard", function (req, res) {
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
  res.render("students/studentdashboard", {
    logged_in: req.session.user.isAuthenticated,
  });
});
/////////////////////////////////////////////All Get Request///////////////////////////////////////////////////////////////

////////////////////////////////////////////All Post Req////////////////////////////////////////////////////////////////////

app.post("/applyform", upload.single("image"), async function (req, res) {
  const data = req.body;
  const image_name = req.file.filename;

  const det_id = await run(
    'SELECT APPLICANT_ID FROM "ACADEMIA_PLUS_NEW"."APPLICANTS" WHERE MOBILE_NO= :phone_no',
    { phone_no: data.phone_no }
  );
  console.log("Det_id:" + det_id);
  if (det_id && det_id.data && det_id.data.length > 0) {
    res.json({ reply: false });
  } else {
    const det = await run(
      `
  INSERT INTO APPLICANTS (
    APPLICANT_NAME, MOBILE_NO, FATHER_NAME, MOTHER_NAME,
    P_ADDRESS, C_ADDRESS, DOB, CLASS, IMAGE_ADDRESS
  ) VALUES (
    :student_name, :phone_no, :father_name, :mother_name,
    :present_address, :current_address, TO_DATE(:dob, 'YYYY-MM-DD'),
    :class, :image
  )`,
      {
        student_name: data.student_name,
        phone_no: data.phone_no,
        father_name: data.father_name,
        mother_name: data.mother_name,
        present_address: data.present_address,
        current_address: data.current_address,
        dob: data.dob,
        class: data.class,
        image: image_name,
      }
    );

    const s_id = await run(
      'SELECT APPLICANT_ID FROM "ACADEMIA_PLUS_NEW"."APPLICANTS" WHERE MOBILE_NO= :phone_no',
      { phone_no: data.phone_no }
    );

    res.json({ reply: det.success, p_no: data.phone_no, a_id: s_id.data });
  }
});

app.post("/login", async function (req, res) {
  let data = req.body;
  const info = await run(
    'SELECT * FROM "ACADEMIA_PLUS_NEW"."APPLICANTS" WHERE MOBILE_NO = :phone_no AND APPLICANT_ID = :password',
    { phone_no: data.phone_no, password: data.password }
  );
  console.log(info);
  if (info.data.length > 0) {
    req.session.user = {
      id: info.data[0][0],
      name: info.data[0][1],
      account_type: "Applicant",
      isAuthenticated: true,
    };

    req.session.save(function () {
      res.json({ reply: info.success, data: info.data });
    });
  } else {
    res.json({ reply: info.success, data: info.data });
  }
});

app.post("/exam_submit", async function (req, res) {
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

app.post("/logout", async function (req, res) {
  req.session.user.isAuthenticated = false;

  res.redirect("/index");
});

app.listen(3000);
