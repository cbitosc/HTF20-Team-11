const express = require('express');

const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Shrikar:shrikar123@cluster0.lwbvg.mongodb.net/<dbname>?retryWrites=true&w=majority";

router.get('/:PersonId',(req,res,next)=>{
    var BodyofPage={'status': 0, notifications: []};
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.status(404).json({'message': "Failed to connect to dB."});
        };
        var dbo = db.db("Faculty_db");
        var condition={_id : parseInt(req.params.PersonId)}; 
        dbo.collection('Data').find(condition).toArray((err,result)=>{
            if (err) {
                // pass
            }
            else if (result.length == 0){
                // pass
            }
            else{
                result = result[0]
                for(item in result.notifications){
                    if (result.notifications[item].status == 0){
                        BodyofPage.notifications.push(item)
                }};
                if (BodyofPage.notifications.length == 1){
                    res.status(400).json({'status':0, 'message': 'No notifications.'})
                }
                else{
                    BodyofPage.status = 1;
                    BodyofPage.notifications.reverse();  
                    res.status(200).json(BodyofPage);
                    for(item in result.notifications){
                        result.notifications[item].status = 1;
                    };
                    var newvalues = { $set: {notifications: result.notifications} };
                    dbo.collection('Registration').updateOne(condition,newvalues).then(()=>{
                        db.close();        
                    })    
                }   
            }
        })
        db.close();
    })

});            
module.exports= router;