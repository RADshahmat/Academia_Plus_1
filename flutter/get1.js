const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require('fs');
const { run } = require("../db/db");
const upload = require("../multer/multer");

router.get('/get1',async function(req,res){

const det= await run(`SELECT * FROM APPLICANTS`)
console.log(det)
res.json(det.data);

})



module.exports=router;