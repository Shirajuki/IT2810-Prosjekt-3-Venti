import { default as connectMongoDBSession} from "connect-mongodb-session";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import fs from "fs";
import * as mongoose from "mongoose";
import path from "path";
dotenv.config();
import adminRoute from "./routes/admin";
const app = express();
const url = "mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db";
const MongoDBStore = connectMongoDBSession(session);
const expirationTime = 24 * 60 * 60 * 365 * 1000; // 30 days in ms
const store = new MongoDBStore({
	uri: url,
	expires: expirationTime,
	collection: "sessions",
	connectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
});

// Catch errors
store.on("error", (error) => {
	console.log(error);
});

// Session auth
const sess = {
	secret: "ecommerce_app",
	resave: false,
	saveUninitialized: false,
	store,
	cookie: {
		maxAge: expirationTime,
		sameSite: false,
		httpOnly: false,
		secure: false,
	}
}
if (app.get("env") === "production") {
	app.set("trust proxy", 1); // trust first proxy
	sess.cookie.secure = true; // serve secure cookies
}
app.use(session(sess))

// app.use(cors());
app.use(cors({credentials: true, origin: "http://localhost:1111"}));

// app.set("view engine", "ejs");
app.set("views", "./src/pages");

app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static(path.join(`${__dirname}/public`)));

const port = process.env.PORT || 8080;

const useMockDatabase = false;

if (useMockDatabase) {
	app.get("/", (_, res) => {
		const filePath = "../mock-data/index.json"
		fs.readFile(filePath, (err, json) => {
			try {
				res.json(JSON.parse(String(json)))
			} catch (ex) {
				res.json({})
			}
		})
	})
	app.get("/:file", ({params:{file}}, res) => {
		const filePath = "../mock-data/" + file + ".json"
		console.log(filePath)
		fs.readFile(filePath, (err, json) => {
			try {
				res.json(JSON.parse(String(json)))
			} catch (ex) {
				res.json({})
			}
		})
	})
	app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
} else {
		app.use("/", adminRoute);
		mongoose
		.connect(url, {
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
	}
