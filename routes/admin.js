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


module.exports= router;