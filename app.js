const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");

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
  connectString: "localhost:1521/xe",
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
app.get("/", async function (req, res) {
  await run();
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
  res.render("admission/applicant_dashboard");
});

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

app.listen(3000);
