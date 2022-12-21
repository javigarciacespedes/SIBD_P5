// Cargamos los modelos para usarlos posteriormente
const Patient = require('../models/patient');

exports.list = async function () {
    let result = await Patient.find();
    return result;
}

exports.read = async function (patientId) { 
    let result = await Patient.findOneAndUpdate({"_id": patientId}, {"premium": true});
    return result; 
}

exports.create = async function (body) { //***********************
    const doc = new Patient(body);
    let result = await doc.save();
    console.log(body)
    //let result = await Patient.insertMany({body})
    console.log(result)
    return result;
    /*
    let result= await newDoc.save();
    return result;
    */
}

exports.update = async function (patientId, body) {
    let result = await Patient.findOneAndUpdate({"_id": patientId}, {body})
    return result;
}

exports.delete = async function (patientId) {
    let result = await Patient.deleteOne({"_id": patientId});
    return result; 
}

exports.filterPatientsByCity = async function (city) {
    let result= await Patient.find({"city": city});
    return result; 
}

exports.filterPatientsByDiagnosis = async function (diagnosis) {
    let result= await Patient.find({"medicalHistory.diagnosis": diagnosis});
    return result; 
}

exports.filterPatientsBySpeacialistAndDate = async function (specialist, sDate, fDate) {
    let result = await Patient.find({"medicalHistory.date": {$gte: fDate, $lte: sDate}},{"medicalHistory.specialist": specialist});
    return result; 
}

exports.addPatientHistory = async function (patientId, medicalRecord) {
    let result= await Patient.findOneAndUpdate({_id: patientId},{$push: {"medicalHistory": medicalRecord}},{new: true});
    return result;
}