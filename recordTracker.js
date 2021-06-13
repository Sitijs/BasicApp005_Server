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
	await User.find(query).limit(1).sort({$natural:-1})
	.then(result =>{
		noRecord = result.noRecord;
	})
	.catch (err => console.error (err, 'err get number record'))
    if (noRecord == null){
        noRecord = 0;
    }
	return noRecord;

}
async function updateNumberofRecord(pasienID) {
    const query = {
        id_pasien : pasienID
    }
    const lastIndex = await getNumberofRecord(pasienID);
    console.log(lastIndex)
    const newIndex = lastIndex+1;
    console.log(newIndex)
    const newRecordNumber = {
        noRecord : newIndex
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