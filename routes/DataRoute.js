const express = require('express');
const router = express.Router();
const mongoose = require ('mongoose');
//Deklarasi Model
const dataPatient = require('../models/PatientData');
//const Patient_RekamMedisStatis = require('../models/Patient_Statis_Model');
//TEST PATH:
// router.get('/', (req,res) => {
// 	res.send('This is POST')

// });
//DATA DIRI
	router.get('/test', async (req,res) => {
		try{
			//const patient = await Patient_DataDiri.find(); //ngasih semua data yang udah kesimpan
			res.json("Hai ini POST");
			console.log(err);
		}catch(err){
			res.json({message: 'err GET ALL'});
		}
	});

	//SUBMIT DATADIRI
	router.post('/save', async (req,res) => { //pake async kalau save CARA 2
		console.log(req.body) //cek Body
		const post = new dataPatient({
			//jadi ikut schema baru
            id_pasien: req.body.id_pasien,
            Name: req.body.Name,
            Birthdate: req.body.Birthdate,
            Notes: req.body.Notes,
            Channel_I: req.body.Channel_I,
            Channel_II: req.body.Channel_II,
            Channel_III: req.body.Channel_III,
            Channel_aVR: req.body.Channel_aVR,
            Channel_aVL: req.body.Channel_aVL,
            Channel_aVF: req.body.Channel_aVF,
            Channel_C1 : req.body.Channel_C1,
            Channel_C2: req.body.Channel_C2,
            Channel_C3: req.body.Channel_C3,
            Channel_C4: req.body.Channel_C4,
            Channel_C5: req.body.Channel_C5,
            Channel_C6: req.body.Channel_C6
		});
	    // Save and validate
	    post.save()
	    .then(post=> {
	        return res.status(200).json({
	        message :'Data Berhasil Disimpan'
        })
    })
    .catch (err => {
        console.log(err);
        res.status(500).json({error:err.message});
    });
    
	});

	// //get back all the post
	router.get('/getAll', async (req, res) => {
		try{
			const post = await dataPatient.find();
			res.json(post);
		}catch(err){
			res.json({ message:err });
		}
	});

   //get Last
    router.get('/Lastest', async (req,res) => {
        try{
            const posts_Last = await dataPatient.find().limit(1).sort({$natural:-1});
            res.json(posts_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by EMG ID'});
        }
    });

    //get Last by ID
    router.get('/Lastest_Specific/:ID', async (req,res) => {
        try{
            const query = {
                id_pasien: req.query.id_pasien
            }
            console.log(req.body.id_pasien);
            const datadataPatient_Last = await dataPatient.find(query).limit(1).sort({$natural:-1});
            res.json(datadataPatient_Last); 
        }catch(err){
            console.log(err);
            res.json({message: 'err GET LAST by All Sensor ID'});
        }
    });

    //get All spesific
    router.get('/All_Specific', async (req,res) => {
        try{
            const query = {
                id_pasien: req.body.id_pasien
            }
            console.log(req.body.id_pasien);
            const datadataPatient_All = await dataPatient.find(query);
            console.log(datadataPatient_All);
            res.json(datadataPatient_All);   
        }catch(err){
            console.log(err);
            res.json({message: 'err GET ALL Sensor by ID'});
        }
    });
    

module.exports = router;