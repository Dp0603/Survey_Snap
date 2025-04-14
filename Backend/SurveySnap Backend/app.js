const express = require("express"); //express....
const mongoose = require("mongoose");
const cors = require("cors");
//express object..
const app = express();
app.use(cors());
app.use(express.json()); //to accept data as json...

//import role routes
const roleRoutes = require("./src/routes/RoleRoutes");
app.use(roleRoutes);

//userRoutes
const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const surveyRoutes = require("./src/routes/SurveyRoutes");
app.use("/survey", surveyRoutes);

const questionRoutes = require("./src/routes/QuestionRoutes");
app.use("/question", questionRoutes);

const responseRoutes = require("./src/routes/ResponseRoutes");
app.use("/responses", responseRoutes);

const surveydistributionRoutes = require("./src/routes/SurveyDistributionRoutes");
app.use("/distribution", surveydistributionRoutes);

const notificationRoutes = require("./src/routes/NotificationRoutes");
app.use("/notification", notificationRoutes);

const analyticsreportsRoutes = require("./src/routes/AnalyticsReportsRoutes");
app.use("/analytics", analyticsreportsRoutes);

const reportRoutes = require("./src/routes/ReportRoutes");
app.use("/report", reportRoutes);

const shareRoutes = require("./src/routes/ShareRoutes");
app.use("/share", shareRoutes);

const paymentRoutes = require("./src/routes/PaymentRoutes")
app.use("/payment", paymentRoutes)


mongoose.connect("mongodb://127.0.0.1:27017/Survey_Snap").then(() => {
  console.log("database connected....");
});

//server creation...
const PORT = 3000;
app.listen(PORT, () => {
  console.log("server started on port number ", PORT);
});
