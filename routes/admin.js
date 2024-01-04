const express=require("express");

const router=express.Router();
const { run } = require("../db/db");

router.get("/online_admission_handler",async function(req,res){

    res.render("admin_control/online_admission_handler");

});

router.post("/online_exam_start", async function(req,res){
  const det=req.body;
  console.log(det)

})

router.get("/library_management",async function(req,res){

  res.render("admin_control/library_management");

});


module.exports= router;