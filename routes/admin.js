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
router.get("/calendar_control", async function (req, res) {
  const calendar = await run(`select ID,CALENDAR_FILE,CALENDAR_TITTLE,PUBLICATION_DATE from CALENDAR`);
  console.log(calendar);

  res.render("admin_control/calendar_control", { calendar_info: calendar.data });
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
//------------------------------Student_management------------------
router.get("/student_management", function (req, res) {
   try {
        if (
          req.session.user.isAuthenticated ||
          req.session.user.account_type == "admin"
        ) {
          res.redirect("log_in");
          return;
        }
      } catch {
        res.redirect("log_in");
        return;
      }
  
  console.log(req.session.user);
  res.render("admin_control/student_management", {
    logged_in: req.session.user.isAuthenticated,
  });
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
router.post("/result_start", async (req, res) => {
  const data = req.body
  console.log(data)
  const result = await run(`UPDATE RESULTSTATUS
  SET result_start = :resultStart`, { resultStart: data.result_start })
});
router.post(
  "/add_calendar",
  upload.single("noticeFile"),
  async function (req, res) {
    const data = req.body;
    const file_name = req.file.filename;
    console.log(data, file_name);
    const feedback = await run(
      `
      INSERT INTO CALENDAR (
       ID ,CALENDAR_FILE,CALENDAR_TITTLE,PUBLICATION_DATE
      ) VALUES (
       :notice_ID, :file_name, :notice_title,:pub_date
      )`,
      {
        notice_ID: data.notice_ID,
        file_name: file_name,
        notice_title: data.notice_title,
        pub_date: data.pub_date
      }
    );
    
    res.redirect("calendar_control");
  }
);
//-----------------------------------------------


//----------------------teacher_management---------------------------------------------------------


router.get("/teacher_management", async function (req, res) {
  try {
    const teachers = await run(`SELECT TEACHERID, TEACHER_IMAGE, TEACHERFIRSTNAME, TEACHERLASTNAME, TO_CHAR(TEACHERDATEOFBIRTH, \'YYYY-MM-DD\') AS DOB,TEACHERGENDER,TEACHERADDRESS,TEACHERPHONENUMBER,TEACHEREMAIL FROM TEACHERS`);

    res.render("admin_control/teacher_management", { teachers_info: teachers.data });
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    res.status(500).send("Error fetching teacher data");
  }
});



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

//---------------------------------------edit_teacher--------------------------

router.post("/edit_teacher_form", upload.single("teacher_image"), async function (req, res) {
  try {
    const teacherId = req.body.teacher_id;
    const teacherData = req.body;
    const teacherImage = req.file ? req.file.filename : null; // Check if a new image is uploaded

    const currentTeacherDetails = await run(`SELECT TEACHER_IMAGE FROM TEACHERS WHERE TEACHERID = :teacher_id`, {
      teacher_id: teacherId
    });

    const currentTeacherImage = currentTeacherDetails.data[0]; // Current image filename
    console.log(currentTeacherImage);

    // Build the update query based on the provided data
    let updateQuery = `UPDATE TEACHERS SET 
      TEACHERFIRSTNAME = :teacher_firstname,
      TEACHERLASTNAME = :teacher_lastname,
      TEACHERDATEOFBIRTH = TO_DATE(:teacher_dob, 'YYYY-MM-DD'),
      TEACHERGENDER = :teacher_gender,
      TEACHERADDRESS = :teacher_address,
      TEACHERPHONENUMBER = :teacher_phone,
      TEACHEREMAIL = :teacher_email`;

    // Add image update to the query if a new image is uploaded
    if (teacherImage) {
      updateQuery += `, TEACHER_IMAGE = :teacher_image`;
    }

    updateQuery += ` WHERE TEACHERID = :teacher_id`;

    const queryParams = {
      teacher_firstname: teacherData.teacher_firstname,
      teacher_lastname: teacherData.teacher_lastname,
      teacher_dob: teacherData.teacher_dob,
      teacher_gender: teacherData.teacher_gender,
      teacher_address: teacherData.teacher_address,
      teacher_phone: teacherData.teacher_phone,
      teacher_email: teacherData.teacher_email,
      teacher_id: teacherId
    };

    // Add image parameter if a new image is uploaded
    if (teacherImage) {
      queryParams.teacher_image = teacherImage;
      // If a new image is uploaded, unlink the previous image
      if (currentTeacherImage) {
        const previousImagePath = path.join(__dirname, "..", "uploadimage", currentTeacherImage[0]);
        if (fs.existsSync(previousImagePath)) {
          fs.unlinkSync(previousImagePath);
          console.log(`Previous image ${currentTeacherImage} unlinked successfully.`);
        } else {
          console.log(`Previous image ${currentTeacherImage} not found.`);
        }
      }
    }

    const result = await run(updateQuery, queryParams);

    res.redirect("/teacher_management");
  } catch (error) {
    console.error("Error editing teacher:", error);
    res.status(500).send("Error editing teacher");
  }
});

<<<<<<< HEAD
router.get("/student_management", function (req, res) {
  console.log(req.session.user);
  res.render("admin_control/student_management", {
    logged_in: req.session.user.isAuthenticated,
  });
});

//---------------------student management--------------------------

router.post('/fetch_students', async (req, res) => {
  const selectedBatch = req.body.batch;
  if (!selectedBatch) {
    return res.status(400).json({ error: 'No batch selected' });
  }

  try {
    const result = await run(
      `SELECT ID, STUDENT_NAME1, STUDENT_NAME2, PHONE_NO, FATHER_NAME, MOTHER_NAME, PRESENT_ADDRESS, PERMANENT_ADDRESS,
      TO_CHAR(DOB, 'YYYY-MM-DD') AS DOB, CLASS, IMAGE, EMAIL, CITY, STATE, ZIPCODE FROM STUDENTS WHERE CLASS = :batch`,
      { batch: selectedBatch }

    );
    console.log(result);
    res.json(result.data);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Error fetching students' });
  }
});

router.post("/edit_student", upload.single("edit_student_image"), async function (req, res) {
  const { id, name1, name2, phone_no, father_name, mother_name, present_address, permanent_address, dob, studentClass, email, city, state, zipcode } = req.body;

  // Check if a new image is included in the request
  const studentImage = req.file ? req.file.filename : null;
  console.log(studentImage);

  try {
      // Get the current student's image filename from the database
      const currentStudentDetails = await run(`SELECT IMAGE FROM STUDENTS WHERE ID = :id`, { id: id });
      const currentStudentImage = currentStudentDetails.data[0]; // Current image filename

      console.log(id);
      let updateQuery = `UPDATE STUDENTS 
          SET STUDENT_NAME1 = :name1, STUDENT_NAME2 = :name2, PHONE_NO = :phone_no, FATHER_NAME = :father_name, 
              MOTHER_NAME = :mother_name, PRESENT_ADDRESS = :present_address, PERMANENT_ADDRESS = :permanent_address, 
              DOB = TO_DATE(:dob, 'YYYY-MM-DD'), CLASS = :studentClass, EMAIL = :email, CITY = :city, STATE = :state, 
              ZIPCODE = :zipcode`;

      // Add image update to the query if a new image is uploaded
      if (studentImage) {
          updateQuery += `, IMAGE = :studentImage`;
      }

      updateQuery += ` WHERE ID = :id`;

      const queryParams = {
          name1: name1,
          name2: name2,
          phone_no: phone_no,
          father_name: father_name,
          mother_name: mother_name,
          present_address: present_address,
          permanent_address: permanent_address,
          dob: dob,
          studentClass: studentClass,
          email: email,
          city: city,
          state: state,
          zipcode: zipcode,
          id: id,
      };

      // Add image parameter if a new image is uploaded
      if (studentImage) {
          queryParams.studentImage = studentImage;

          // If a new image is uploaded, unlink the previous image
          if (currentStudentImage) {
              const previousImagePath = path.join(__dirname, "..", "uploadimage", currentStudentImage[0]);
              if (fs.existsSync(previousImagePath)) {
                  fs.unlinkSync(previousImagePath);
                  console.log(`Previous image ${currentStudentImage} unlinked successfully.`);
              } else {
                  console.log(`Previous image ${currentStudentImage} not found.`);
              }
          }
      }

      console.log(currentStudentDetails);
      const result = await run(updateQuery, queryParams);

      if (result) {
          res.status(200).json({ success: true });

      } else {
          res.status(404).json({ success: false, message: 'Student not found or no changes were made' });
      }
  } catch (error) {
      console.error("Error updating student:", error);
      res.status(500).json({ success: false, message: 'Error updating student' });
  }
});



router.post('/add_student', upload.single('image'), async (req, res) => {
  // Extract form data from the request body
  const {id, student_name1, student_name2, phone_no, father_name, mother_name, present_address, permanent_address, dob, studentClass, email, city, state, zipcode} = req.body;

  // Get the uploaded image filename
  const image = req.file ? req.file.filename : null;

  try {
      const result = await run(`
          INSERT INTO STUDENTS (
              ID, STUDENT_NAME1, STUDENT_NAME2, PHONE_NO, FATHER_NAME, MOTHER_NAME, 
              PRESENT_ADDRESS, PERMANENT_ADDRESS, DOB, CLASS, IMAGE, EMAIL, 
              CITY, STATE, ZIPCODE
          ) VALUES (
              :id, :student_name1, :student_name2, :phone_no, :father_name, :mother_name, 
              :present_address, :permanent_address, TO_DATE(:dob, 'YYYY-MM-DD'), :studentClass, 
              :image, :email, :city, :state, :zipcode
          )
      `, {
          id: id,
          student_name1: student_name1,
          student_name2: student_name2,
          phone_no: phone_no,
          father_name: father_name,
          mother_name: mother_name,
          present_address: present_address,
          permanent_address: permanent_address,
          dob: dob,
          studentClass: studentClass,
          image: image,
          email: email,
          city: city,
          state: state,
          zipcode: zipcode
      });

      if (result) {
          res.status(200).json({ success: true });
      } else {
          res.status(404).json({ success: false, message: 'Student not found or no changes were made' });
      }
  } catch (error) {
      // If an error occurs during database operation, send an error response
      console.error('Error adding student:', error);
      res.status(500).json({ success: false, error: 'Error adding student' });
  }
});


router.post("/delete_student", async function (req, res) {
  const { id } = req.body;

  try {
      // Perform the deletion of the student with the specified ID
      const result = await run(`DELETE FROM STUDENTS WHERE ID = :id`, { id: id });

      if (result) {
          res.status(200).json({ success: true });
      } else {
          res.status(404).json({ success: false, message: 'Student not found' });
      }
  } catch (error) {
      console.error("Error deleting student:", error);
      res.status(500).json({ success: false, message: 'Error deleting student' });
  }
});

=======

//-----------------------------------------------
>>>>>>> d1515310f5d61b5174346574dbc83a54e75877ab


module.exports = router;
