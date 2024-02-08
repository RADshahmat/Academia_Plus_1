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

<<<<<<< HEAD
    const result = await run(`UPDATE EXAM SET EXAM_STAT = ${det.online_exam_start}`);

})
router.post("/result_start", async function(req,res){
  const det=req.body;
  
  console.log(det.result_start);

    const result = await run(`UPDATE RESULTSTATUS SET RESULT_START = ${det.result_start}`);

})
router.get("/library_management",async function(req,res){


res.render("admin_control/library_management");
=======
  const result = await run(
    `UPDATE EXAM SET EXAM_STAT = ${det.online_exam_start}`
  );
});
>>>>>>> fd7e61f0f4adb37e60744e942f305de16a761dbc

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
  const folderPath = "uploadimage";

  const filePath = path.join(__dirname, "..", folderPath, filename1);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`File ${filename1} deleted successfully.`);
    const det = await run(`DELETE FROM BOOKS WHERE BOOK_FILE= :book_name`, {
      book_name: filename1,
    });
    console.log(det);
  } else {
    console.log(`File ${filename} not found.`);
  }
  res.redirect("/book_management");
  console.log(filePath);
});

module.exports = router;
