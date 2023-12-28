const express=require("express");

const router=express.Router();
const { run } = require("../db/db");

router.get("/online_admission_handler",async function(req,res){

     


    res.render("online_admission_handler");

});



router.post("/start_exam", async function(req,res){


})


module.exports= router;