const express=require("express");
const router=express.Router();
const { run } = require("../db/db");
const upload = require("../multer/multer");

router.get("/online_admission_handler",async function(req,res){

     const exam_stat=await run("SELECT * FROM EXAM");
     console.log(exam_stat);


    res.render("admin_control/online_admission_handler",{exam_stat:exam_stat.data});

});



router.post("/online_exam_start", async function(req,res){
  const det=req.body;
  
  console.log(det.online_exam_start);

    const result = await run(`UPDATE EXAM SET EXAM_STAT = ${det.online_exam_start}`);

})

router.get("/library_management",async function(req,res){


res.render("admin_control/library_management");

});
router.get("/sms", async function (req, res) {
  res.render("admin_control/sms");
});
router.get("/book_management",async function(req,res){
const data= await run(`select * from BOOKS`);
console.log(data);

  res.render("admin_control/book_management",{books_info:data.data});
  
  });

  router.get("/library_card",async function(req,res){


    res.render("admin_control/library_card");
    
    });
  
    router.post("/add_books",upload.single("fileInput"),async function(req,res){
      const data = req.body;
      const file_name = req.file.filename;
      console.log(data,file_name);
      const feedback=await run(       `
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
          })
      res.redirect("book_management");
      
      });  
  

module.exports= router;
