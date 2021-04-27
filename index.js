const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const routes = require('./routes/basicRoutes');
var cors = require("cors");

app.use(cors());
//const bcrypt = require("bcryptjs");


//MODELS
const members = require("./models/members");
const courses = require("./models/courses");
const requests = require("./models/requests");
const expiredtoken = require("./models/expiredtokens");
const months = require("./models/months");
const locations = require("./models/locations");
const faculties = require("./models/faculties");
const departments = require("./models/departments");
const slots = require("./models/slots");
const counters = require("./models/counters");
const reqCounter = require("./models/reqCounter");

const dotenv = require("dotenv");
dotenv.config();

const JWT_PASSWORD = "}TWLr:NsZtR5,q<J";

var moment = require("moment");
const jwt = require("jsonwebtoken");
//JOI
const {
  assigninstructor,
  updateinstructorcourse,
  viewStaffinDepartment,
  viewDayoff,
  acceptLeaveRequest,
  rejectHODRequest,
} = require("./joi/hod_joi");
const { schemaslot, schemaslot2 } = require("./joi/farah_joi");
const {
  sendslotlinking,
  sendChangeDayOff,
  sendSlotReplacement,
  acceptReplacemant,
  rejectReplacemant,
  sendLeave,
  cancelRequest,
} = require("./joi/ac_joi");
const {
  schemamember,
  schemamember2,
  schemalocation,
  schemalocation2,
  schemafaculty,
  schemadepartment,
  schemadepartment2,
  schemacourse,
  schemacourse2,
  schemamiss,
  schemasalary,
  schemasign,
} = require("./joi/hr_joi");
const {
  logincheck,
  resetFirstPasswordcheck,
  attendancecheck,
  missingdayCheck,
  updateProfileCheck,
  resetPassordCheck,
} = require("./joi/staff_joi");
const { date } = require("joi");
const slotsCounter = require("./models/slotsCounter");

//middleware
//app.use(express.json());
const connectionParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

app.use(express.urlencoded({extended: true})); 
app.use(bodyParser.json({limit: '200mb', extended: true}))
app.use(bodyParser.urlencoded({ limit: '200mb', extended: true, parameterLimit: 50000 }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});



const URL =
  "mongodb+srv://Martha:Wowzi@cluster0.z3mgg.mongodb.net/projDB?retryWrites=true&w=majority";

mongoose
  .connect(URL, connectionParams)
  .then(() => {
    console.log("Db is connected");
  })
  .catch(() => {
    console.log("Db is not connected");
  });

console.log("here");

app.use('/', routes)

if (process.env.NODE_ENV === "production") {

  
  app.use(express.static(path.join(__dirname, "client", "build")));

  

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html")); // relative path
  });
 
}



const Port = process.env.PORT || 10000;

app.listen(Port, () => {
  console.log(`This server is running on  ${Port}`);
});
////////////////////////////////////////////////////////////////////////////FUNCTIONS//////////////////////////
