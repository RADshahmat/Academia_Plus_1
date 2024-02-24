const express = require("express");
const router = express.Router();
const { run } = require("../db/db");
const upload = require("../multer/multer");





const authenticateUser = (req, res, next) => {
  try {
    if (
      !req.session.user.isAuthenticated ||
      req.session.user.account_type !== "teacher"
    ) {
      res.redirect("log_in");
      return;
    }
    next();
  } catch (error) {
    console.error(error);
    res.redirect("log_in");
  }
};





router.get("/teachersdashboard", authenticateUser, (req, res) => {
  console.log(req.session.user);
  res.render("teacher/teachersdashboard", {
    logged_in: req.session.user.isAuthenticated,
  });
});

router.get("/courseoverview", authenticateUser, (req, res) => {
  console.log(req.session.user);
  res.render("teacher/courseoverview", {
    logged_in: req.session.user.isAuthenticated,
  });
});

router.get("/class1overview", authenticateUser, async (req, res) => {
  const gline = await run(
    'SELECT OVERVIEW FROM "ACADEMIA_PLUS_NEW"."COURSEOVERVIEW" WHERE CLASS = \'1\''
  );
  console.log(gline.data);

  if (gline.success) {
    try {
      res.render("teacher/class1overview", {
        gline: gline.data,
        db_stat1: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("teacher/class1overview", {
        gline: gline.data,
        db_stat1: gline.success,
        logged_in: false,
      });
    }
  } else {
    try {
      res.render("class1overview", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("class1overview", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  }
});

router.get("/class2overview", authenticateUser, async (req, res) => {
  const gline = await run(
    'SELECT OVERVIEW FROM "ACADEMIA_PLUS_NEW"."COURSEOVERVIEW" WHERE CLASS = \'2\''
  );
  console.log(gline.data);

  if (gline.success) {
    try {
      res.render("teacher/class2overview", {
        gline: gline.data,
        db_stat1: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("teacher/class2overview", {
        gline: gline.data,
        db_stat1: gline.success,
        logged_in: false,
      });
    }
  } else {
    try {
      res.render("class2overview", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("class2overview", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  }
});

router.get("/resource", authenticateUser, (req, res) => {
  console.log(req.session.user);
  res.render("teacher/resource", {
    logged_in: req.session.user.isAuthenticated,
  });
});

router.get("/class1resource", authenticateUser, async (req, res) => {
  const data = await run(`select * from RESOURCES`);
  console.log(data);
  console.log(req.session.user);
  res.render("teacher/class1resource", {
    logged_in: req.session.user.isAuthenticated,
    resources_info: data.data,
  });
});

router.post("/add_resources", authenticateUser, upload.single("fileInput"), async (req, res) => {
  const data = req.body;
  const file_name = req.file.filename;
  console.log(data, file_name);
  const feedback = await run(`
    INSERT INTO RESOURCES (
      RESOURCE_NAME, AUTHOR, TYPE, RESOURCE_FILE
    ) VALUES (
      :book_name, :author, :type, :book_file
    )`,
    {
      book_name: data.bookTitle,
      author: data.author,
      type: data.type,
      book_file: file_name,
    });
  res.redirect("class1resource");
});

router.get("/class1assignment", authenticateUser, async (req, res) => {
  const data = await run(`select * from ASSIGNMENTS`);
  console.log(data);
  console.log(req.session.user);
  res.render("teacher/class1assignment", {
    logged_in: req.session.user.isAuthenticated,
    resources_info: data.data,
  });
});

router.get("/assignment", authenticateUser, async (req, res) => {
  const data = await run(`select * from RESOURCES`);
  console.log(data);
  console.log(req.session.user);
  res.render("teacher/assignment", {
    logged_in: req.session.user.isAuthenticated,
    resources_info: data.data,
  });
});

router.post("/add_assignments", authenticateUser, async (req, res) => {
  const data = req.body;
  console.log(data)
  const feedback = await run(`
    INSERT INTO ASSIGNMENTS (
      COURSE_TITLE, ASSIGNMENT_TITLE, INSTRUCTIONS, SUB_DATE, CLASS, ASSIGNMENT_ID
    ) VALUES (
      :book_name, :author, :type, TO_DATE(:book_file, 'YYYY-MM-DD'), :class, :id
    )`,
    {
      book_name: data.courseTitle,
      author: data.assignmentTitle,
      type: data.instructions,
      book_file: data.submissionDate,
      class: data.class,
      id: data.assignmentID,
    });
  console.log(feedback)
  res.redirect("class1assignment");
});

module.exports = router;






