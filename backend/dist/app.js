"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const admin_1 = __importDefault(require("./routes/admin"));
const app = express_1.default();
const url = "mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db";
const MongoDBStore = connect_mongodb_session_1.default(express_session_1.default);
const expirationTime = 24 * 60 * 60 * 365 * 1000; // 30 days in ms
const store = new MongoDBStore({
    collection: "sessions",
    connectionOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    expires: expirationTime,
    uri: "mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db"
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
    }
};
if (app.get("env") === "production") {
    app.set("trust proxy", 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
}
app.use(express_session_1.default(sess));
// app.use(cors());
app.use(cors_1.default({ credentials: true, origin: "http://localhost:1111" }));
// app.set("view engine", "ejs");
app.set("views", "./src/pages");
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/static", express_1.default.static(path_1.default.join(`${__dirname}/public`)));
const port = process.env.PORT || 8080;
const useMockDatabase = false;
if (useMockDatabase) {
    app.get("/", (_, res) => {
        const filePath = "../mock-data/index.json";
        fs_1.default.readFile(filePath, (err, json) => {
            try {
                res.json(JSON.parse(json));
            }
            catch (ex) {
                res.json({});
            }
        });
    });
    app.get("/:file", ({ params: { file } }, res) => {
        const filePath = "../mock-data/" + file + ".json";
        console.log(filePath);
        fs_1.default.readFile(filePath, (err, json) => {
            try {
                res.json(JSON.parse(json));
            }
            catch (ex) {
                res.json({});
            }
        });
    });
    app.listen(port, () => console.log(`Server and Database running on ${port}, http://localhost:${port}`));
}
else {
    app.use("/", admin_1.default);
    mongoose_1.default
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
//# sourceMappingURL=app.js.map