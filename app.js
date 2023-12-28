const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const { run } = require("./db/db");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const server = http.createServer(app);
const applicantsRoutes=require('./routes/applicants');
const LoginLogoutApply=require('./routes/loginLogoutApply');
const io = socketIo(server);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("uploadimage"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(express.json());
var screenWidth;

app.post("/setScreenWidth", (req, res) => {
  screenWidth = req.body.screenWidth;
  console.log("Received screen width:", screenWidth);

  res.sendStatus(200);
});
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

////////////////////////////////////File Upload End///////////////////

//////////////////////Database Connection Strat/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////end of bd connection prototype////////////////////////////////////////////////////////

////////////////////////////////////////////All Get Request ////////////////////////////////////////////////////////////////////////////////
app.get("/", async function (req, res) {
  res.redirect("index");
});

app.get("/index", async function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("index", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("index", { logged_in: false });
    }
  } catch {
    res.render("index", { logged_in: false });
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

app.get("/notice", function (req, res) {
  try {
    if (req.session.user.isAuthenticated) {
      res.render("notice", { logged_in: req.session.user.isAuthenticated });
    } else {
      res.render("notice", { logged_in: false });
    }
  } catch {
    res.render("notice", { logged_in: false });
  }
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
  res.render("forgetpass");
});



app.get("/studentsdashboard", function (req, res) {
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
  res.render("students/studentdashboard", {
    logged_in: req.session.user.isAuthenticated,
  });
});
/////////////////////////////////////////////All Get Request///////////////////////////////////////////////////////////////

////////////////////////////////////////////All Post Req////////////////////////////////////////////////////////////////////






app.listen(3000);
