const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//deklarasi model??
const User = require('./models/PatientData');


async function getNumberofRecord(pasienID) {
	 try{
        const query = {
                    id_pasien: pasienID
        }
        console.log(query.pasienID);
        const dataPatient_Last = await User.find(query).limit(1).sort({$natural:-1});
        const noRecord = dataPatient_Last.noRecord;
        console.log(noRecord);
        if (noRecord == null){
            noRecord = 0;
            console.log('Belum ada data pasien, membuat record baru');
        }
        return noRecord;
        //res.json(datadataPatient_Last); 
    }catch(err){
        console.log(err);
        res.json({message: 'err GET LAST by All DataEKG ID'});
    }
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