const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//deklarasi model??
const User = require('./models/PatientData');


async function getNumberofRecord(pasienID) {
		const query = {
			id_pasien : pasienID
	}

	var noRecord;
	await User.findById(pasienID)
	.then(result =>{
		noRecord = result.number_of_record;
	})
	.catch (err => console.error ('err get number record'))
	return noRecord;

}
async function updateNumberofRecord(pasienID) {
    const query = {
        _id : pasienID
    }
    const lastIndex = await getNumberofRecord(pasienID);
    console.log(lastIndex)
    const newIndex = lastIndex+1;
    console.log(newIndex)
    const newRecordNumber = {
        number_of_Record : newIndex
    }
    console.log(newRecordNumber)
    await User.updateOne(query, newRecordNumber)
    .then(result => {
        console.log(result)
    })
    .catch(err => console.error(`err get number record `))
    return newIndex;
} 

module.exports.getNumberofRecord = getNumberofRecord;
module.exports.updateNumberofRecord = updateNumberofRecord;