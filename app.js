const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");
const session = require("express-session");
const oracleDbStore = require("express-oracle-session2")(session);
const MySQLStore = require("express-mysql-session")(session);
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
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploadimage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

////////////////////////////////////File Upload End///////////////////

app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIo(server);
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

//////////////////////Database Connection Strat/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let connectionPool;

const connectionConfig = {
  user: "academia_plus_new",
  password: "12345",
  connectString: "192.168.1.2:1521/xepdb1",
};

async function initializeConnectionPool() {
  try {
    connectionPool = await oracledb.createPool(connectionConfig);
    console.log("Connection pool created.");
  } catch (err) {
    console.error("Error creating connection pool:", err);
    throw err;
  }
}

async function run(query, bindParams) {
  let connection;

  try {
    connection = await connectionPool.getConnection();

    if (bindParams) {
      const result = await connection.execute(query, bindParams, {
        autoCommit: true,
      });
      return { success: true, data: result.rows, error: null };
    } else {
      const result = await connection.execute(query, [], { autoCommit: true });
      return { success: true, data: result.rows, error: null };
    }
  } catch (err) {
    console.error("Error executing query:", err);
    return { success: false, data: null, error: err.message };
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error("Error closing connection:", err);
      }
    }
  }
}

initializeConnectionPool();

////////////////////////////////////////////////////////end of bd connection prototype////////////////////////////////////////////////////////

////////////////////////////////////////////All Get Request ////////////////////////////////////////////////////////////////////////////////
app.get("/", async function (req, res) {
  res.redirect("index");
});

app.get("/index", async function (req, res) {
  const result = await run('SELECT * FROM "ACADEMIA_PLUS_NEW"."APPLICANTS"');
  console.log(result.data);
  if (result.success) {
    console.log(result.data);
    res.render("index", { result: result.data, db_stat: result.success });
  } else {
    res.render("index", { result: result.data, db_stat: result.success });
  }
});

app.get("/admission", function (req, res) {
  res.render("admission");
});
app.get("/events", function (req, res) {
  res.render("events");
});
app.get("/history", function (req, res) {
  res.render("history");
});
app.get("/achievements", function (req, res) {
  res.render("achievements");
});

app.get("/facultyStaffInfo", function (req, res) {
  res.render("facultyStaffInfo");
});
app.get("/message", function (req, res) {
  res.render("message");
});
app.get("/governingbody", function (req, res) {
  res.render("governingbody");
});
app.get("/admin", function (req, res) {
  res.render("admin");
});
app.get("/GuidelineforParents", async function (req, res) {
  const gline = await run(
    'SELECT * FROM "ACADEMIA_PLUS_NEW"."GUIDELINE_FOR_PARRENTS"'
  );
  console.log(gline.data);
  if (gline.success) {
    console.log(gline.data);
    res.render("GuidelineforParents", {
      gline: gline.data,
      db_stat: gline.success,
    });
  } else {
    res.render("GuidelineforParents", {
      gline: gline.data,
      db_stat: gline.success,
    });
  }
});
app.get("/library", function (req, res) {
  res.render("library");
});
app.get("/clubs", function (req, res) {
  res.render("clubs");
});
app.get("/notice", function (req, res) {
  res.render("notice");
});
app.get("/contact", function (req, res) {
  res.render("contact");
});
app.get("/codeofconduct", function (req, res) {
  res.render("codeofconduct");
});
app.get("/routine", function (req, res) {
  res.render("routine");
});
app.get("/photos", function (req, res) {
  res.render("photos");
});
app.get("/videos", function (req, res) {
  res.render("videos");
});
app.get("/calender", function (req, res) {
  res.render("calender");
});
app.get("/cocur", function (req, res) {
  res.render("cocur");
});
app.get("/dress", function (req, res) {
  res.render("dress");
});
app.get("/apply", function (req, res) {
  res.render("admission/apply");
});
app.get("/applicant_dashboard", function (req, res) {
  if (!req.session.user.isAuthenticated) {
    res.redirect("log_in.ejs");
  }
  console.log(req.session.user);
  res.render("admission/applicant_dashboard");
});

app.get("/log_in", async function (req, res) {
  res.render("log_in");
});

app.get("/exam", async function (req, res) {
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  let randomNumbers = new Set();
  
  while (randomNumbers.size < 10) {
    let randomNumber = getRandomNumber(1, 19);
  
    // Check if the number is not in the set before adding
    if (!randomNumbers.has(randomNumber)) {
      randomNumbers.add(randomNumber);
    }
  }
  
  // Convert the Set to an array if needed
  let uniqueNumbersArray = Array.from(randomNumbers);

  
    const query = `
      SELECT * FROM "ACADEMIA_PLUS_NEW"."ADMISSION_QUESTIONS"
      WHERE ID IN (${uniqueNumbersArray.join(', ')})`;
    
    const result = await run(query);

   
      const questions = result.data;

      console.log(randomNumbers);
      
      res.render("admission/exam", { questions:questions });
    
});


/////////////////////////////////////////////All Get Request///////////////////////////////////////////////////////////////

////////////////////////////////////////////All Post Req////////////////////////////////////////////////////////////////////

app.post("/applyform", upload.single("image"), async function (req, res) {
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
  INSERT INTO APPLICANTS (
    APPLICANT_NAME, MOBILE_NO, FATHER_NAME, MOTHER_NAME,
    P_ADDRESS, C_ADDRESS, DOB, CLASS, IMAGE_ADDRESS
  ) VALUES (
    :student_name, :phone_no, :father_name, :mother_name,
    :present_address, :current_address, TO_DATE(:dob, 'YYYY-MM-DD'),
    :class, :image
  )`,
      {
        student_name: data.student_name,
        phone_no: data.phone_no,
        father_name: data.fathe_name,
        mother_name: data.mother_name,
        present_address: data.present_address,
        current_address: data.current_address,
        dob: data.dob,
        class: data.class,
        image: image_name,
      }
    );

    const s_id = await run(
      'SELECT APPLICANT_ID FROM "ACADEMIA_PLUS_NEW"."APPLICANTS" WHERE MOBILE_NO= :phone_no',
      { phone_no: data.phone_no }
    );

    res.json({ reply: det.success, p_no: data.phone_no, a_id: s_id.data });
  }
});

app.post("/login", async function (req, res) {
  let data = req.body;
  const info = await run(
    'SELECT * FROM "ACADEMIA_PLUS_NEW"."APPLICANTS" WHERE MOBILE_NO = :phone_no AND APPLICANT_ID = :password',
    { phone_no: data.phone_no, password: data.password }
  );

  if (info.data.length > 0) {
    req.session.user = {
      id: info.data[0][0],
      name: info.data[0][1],
      account_type: "Applicant",
      isAuthenticated: true,
    };

    req.session.save(function () {
      res.json({ reply: info.success, data: info.data });
    });
  } else {
    res.json({ reply: info.success, data: info.data });
  }
});

app.listen(3000);
