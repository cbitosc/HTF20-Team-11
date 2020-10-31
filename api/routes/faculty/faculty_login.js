const express = require('express');

const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Shrikar:shrikar123@cluster0.lwbvg.mongodb.net/<dbname>?retryWrites=true&w=majority";

   
router.post('/',(req,res,next)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.status(404).json({'message': "Failed to connect to dB."});
        };
        var dbo = db.db("Faculty_db");
        // console.log(req);
        var condition={_id : parseInt(req.body.login_id)}; 
        dbo.collection('Data').find(condition).toArray((err,result)=>{
            if (err) {
                //pass
            }
            else{
                if (result.length == 0){
                    res.status(400).json({'status': 0, 'message': 'Invalid Login.'})
                }
                else{
                    result = result[0];
                    if (result.password == req.body.password){
                        res.status(200).json({'status': 1, 'message': 'Login successful.', 'id': req.body.login_id})
                    }
                    else{
                        res.status(404).json({'status': 0, 'message': 'Invalid Password.'})
                    }
                    
                }    
            }
         
        })
        db.close();
    })

});            
module.exports= router;