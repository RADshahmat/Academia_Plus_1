const express=require("express");

const router=express.Router();
const { run } = require("../db/db");

router.get("/online_admission_handler",async function(req,res){

     const exam_stat=await run("SELECT * FROM EXAM");
     console.log(exam_stat);


    res.render("admin_control/online_admission_handler",{exam_stat:exam_stat.data});

});



router.post("/online_exam_start", async function(req,res){
  const det=req.body;
  
  console.log(det.online_exam_start);

    const result = await run(`UPDATE EXAM SET EXAM_STAT = ${det.online_exam_start}`);
    console.log(result)
  

})


module.exports= router;