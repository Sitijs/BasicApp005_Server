var PORT = process.env.PORT || 3000;
const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//middlewares
//app.use(auth);

//ROUTES
//MIDDLEWARE:
//cors: public access
app.use(cors());
//middleware body parser
//app.use(bodyParser.json());

//middleware body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));


//import routes
const DataRoute = require ('./routes/DataRoute');
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/data', DataRoute);
//MIDDLEWARE dari URL HOME/post ke postsRoutes

//ROUTE: neghubungin ke post dan get dkk
app.get('/', (req,res) => {
	res.send('server data dummy 001');
});


//Connect to DB
// mongoose.connect(
// 	process.env.DB_CONNECT_URL,  
// 	{useNewUrlParser: true, useUnifiedTopology: true },
// 	() => console.log('connect to DB moongoose compass'),
// );
// mongoose.set('useCreateIndex', true);

//connect to Database
mongoose.connect('mongodb+srv://sitijs:admin24@cluster0.l556o.mongodb.net/Data003?retryWrites=true&w=majority',{
	useNewUrlParser:true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
},
	 () => 
 console.log('connected to Database!')
);

//listening to server
//app.listen(3000);
// //import package
// //server
// const express = require('express');
// const app = express();
// //database
// const mongoose = require('mongoose');
// //cors
// const cors = require('cors');
// //secret params
// require('dotenv/config');

// //MIDDLEWARE:
// //cors: public access
// app.use(cors());
// //middleware body parser
// app.use(bodyParser.json());


// //import routes
// const patientRoute = require ('./routes/patient');
// //MIDDLEWARE dari URL HOME/post ke postsRoutes
// app.use('/patient', patientRoute);


// //ROUTE: neghubungin ke post dan get dkk
// app.get('/', (req,res) => {
// 	res.send('MedRec Home Base Server');
// });


// //Connect to DB
// mongoose.connect(
// 	process.env.DB_CONNECT_URL,  
// 	{useNewUrlParser: true, useUnifiedTopology: true },
// 	() => console.log('connect to DB moongoose compass'),
// );
// mongoose.set('useCreateIndex', true);

// //start LISTEN AT PORT:
// app.listen(4000);
app.listen(PORT, function () {
 console.log('Server running');
});