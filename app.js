const express = require("express");
const app = express();
const socketIo = require("socket.io");
const http = require("http");
const path = require("path");
const bodyParser = require("body-parser");
const oracledb = require("oracledb");

app.use(express.urlencoded({ extended: true }));
const server = http.createServer(app);
const io = socketIo(server);
app.use(express.static("public"));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
var screenWidth;

app.post("/setScreenWidth", (req, res) => {
  screenWidth = req.body.screenWidth;
  console.log("Received screen width:", screenWidth);

  res.sendStatus(200);
});

//////////////////////Database Connection Strat/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let connectionPool;

const connectionConfig = {
  user: "c##academia_plus",
  password: "12345",
  connectString: "192.168.1.3:1521/xepdb1",
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

async function run(query) {
  let connection;

  try {
    connection = await connectionPool.getConnection();
    const result = await connection.execute(query);
    return { success: true, data: result.rows, error: null };
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
  const result = await run('SELECT * FROM "C##ACADEMIA_PLUS"."STUDENTS"');
  console.log(result.data);
  if (result.success) {
    console.log(result.data);
    res.render("index", { result: result.data });
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
app.get("/GuidelineforParents", async function (req, res) {
  const gline = await run(
    'SELECT * FROM "C##ACADEMIA_PLUS"."GUIDELINE_FOR_PARRENTS"'
  );
  console.log(gline.data);
  if (gline.success) {
    console.log(gline.data);
    res.render("GuidelineforParents", { gline: gline.data });
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
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.listen(3000);
