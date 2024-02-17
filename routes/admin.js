const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require('fs');
const { run } = require("../db/db");
const upload = require("../multer/multer");



router.get("/online_admission_handler", async function (req, res) {
  const exam_stat = await run("SELECT * FROM EXAM");
  console.log(exam_stat);

  res.render("admin_control/online_admission_handler", {
    exam_stat: exam_stat.data,
  });
});

router.post("/online_exam_start", async function (req, res) {
  const det = req.body;

  console.log(det.online_exam_start);

  const result = await run(
    `UPDATE EXAM SET EXAM_STAT = ${det.online_exam_start}`
  );
});


router.get("/library_management", async function (req, res) {
  res.render("admin_control/library_management");
});
router.get("/sms", async function (req, res) {
  res.render("admin_control/sms");
});
router.get("/book_management", async function (req, res) {
  const data = await run(`select * from BOOKS`);
  console.log(data);

  res.render("admin_control/book_management", { books_info: data.data });
});
router.get("/notice_control", async function (req, res) {
  const notices = await run(`select NOTICE_ID,NOTICE_FILE,NOTICE_TITLE,TO_CHAR(PUBLICATION_DATE, 'YYYY-MM-DD Day HH24:MI:SS') AS publication_date from NOTICES`);
  console.log(notices);

  res.render("admin_control/notice_control", { notices_info: notices.data });
});

router.get("/library_card", async function (req, res) {
  res.render("admin_control/library_card");
});

router.post(
  "/add_books",
  upload.single("fileInput"),
  async function (req, res) {
    const data = req.body;
    const file_name = req.file.filename;
    console.log(data, file_name);
    const feedback = await run(
      `
      INSERT INTO BOOKS (
        BOOK_NAME, AUTHOR, TYPE, BOOK_FILE
      ) VALUES (
        :book_name, :author, :type, :book_file
      )`,
      {
        book_name: data.bookTitle,
        author: data.author,
        type: data.type,
        book_file: file_name,
      }
    );
    res.redirect("book_management");
  }
);

router.post("/delete_books", async (req, res) => {
  const filename1 = req.body.book_name;
  const id = req.body.book_id;
  const folderPath = "uploadimage";
  
  const det = await run(`DELETE FROM BOOKS WHERE BOOK_ID= :id_book`, {
    id_book: id,
  });
  console.log(det);

  const filePath = path.join(__dirname, "..", folderPath, filename1);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`File ${filename1} deleted successfully.`);
  } else {
    console.log(`File ${filename1} not found.`);
  }
  res.redirect("/book_management");
  console.log(filePath);
});

// -----------------------notice_control-----------------------
router.post(
  "/add_notice",
  upload.single("noticeFile"),
  async function (req, res) {
    const data = req.body;
    const file_name = req.file.filename;
    console.log(data, file_name);
    const feedback = await run(
      `
      INSERT INTO NOTICES (
        NOTICE_FILE, NOTICE_TITLE
      ) VALUES (
        :file_name, :notice_title
      )`,
      {
        file_name: file_name,
        notice_title: data.notice_title,
      }
    );
    
    res.redirect("notice_control");
  }
);

router.post("/delete_notice", async (req, res) => {
  const id = req.body.notice_id;
  const filename2 = req.body.notice_file_name;
  const folderPath = "uploadimage";

  const det = await run(`DELETE FROM NOTICES WHERE NOTICE_ID= :id_notice`, {
    id_notice: id,
  });
  console.log(det);

  const filePath = path.join(__dirname, "..", folderPath, filename2);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`File ${filename2} deleted successfully.`);
  } else {
    console.log(`File ${filename2} not found.`);
  }
  res.redirect("/notice_control");
  console.log(filePath);
});
//-----------------------------------------------


//----------------------teacher_management---------------------------------------------------------

// Define a route to fetch and display all teachers
router.get("/teacher_management", async function (req, res) {
  try {
      const teachers = await run(`SELECT TEACHERID, TEACHER_IMAGE, TEACHERFIRSTNAME, TEACHERLASTNAME, TO_CHAR(TEACHERDATEOFBIRTH, \'DD-MM-YYYY\') AS DOB,TEACHERGENDER,TEACHERADDRESS,TEACHERPHONENUMBER,TEACHEREMAIL FROM TEACHERS`);

      res.render("admin_control/teacher_management", { teachers_info: teachers.data });
  } catch (error) {
      console.error("Error fetching teacher data:", error);
      res.status(500).send("Error fetching teacher data");
  }
});



// Define a route to handle adding teachers
router.post("/add_teacher", upload.single("teacher_image"), async function (req, res) {
  try {
      const teacherData = req.body;
      const teacherImage = req.file.filename;
      const result = await run(
          `
          INSERT INTO TEACHERS (
              TEACHER_IMAGE, TEACHERFIRSTNAME, TEACHERLASTNAME, 
              TEACHERDATEOFBIRTH, TEACHERGENDER, TEACHERADDRESS, 
              TEACHERPHONENUMBER, TEACHEREMAIL
          ) VALUES (
              :teacher_image, :teacher_firstname, :teacher_lastname, 
              TO_DATE(:teacher_dob, 'YYYY-MM-DD'), :teacher_gender, :teacher_address, 
              :teacher_phone, :teacher_email
          )`,
          {
              teacher_image: teacherImage,
              teacher_firstname: teacherData.teacher_firstname,
              teacher_lastname: teacherData.teacher_lastname,
              teacher_dob: teacherData.teacher_dob,
              teacher_gender: teacherData.teacher_gender,
              teacher_address: teacherData.teacher_address,
              teacher_phone: teacherData.teacher_phone,
              teacher_email: teacherData.teacher_email
          }
      );
      res.redirect("/teacher_management");
  } catch (error) {
      console.error("Error adding teacher:", error);
      res.status(500).send("Error adding teacher");
  }
});

// Define a route to handle the deletion of a teacher
router.get("/delete_teacher/:id/:imageFilename", async function (req, res) {
  try {
      const teacherId = req.params.id;
      const teacherImageFilename = req.params.imageFilename;
      const folderPath = "uploadimage";
      const filePath = path.join(__dirname, "..", folderPath, teacherImageFilename);

      const deleteResult = await run("DELETE FROM TEACHERS WHERE TEACHERID = :id", {
          id: teacherId
      });

      if (fs.existsSync(filePath)) {

          fs.unlinkSync(filePath);
          console.log(`Image file ${teacherImageFilename} deleted successfully.`);
      } else {
          console.log(`Image file ${teacherImageFilename} not found.`);
      }

      res.redirect("/teacher_management");
  } catch (error) {
      console.error("Error deleting teacher:", error);
      res.status(500).send("Error deleting teacher");
  }
});






//-----------------------------------------------


module.exports = router;
