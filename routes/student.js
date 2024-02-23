const express = require("express");
const router = express.Router();
const path = require("path");
const upload=require("../multer/multer")
const { run } = require("../db/db");
router.get("/studentsdashboard", function (req, res) {
   try {
       if (
         req.session.user.isAuthenticated ||
         req.session.user.account_type == "student"
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
router.get("/student_management", function (req, res) {
   try {
        if (
          req.session.user.isAuthenticated ||
          req.session.user.account_type == "student"
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
router.get("/loginadtc", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("loginadtc", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("loginadtc", { logged_in: false });
    }
  } catch {
    res.render("loginadtc", { logged_in: false });
  }
});
router.get("/classroom", function (req, res) {
  try {
        if (
          req.session.user.isAuthenticated ||
          req.session.user.account_type == "student"
        ) {
          res.redirect("log_in");
          return;
        }
      } catch {
        res.redirect("log_in");
        return;
      }
    
  console.log(req.session.user);
  res.render("students/classroom", {
    logged_in: req.session.user.isAuthenticated,
  });
});

router.get("/chatbot", function (req, res) {
   try {
        if (
          req.session.user.isAuthenticated ||
          req.session.user.account_type == "student"
        ) {
          res.redirect("log_in");
          return;
        }
      } catch {
        res.redirect("log_in");
        return;
      }
    
  console.log(req.session.user);
  res.render("students/chatbot", {
    logged_in: req.session.user.isAuthenticated,
  });
});
router.get("/libraryStudent", async function (req, res) {
   try {
        if (
          req.session.user.isAuthenticated ||
          req.session.user.account_type == "student"
        ) {
          res.redirect("log_in");
          return;
        }
      } catch {
        res.redirect("log_in");
        return;
      }
    
      const data= await run(`select * from BOOKS`);
      console.log(data);
      console.log(req.session.user);
      res.render("students/libraryStudent", {
        logged_in: req.session.user.isAuthenticated,books_info:data.data
      });
    });
    router.get("/resourceclass1",async function (req, res) {
      try {
         if (
           req.session.user.isAuthenticated ||
           req.session.user.account_type == "student"
         ) {
           res.redirect("log_in");
           return;
         }
       } catch {
         res.redirect("log_in");
         return;
       }
     
       const data= await run(`select * from RESOURCES`);
       console.log(data);
       console.log(req.session.user);
       res.render("students/resourceclass1", {
         logged_in: req.session.user.isAuthenticated,resources_info:data.data
       });
     });
     router.get("/registration", function (req, res) {
      try {
            if (
              req.session.user.isAuthenticated ||
              req.session.user.account_type == "student"
            ) {
              res.redirect("log_in");
              return;
            }
          } catch {
            res.redirect("log_in");
            return;
          }
        
      console.log(req.session.user);
      res.render("students/registration", {
        logged_in: req.session.user.isAuthenticated,
      });
    });
    router.get("/overviewclass1", async function (req, res) {
      const gline = await run('SELECT OVERVIEW FROM "ACADEMIA_PLUS_NEW"."COURSEOVERVIEW" WHERE CLASS = \'1\'');
      console.log(gline.data);
    
      if (gline.success) {
        try {
          res.render("students/overviewclass1", {
            gline: gline.data,
            db_stat1: gline.success,
            logged_in: req.session.user.isAuthenticated,
          });
        } catch {
          res.render("students/overviewclass1", {
            gline: gline.data,
            db_stat1: gline.success,
            logged_in: false,
          });
        }
      } else {
        try {
          res.render("students/overviewclass1", {
            gline: gline.data,
            db_stat: gline.success,
            logged_in: req.session.user.isAuthenticated,
          });
        } catch {
          res.render("students/overviewclass1", {
            gline: gline.data,
            db_stat: gline.success,
            logged_in: false,
          });
        }
      }
    });

    router.get("/assignmentclass1", async function (req, res) {
      const gline = await run('SELECT * FROM "ACADEMIA_PLUS_NEW"."ASSIGNMENTS" WHERE CLASS = \'class2\'');
      console.log(gline.data);
    
      if (gline.success) {
        try {
          res.render("students/assignmentclass1", {
            gline: gline.data,
            db_stat2: gline.success,
            logged_in: req.session.user.isAuthenticated,
          });
        } catch {
          res.render("students/assignmentclass1", {
            gline: gline.data,
            db_stat2: gline.success,
            logged_in: false,
          });
        }
      } else {
        try {
          res.render("students/assignmentclass1", {
            gline: gline.data,
            db_stat2: gline.success,
            logged_in: req.session.user.isAuthenticated,
          });
        } catch {
          res.render("students/assignmentclass1", {
            gline: gline.data,
            db_stat2: gline.success,
            logged_in: false,
          });
        }
      }
    });
    router.post("/submit_assignment", upload.single("fileUpload"), async function (req, res) {
      const data = req.body;
      const image_name = req.file.filename;
    
      console.log(data,image_name)
    });
    
  
    module.exports = router;
