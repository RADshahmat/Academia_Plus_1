const express = require("express");
const axios = require("axios");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const { run } = require("./db/db");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const server = http.createServer(app);
const applicantsRoutes=require('./routes/applicants');
const student=require('./routes/student');
const flutter=require('./flutter/get1');
const teacher=require('./routes/teacher');
const LoginLogoutApply=require('./routes/loginLogoutApply');
const admin=require('./routes/admin');
const payment=require('./routes/payment');
const sendmail=require('./routes/sendmail');
const io = socketIo(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploadimage"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.json());



//////////// start of session ////////////////////////////////

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "academia_plus_session",
};

const sessionStore = new MySQLStore(options);

app.use(
  session({
    key: "session_cookie_name",
    secret: "session_cookie_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

/////////////////////end of session code///////////////////////////

////////////////////////file Upload///////////////////////////////



app.use(applicantsRoutes);
app.use(LoginLogoutApply);
app.use(admin);
app.use(payment)
app.use(sendmail)
app.use(student)
app.use(teacher)
app.use(flutter);
////////////////////////////////////File Upload End///////////////////

//////////////////////Node Mailer Start/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////Node mailer End////////////////////////////////////////////////////////

////////////////////////////////////////////All Get Request ////////////////////////////////////////////////////////////////////////////////
app.get("/", async function (req, res) {
  res.redirect("index");
});
app.get("/success",async function(req,res){

  res.render("admission/success");

});

app.get("/failed",async function(req,res){

  res.render("admission/failed");

});
app.get("/index", async function (req, res) {
  const notices = await run(`select TO_CHAR(PUBLICATION_DATE, 'DD-MM-YYYY') AS PUBLICATION_DATE,NOTICE_TITLE from NOTICES`);
  console.log(notices);

  try {
    if (req.session.user.isAuthenticated) {
      res.render("index", { logged_in: req.session.user.isAuthenticated , notices_info: notices.data });
    } else {
      res.render("index", { logged_in: false , notices_info: notices.data});
    }
  } catch {
    res.render("index", { logged_in: false , notices_info: notices.data});
  }
});

app.get("/admission", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("admission", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("admission", { logged_in: false });
    }
  } catch {
    res.render("admission", { logged_in: false });
  }
});

app.get("/events", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("events", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("events", { logged_in: false });
    }
  } catch {
    res.render("events", { logged_in: false });
  }
});

app.get("/history", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("history", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("history", { logged_in: false });
    }
  } catch {
    res.render("history", { logged_in: false });
  }
});

app.get("/achievements", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("achievements", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("achievements", { logged_in: false });
    }
  } catch {
    res.render("achievements", { logged_in: false });
  }
});

app.get("/facultyStaffInfo", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("facultyStaffInfo", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("facultyStaffInfo", { logged_in: false });
    }
  } catch {
    res.render("facultyStaffInfo", { logged_in: false });
  }
});

app.get("/message", async function (req, res) {
  const gline = await run('SELECT * FROM "ACADEMIA_PLUS_NEW"."MESSAGE"');
  console.log(gline.data);

  if (gline.success) {
    try {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  } else {
    try {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("message", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  }
});

app.get("/governingbody", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("governingbody", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("governingbody", { logged_in: false });
    }
  } catch {
    res.render("governingbody", { logged_in: false });
  }
});

app.get("/admin", function (req, res) {
  try {
    if (req.session.user.isAuthenticated && req.session.user.account_type=="Admin") {
      res.render("admin_control/admin", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.redirect("log_in");
    }
  } catch {
    res.redirect("log_in");
  }
});

app.get("/GuidelineforParents", async function (req, res) {
  const gline = await run(
    'SELECT * FROM "ACADEMIA_PLUS_NEW"."GUIDELINE_FOR_PARRENTS"'
  );
  console.log(gline.data);

  if (gline.success) {
    try {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  } else {
    try {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: req.session.user.isAuthenticated,
      });
    } catch {
      res.render("GuidelineforParents", {
        gline: gline.data,
        db_stat: gline.success,
        logged_in: false,
      });
    }
  }
});

app.get("/library", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("library", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("library", { logged_in: false });
    }
  } catch {
    res.render("library", { logged_in: false });
  }
});

app.get("/clubs", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("clubs", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("clubs", { logged_in: false });
    }
  } catch {
    res.render("clubs", { logged_in: false });
  }
});

app.get("/notice", async function (req, res) {
  const notices = await run(`select NOTICE_FILE,NOTICE_TITLE,TO_CHAR(PUBLICATION_DATE, 'DD Month, YYYY Day') AS publication_date from NOTICES`);
  console.log(notices);
  try {
    if (req.session.user.isAuthenticated) {
      res.render("notice", { logged_in: req.session.user.isAuthenticated , notices_info: notices.data });
    } else {
      res.render("notice", { logged_in: false,notices_info: notices.data });
    }
  } catch {
    res.render("notice", { logged_in: false,notices_info: notices.data });
  }
});


app.get('/pdfs/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploadimage', filename); // Adjust the path if necessary

  // Serve the PDF file
  res.sendFile(filePath);
});

app.get("/contact", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("contact", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("contact", { logged_in: false });
    }
  } catch {
    res.render("contact", { logged_in: false });
  }
});

app.get("/codeofconduct", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("codeofconduct", {
        logged_in: req.session.user.isAuthenticated,
      });
    } else {
      res.render("codeofconduct", { logged_in: false });
    }
  } catch {
    res.render("codeofconduct", { logged_in: false });
  }
});

app.get("/routine", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("routine", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("routine", { logged_in: false });
    }
  } catch {
    res.render("routine", { logged_in: false });
  }
});

app.get("/photos", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("photos", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("photos", { logged_in: false });
    }
  } catch {
    res.render("photos", { logged_in: false });
  }
});

app.get("/videos", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("videos", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("videos", { logged_in: false });
    }
  } catch {
    res.render("videos", { logged_in: false });
  }
});

app.get("/calender", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("calender", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("calender", { logged_in: false });
    }
  } catch {
    res.render("calender", { logged_in: false });
  }
});

app.get("/cocur", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("cocur", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("cocur", { logged_in: false });
    }
  } catch {
    res.render("cocur", { logged_in: false });
  }
});

app.get("/dress", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("dress", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("dress", { logged_in: false });
    }
  } catch {
    res.render("dress", { logged_in: false });
  }
});





let uniqueNumbersArray = [0, 0];


app.get("/forgetpass", async function (req, res) {
  const pnum=req.query.phonenum;
  const email=await run(`select email from applicants where MOBILE_NO=${pnum}`)
  console.log(email)
  res.render("forgetpass",{email : email.data});
});
app.get("/otpverify", async function (req, res) {
  res.render("otpverify");
});
app.post("/otpverify", async function (req, res) {
  const email=req.query.email;
  const data=req.body;
  const otp=data.otp;
  console.log(email+otp)
  const det = await run(`SELECT * FROM OTP WHERE EMAIL = :email AND OTP = :otp`, {
    email: email,
    otp: otp
  });
  const flag=det.data[0];
  if(flag.length>0){
    const password=await run(`SELECT APPLICANT_ID FROM APPLICANTS WHERE EMAIL = :email`,{
      email:email
    })
    console.log(password)
    res.json({ reply: true, data: password.data});
  }
  else{
    res.json({ reply: true, data: password.data});
  }
 console.log(flag)
console.log(det);
});


/////////////////////////////////////////////All Get Request///////////////////////////////////////////////////////////////

////////////////////////////////////////////All Post Req////////////////////////////////////////////////////////////////////
app.post("/chatbot_rad",async function(req,res){ 
  try { 
        const userInput=req.body.userInput; 

        
         
        const response = await axios.post('http://localhost:5000/predict', { user_input: userInput }); 
        console.log(response.data) 

        if(response.data.answer==="1802070"){ 
         
          const API_URL = "https://api.openai.com/v1/chat/completions"; 
          const apiKey = "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"; 
       
           
               
              const response = await axios.post(API_URL, { 
                  model: "gpt-3.5-turbo", 
                  messages: [{ role: "user", content: userInput }], 
              }, { 
                  headers: { 
                      "Content-Type": "application/json", 
                      "Authorization": `Bearer ${apiKey}` 
                  }, 
              }); 
       
              
              const content = response.data.choices[0].message.content.trim(); 
               
              
               
          const chatg={ 
            answer: content 
          } 
         
        
          res.json(chatg); 
           await axios.post('http://localhost:5000/train_new', { user_input: userInput,open_ai_res: content }); 

        }else{ 

           
          res.json(response.data) 
        } 


          
         
    } catch (error) { 
       
    } 
});


app.listen(3000);
