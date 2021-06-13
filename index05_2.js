var PORT = process.env.PORT || 3000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

const authRoute = require('./routes/auth');
const DataRoute = require ('./routes/DataRoute');
app.use('/data', DataRoute);
app.use('/api/user', authRoute);

app.get('/', (req,res) => {
	res.send('server data dummy 004');
});

const recordRoute = require('./routes/recordTrackerRoute');
app.use('/record', recordRoute);

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








app.listen(PORT, function () {
 console.log('Server running');
});