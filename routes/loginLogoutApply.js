const express = require("express");
const router = express.Router();
const { run } = require("../db/db");
const upload = require("../multer/multer");


router.get("/log_in", async function (req, res) {
  try{
    if(req.session.user.isAuthenticated && req.session.user.account_type=='Applicant'){
        res.redirect('applicant_dashboard');
        return;
  
    }else if(req.session.user.isAuthenticated && req.session.user.account_type=='Admin'){
      res.redirect('admin');
      return;
    }else{
      res.render("log_in");
    }
  }catch{
    res.render("log_in");
  }
    
    
  });


  router.post("/applyform", upload.single("image"), async function (req, res) {
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
    INSERT INTO APPLICANTS_BEFORE_PAYMENT (
      APPLICANT_NAME, MOBILE_NO, FATHER_NAME, MOTHER_NAME,
      P_ADDRESS, C_ADDRESS, DOB, CLASS, IMAGE_ADDRESS, EMAIL
    ) VALUES (
      :student_name, :phone_no, :father_name, :mother_name,
      :present_address, :current_address, TO_DATE(:dob, 'YYYY-MM-DD'),
      :class, :image, :email
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
          email:data.email_address
        }
      );
  
      const s_id = await run(
        'SELECT APPLICANT_ID FROM "ACADEMIA_PLUS_NEW"."APPLICANTS_BEFORE_PAYMENT" WHERE MOBILE_NO= :phone_no',
        { phone_no: data.phone_no }
      );
  
      res.json({ reply: det.success, p_no: data.phone_no, a_id: s_id.data });
    
      
     
    }
  });
  
  router.post("/login", async function (req, res) {
    let data = req.body;
   console.log("data:"+data.password);
    const info = await run(
      'SELECT * FROM "ACADEMIA_PLUS_NEW"."APPLICANTS" WHERE MOBILE_NO = :phone_no AND APPLICANT_ID = :password',
      { phone_no: data.phone_no, password: data.password }
    );
  console.log(info);
    const admin_info = await run(
      'SELECT * FROM "ACADEMIA_PLUS_NEW"."ADMIN" WHERE ADMIN_EMAIL = :email AND ADMIN_PASSWORD = :password',
      { email: data.phone_no, password: data.password }
    );
    console.log(admin_info);
    let user = null;
   
    if (info.data.length > 0) {
      user = {
        id: info.data[0][0],
        name: info.data[0][1],
        account_type: "Applicant",
        isAuthenticated: true,
      };
    } else if (admin_info.data.length > 0) {
      user = {
        id: admin_info.data[0][0],
        name: admin_info.data[0][1],
        account_type: "Admin",
        isAuthenticated: true,
      };
    }
  console.log("user:"+user)
    if (user) {
      req.session.user = user;
      
      req.session.save(function () {
        res.json({ reply: true, data: user});
      });
    } else {
      
      res.json({ reply: false, data: null});
    }
  });

  router.post("/logout", async function (req, res) {
    req.session.user.isAuthenticated = false;
  
    res.redirect("/index");
  });


  module.exports = router;