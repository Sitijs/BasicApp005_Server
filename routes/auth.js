const router = require('express').Router();
const user = require('../models/User');
const bcrypt = require('bcryptjs')
const {registerValidation} = require('../validation');
const {loginValidation} = require('../validation');

router.get('/', (req,res) => {
	res.send('User route dummy 004');
});




router.post('/register', async (req,res)=> {

//validation data before we a user
// const validation = schema.validate(req.body);
// res.send(validation);

	const {error} = registerValidation(req.body);
	if (error) {
		return res.status(400).send(error.details[0].message);
		console.log(error.details[0].message);
	}

	//check apakah user sudah berada di database
	const emailExist = await User.findOne({email: req.body.email});
	if (emailExist) {
		return res.status(400).send('email sudah ada');
		console.log('email sudah ada');
	}

	//hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);



// 	console.log("here");
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashPassword
	});

	try{
		console.log(user);
		const savedUser = await user.save();
		res.send({user: user._id});
	}catch (err){
		res.status(400).send(err);
		console.log(err);
	}
});


	//login
	router.post('/login', async (req,res)=> {
		const {error} = loginValidation(req.body);
		if (error) {
			return res.status(400).send(error.details[0].message);
			console.log(error.details[0].messag);
		}
			//check apakah user sudah berada di database
			const user = await User.findOne({email: req.body.email});
			if (!user) {
				return res.status(400).send('email atau password salah');
				console.log('email atau password salah');
			}


			//password is correct
			const validPass = await bcrypt.compare(req.body.password, user.password);
			if(!validPass) {
				return res.status(400).send('invalid password');
				console.log('invalid password');
			}

			res.send({user: user._id});


	});
module.exports = router;