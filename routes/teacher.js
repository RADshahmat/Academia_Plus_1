const express = require("express");
const router = express.Router();
const {run}=require ("../db/db")
const upload = require("../multer/multer");
const { Console } = require("console");
router.get("/teachersdashboard", function (req, res) {
    /* try {
       if (
         req.session.user.isAuthenticated ||
         req.session.user.account_type == "Applicant"
       ) {
         res.redirect("log_in");
         return;
       }
     } catch {
       res.redirect("log_in");
       return;
     }
   */
     console.log(req.session.user);
     res.render("teacher/teachersdashboard", {
       
       logged_in: req.session.user.isAuthenticated,
     });
   });
   router.get("/courseoverview", function (req, res) {
    /* try {
       if (
         req.session.user.isAuthenticated ||
         req.session.user.account_type == "Applicant"
       ) {
         res.redirect("log_in");
         return;
       }
     } catch {
       res.redirect("log_in");
       return;
     }
   */
     console.log(req.session.user);
     res.render("teacher/courseoverview", {
       
       logged_in: req.session.user.isAuthenticated,
     });
   });
   router.get("/class1overview", function (req, res) {
    /* try {
       if (
         req.session.user.isAuthenticated ||
         req.session.user.account_type == "Applicant"
       ) {
         res.redirect("log_in");
         return;
       }
     } catch {
       res.redirect("log_in");
       return;
     }
   */
     console.log(req.session.user);
     res.render("teacher/class1overview", {
       
       logged_in: req.session.user.isAuthenticated,
     });
   });
   router.get("/resource", function (req, res) {
    /* try {
       if (
         req.session.user.isAuthenticated ||
         req.session.user.account_type == "Applicant"
       ) {
         res.redirect("log_in");
         return;
       }
     } catch {
       res.redirect("log_in");
       return;
     }
   */
     console.log(req.session.user);
     res.render("teacher/resource", {
       
       logged_in: req.session.user.isAuthenticated,
     });
   });
   router.get("/class1resource", async function (req, res) {
    /* try {
       if (
         req.session.user.isAuthenticated ||
         req.session.user.account_type == "Applicant"
       ) {
         res.redirect("log_in");
         return;
       }
     } catch {
       res.redirect("log_in");
       return;
     }
   */
     const data= await run(`select * from RESOURCES`);
     console.log(data);
     console.log(req.session.user);
     res.render("teacher/class1resource", {      
       logged_in: req.session.user.isAuthenticated,resources_info:data.data
     });

   });
   router.post("/add_resources",upload.single("fileInput"),async function(req,res){
    const data = req.body;
    const file_name = req.file.filename;
    console.log(data,file_name);
    const feedback=await run(       `
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
        })
    res.redirect("class1resource");
    
    });  
    router.get("/class1assignment", async function (req, res) {
      /* try {
         if (
           req.session.user.isAuthenticated ||
           req.session.user.account_type == "Applicant"
         ) {
           res.redirect("log_in");
           return;
         }
       } catch {
         res.redirect("log_in");
         return;
       }
     */
       const data= await run(`select * from ASSIGNMENTS`);
       console.log(data);
       console.log(req.session.user);
       res.render("teacher/class1assignment", {      
         logged_in: req.session.user.isAuthenticated,resources_info:data.data
       });
  
     });
     router.get("/assignment", async function (req, res) {
      /* try {
         if (
           req.session.user.isAuthenticated ||
           req.session.user.account_type == "Applicant"
         ) {
           res.redirect("log_in");
           return;
         }
       } catch {
         res.redirect("log_in");
         return;
       }
     */
       const data= await run(`select * from RESOURCES`);
       console.log(data);
       console.log(req.session.user);
       res.render("teacher/assignment", {      
         logged_in: req.session.user.isAuthenticated,resources_info:data.data
       });
  
     });
     router.post("/add_assignments", async function (req, res) {
      const data = req.body;
      console.log(data)
      const feedback = await run(`
        INSERT INTO ASSIGNMENTS (
          COURSE_TITLE, ASSIGNMENT_TITLE, INSTRUCTIONS, SUB_DATE,CLASS
        ) VALUES (
          :book_name, :author, :type,TO_DATE(:book_file,'YYYY-MM-DD') , :class
        )`,
          {
              book_name: data.courseTitle,
              author: data.assignmentTitle,
              type: data.instructions,
              book_file: data.submissionDate,
              class: data.class, // Fix here
          });
          console.log(feedback)
      res.redirect("class1assignment");
  });
  
    module.exports = router;