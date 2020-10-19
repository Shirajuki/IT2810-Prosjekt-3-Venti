var createError = require("http-errors");
var express = require("express");
const mongo = require("mongoose");
var schema = require("./mongo-models/makeup");
var cors = require("cors");
const bodyParser = require("body-parser");
var app = express();
//const MakeupRouter = require("./routes/makeup-router")

const db = require('./db')


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

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

//app.use('/api', MakeupRouter)

//Linjen under trengs ved fetching av data,
app.listen(8080, () => {
  console.log("Server running succefully...");
});
//app.use("/graphiql", graphqlHTTP({ schema: require(schema), graphiql: true }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use('*', cors());


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const MakeUpModel = mongo.model("product", {
  name: String,
  brand: String,
  image: String,
  product_type: String,
  description: String,
  product_colors: Array
})



module.exports = app;
