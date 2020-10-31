const express = require('express');

const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Shrikar:shrikar123@cluster0.lwbvg.mongodb.net/<dbname>?retryWrites=true&w=majority";

router.get('/:PersonId',(req,res,next)=>{
    var BodyofPage={'status': 0, 'data' :{}};
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.status(404).json({'message': "Failed to connect to dB."});
        };
        var dbo = db.db("Faculty_db");
        var condition={_id : parseInt(req.params.PersonId)}; 
        dbo.collection('Data').find(condition).toArray((err,result)=>{
            if (result.length == 0){
                res.status(404).json({'status': 0, 'message': 'ID not found.'})
            }
            else{
                result = result[0]
                data = {
                    'name': result.name,
                    'id': result._id,
                    'position': result.position,
                    'department': result.department,
                    'date_of_joining': result.date_of_joining.short,
                    'experience': result.experience
                }
                BodyofPage.status = 1
                BodyofPage.data = data
                res.status(200).json(BodyofPage)
            }})
        db.close();
    })

});            
module.exports= router;