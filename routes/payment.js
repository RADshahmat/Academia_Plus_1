const express=require("express");

const router=express.Router();
const path = require("path");
const {run}=require("../db/db")



const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'acade657bd9c0a4019'
const store_passwd = 'acade657bd9c0a4019@ssl'
const is_live = false 



//sslcommerz init
router.get('/init', (req, res) => {
    const name=req.query.applicant_id;
    console.log("kaka_student: "+name);
    const data = {
        total_amount: 1000,
        student_name: 'kaka',
        currency: 'BDT',
        tran_id: 'REF123', // use unique tran_id for each api call
        success_url: `http://localhost:3000/success?student_name=${name}`,
        fail_url: `http://localhost:3000/fail?student_name=${name}`,
        cancel_url: 'http://localhost:3000/cancel',
        ipn_url: 'http://localhost:3000/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01747697661',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
        
        
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    sslcz.init(data).then(apiResponse => {
        let GatewayPageURL =`${apiResponse.GatewayPageURL}?student_name=${name}`;
        console.log(data);
        res.json({body: GatewayPageURL});
        console.log('After redirection');
        
    });
})

router.post('/success',async function(req,res){

    const a_id = req.query.student_name;
    console.log('Student Name:', a_id);

    const applicant = await run(
        'SELECT * FROM "ACADEMIA_PLUS_NEW"."APPLICANTS_BEFORE_PAYMENT" WHERE APPLICANT_ID= :a_id',
        { a_id: a_id }
      );
      const applicant_data=applicant.data;
      console.log("app_data"+applicant_data[0]);
      

var dateString = applicant_data[0][7];
var dateObject = new Date(dateString);
var year = dateObject.getFullYear();
var month = ('0' + (dateObject.getMonth() + 1)).slice(-2);
var day = ('0' + dateObject.getDate()).slice(-2);
var formattedDate = year + '-' + month + '-' + day;
console.log(formattedDate);

    const det = await run(
        `
    INSERT INTO APPLICANTS (
      APPLICANT_ID,APPLICANT_NAME, MOBILE_NO, FATHER_NAME, MOTHER_NAME,
      P_ADDRESS, C_ADDRESS, DOB, CLASS, IMAGE_ADDRESS
    ) VALUES (
      :student_id,:student_name, :phone_no, :father_name, :mother_name,
      :present_address, :current_address, TO_DATE(:dob, 'YYYY-MM-DD'),
      :class, :image
    )`,
        {
          student_id:applicant_data[0][0]  ,
          student_name:applicant_data[0][1] ,
          phone_no:applicant_data[0][2] ,
          father_name:applicant_data[0][3],
          mother_name:applicant_data[0][4] ,
          present_address:applicant_data[0][5] ,
          current_address:applicant_data[0][6] ,
          dob:formattedDate,
          class:applicant_data[0][8],
          image:applicant_data[0][9] ,
        }
      );

      res.redirect("success");
    
});

router.post('/fail',async function(req,res){

    const a_id = req.query.student_name;
    const applicant = await run(
        'DELETE FROM "ACADEMIA_PLUS_NEW"."APPLICANTS_BEFORE_PAYMENT" WHERE APPLICANT_ID = :a_id',
        { a_id: a_id }
      );
      console.log("kaka deleted"+applicant);
      res.redirect("failed");
});

router.get("/success",async function(req,res){

    res.render("admission/success");
  
  });
  
  router.get("/failed",async function(req,res){
  
    res.render("admission/failed");
  
  });

module.exports = router;


