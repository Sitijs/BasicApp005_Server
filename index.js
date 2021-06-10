const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');




//ROUTES
//MIDDLEWARE:
//cors: public access
app.use(cors());
app.use(express.json());

//middleware body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

//middleware
app.use(express.json());
//route middlewares
const authRoute = require('./routes/auth');
//import routes
const DataRoute = require ('./routes/DataRoute');
//MIDDLEWARE dari URL HOME/post ke postsRoutes
app.use('/data', DataRoute);
//MIDDLEWARE dari URL HOME/post ke postsRoutes

app.get('/', (req,res) => {
	res.send('server data dummy 004');
});

//connect to database
mongoose.connect('mongodb+srv://sitijs:admin24@cluster0.l556o.mongodb.net/Data004?retryWrites=true&w=majority',{
	useNewUrlParser:true, 
	useUnifiedTopology: true,
	useCreateIndex: true,
	useFindAndModify: false
},
	 () => 
 console.log('connected to DB!')
);


app.use('/api/user', authRoute);






app.listen(3000,() => console.log('Server Up and Running'));