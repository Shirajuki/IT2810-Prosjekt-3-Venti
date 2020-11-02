import { default as connectMongoDBSession} from "connect-mongodb-session";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import mongoose from "mongoose";
dotenv.config();
import adminRoute from "./routes/admin";
 
const app = express();
const url = "mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db";
const MongoDBStore = connectMongoDBSession(session);
const expirationTime = 24 * 60 * 60 * 365 * 1000; // 30 days in ms
const store = new MongoDBStore({
	uri: url,
	collection: "sessions",
	connectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	expires: expirationTime,
});
 
// Catch errors
store.on('error', function(error: any) {
  console.log(error);
});
 
// Session auth
const sess = {
	secret: "ecommerce_app",
	resave: true,
	saveUninitialized: true,
	store: store,
	cookie: {
		maxAge: expirationTime,
		sameSite: false,
		httpOnly: false,
		secure: false,
	}
}
app.use(session(sess))
 
app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
app.use("/", adminRoute);

mongoose.connect(url, {
	useCreateIndex: true,
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useFindAndModify: false,
})
.then(() => {
	app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
})
.catch((err) => {
	console.log(err);
});

////////////////////////////////////

// app.use(cors());
// app.set("view engine", "ejs");
// app.set("views", "./src/pages");
// app.use("/static", express.static(path.join(`${__dirname}/public`)));
