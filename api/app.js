var createError = require("http-errors");
var express = require("express");
const graphqlHTTP = require("express-graphql");
const mongo = require("mongoose");

var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const schema = require("./schema/schema");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

mongo.connect("mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db");

mongo.connection.on("open", function (err, doc) {
  console.log("connection established");

  mongo.connection.db.collection("products", function (err, docs) {
    // Check for error
    if (err) return console.log(err);
    // Walk through the cursor
    docs.findOne({}, function (err, doc) {
      // Check for error
      if (err) return console.err(err);
      // Log document
      console.log(doc);
    });
  });
});

//Linjen under trengs ved fetching av data,
app.listen(8080, () => {
  console.log("Server running succefully...");
});
//app.use("/graphiql", graphqlHTTP({ schema: require(schema), graphiql: true }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
