const express = require("express");
const router = express.Router();
const { run } = require("../db/db");
const upload = require("../multer/multer");
const path = require('path');
const fs = require('fs');





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

router.get("/classresource", authenticateUser, async (req, res) => {
  const cls = req.query.class;
console.log(cls);
  const data = await run(`select * from RESOURCES`);
  console.log(data);
  console.log(req.session.user);
  res.render("teacher/classresource", {
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
      RESOURCE_NAME, AUTHOR, TYPE, RESOURCE_FILE,CLASS
    ) VALUES (
      :book_name, :author, :type, :book_file ,:class
    )`,
    {
      book_name: data.bookTitle,
      author: data.author,
      type: data.type,
      book_file: file_name,
      class:data.class
    });
  res.redirect("class1resource");
});

router.get("/classassignment", authenticateUser, async (req, res) => {
  const data = await run(`select * from ASSIGNMENTS`);
  console.log(data);
  console.log(req.session.user);
  res.render("teacher/classassignment", {
    logged_in: req.session.user.isAuthenticated,
    resources_info: data.data,
  });
});
router.get("/show_assignments", authenticateUser, async (req, res) => {
  const data = await run(`select * from ASSIGNMENTS where TEACHER_ID='${req.session.user.id}'`);
  console.log(data);
  console.log(req.session.user);
  res.render("teacher/show_assignments", {
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
      COURSE_TITLE, ASSIGNMENT_TITLE, INSTRUCTIONS, SUB_DATE, CLASS, TEACHER_ID
    ) VALUES (
      :book_name, :author, :type, TO_DATE(:book_file, 'YYYY-MM-DD'), :class, :id
    )`,
    {
      book_name: data.courseTitle,
      author: data.assignmentTitle,
      type: data.instructions,
      book_file: data.submissionDate,
      class: data.class,
      id: req.session.user.id,
    });
  console.log(feedback)
  res.redirect("classassignment");
});
router.post("/courseoverview", authenticateUser, async (req, res) => {
  const det=req.body.cls
  console.log(det)
  const result= await run(`select OVERVIEW from COURSEOVERVIEW where CLASS='${det}'`)
  console.log(result)

  res.json({ reply: true, data: result.data});
});
router.get("/libraryTeacher", async function (req, res) {
  try {
    if (
      req.session.user.isAuthenticated == false ||
      req.session.user.account_type != "teacher" 
    ) {
      res.redirect("log_in");
      return;
    }
  } 
  catch(e) { console.log(e)
    res.redirect("log_in");
    return;
  }
   
     const data= await run(`select * from BOOKS`);
     console.log(data);
     console.log(req.session.user);
     res.render("teacher/libraryTeacher", {
       logged_in: req.session.user.isAuthenticated,books_info:data.data
     });
   });
   router.post("/download_books", async function(req, res) {
    try {
        
        const bookName = req.body.book_name;
        
        const filePath = path.join(__dirname, '..', 'uploadimage', bookName);

        console.log(filePath)

        if (fs.existsSync(filePath)) {

            res.setHeader('Content-disposition', `attachment; filename=${bookName}`);
            res.setHeader('Content-type', 'application/pdf'); 

            const fileStream = fs.createReadStream(filePath);

            fileStream.pipe(res);
        } else {
            res.status(404).send('File not found');
        }
    } catch (error) {
        console.error('Error downloading book:', error);
        res.status(500).send('Internal Server Error');
    }
});
router.post("/download_calendar", async function(req, res) {
  try {
      
      const bookName = req.body.notice_file_name;
      
      const filePath = path.join(__dirname, '..', 'uploadimage', bookName);

      console.log(filePath)

      if (fs.existsSync(filePath)) {

          res.setHeader('Content-disposition', `attachment; filename=${bookName}`);
          res.setHeader('Content-type', 'application/pdf'); 

          const fileStream = fs.createReadStream(filePath);

          fileStream.pipe(res);
      } else {
          res.status(404).send('File not found');
      }
  } catch (error) {
      console.error('Error downloading book:', error);
      res.status(500).send('Internal Server Error');
  }
});
router.get("/calendarTeacher", async function (req, res) {
  const calendar = await run(`select ID,CALENDAR_FILE,CALENDAR_TITTLE,PUBLICATION_DATE from CALENDAR`);
  console.log(calendar);

  res.render("teacher/calendarTeacher", { calendar_info: calendar.data });
});
   


   router.post("/view_assignment_details", authenticateUser, async (req, res) => {
    const det=req.body.a_id;
    console.log(det)
    const result= await run(`select * from assignments where assignment_id='${det}'`)
    const students=await run(`select ID,uploaded_file from sub_assignments where assignment_id='${det}' and turnin='1'`)
    const students1=await run(`select ID,uploaded_file from sub_assignments where assignment_id='${det}' and turnin='0'`)
    console.log(result)
    console.log(students)
  
    res.json({ reply: true, data1: result.data, data2:students.data, data3:students1.data});
  });
module.exports = router;






