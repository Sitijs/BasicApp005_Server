//DATA MODEL
const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
	id_pasien: {
		type: String,
		required: true
	},
	Name:{
		type: String,
		required: true
	}, 
	Birthdate: {
		type: String,
		default: true
	},
	Notes: {
		type: String
	},
	Channel_I:{
		type: [Number],
		required: true
	},
	Channel_II:{
		type: [Number],
		required: true
	},
	Channel_III:{
		type: [Number],
		required: true
	},
	Channel_aVR:{
		type: [Number],
		required: true
	},
	Channel_aVL:{
		type: [Number],
		required: true
	},
	Channel_aVF:{
		type: [Number],
		required: true
	},
	Channel_C1:{
		type: [Number],
		required: true
	},
	Channel_C2:{
		type: [Number],
		required: true
	},
	Channel_C3:{
		type: [Number],
		required: true
	},
	Channel_C4:{
		type: [Number],
		required: true
	},
	Channel_C5:{
		type: [Number],
		required: true
	},
	Channel_C6:{
		type: [Number],
		required: true
	}

});

//export modelData sebagai Posts
module.exports = mongoose.model('PatientData', PatientSchema);