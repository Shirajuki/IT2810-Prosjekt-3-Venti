const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const adminRoute = require('./routes/admin')
const app = express();
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const expirationTime = 24 * 60 * 60 * 365 * 1000; // 30 days in ms
const store = new MongoDBStore({
	uri: 'mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db',
	collection: 'sessions',
	expires: expirationTime,
	connectionOptions: {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
});

// Catch errors
store.on('error', function(error) {
	console.log(error);
});

// Session auth
const sess = {
	secret: 'ecommerce_app',
	resave: false,
	saveUnitiliaized: false,
	store: store,
	cookie: { 
		maxAge: expirationTime,
		sameSite: false,
		httpOnly: false,
	}
}
if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	sess.cookie.secure = true // serve secure cookies
}
app.use(session(sess))

//app.use(cors());
app.use(cors({credentials: true, origin: 'http://localhost:1111'}));

app.set('view engine', 'ejs');
app.set('views', './src/pages');

app.use(express.urlencoded({ extended: false }));

app.use('/static', express.static(path.join(`${__dirname}/public`)));

app.use('/', adminRoute);

const port = 8080; // process.env.PORT || 8080;

mongoose.connect('mongodb://user:user@it2810-07.idi.ntnu.no:27017/project3db', { 
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
