const express = require('express');

const router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Shrikar:shrikar123@cluster0.lwbvg.mongodb.net/<dbname>?retryWrites=true&w=majority";

router.get('/:PersonId',(req,res,next)=>{
    var BodyofPage={'status': 0,'leaves_left': 0, 'data' :{}};
    MongoClient.connect(url, function(err, db) {
        if (err) {
            res.status(404).json({'message': "Failed to connect to dB."});
        };
        var dbo = db.db("Leaves");
        var condition={faculty_id : parseInt(req.params.PersonId)};

        dbo.collection('Data').find(condition).toArray((err,result)=>{
            if (result.length == 0){
                res.status(404).json({'status': 0, 'message': 'No Leaves Taken/Applied.'})
            }
            else{
                var total_days = 0
                data = []
                result.forEach((element) => {
                    data.push({
                        'date_of_application': element.date_of_application,
                        'no_of_days': element.number_of_days,
                        'status': element.status,
                        'from_date': element.from_date,
                        'to_date' : element.to_date,
                        'reason': element.reason
                        
                    })
                    total_days += element.number_of_days
                })
                    BodyofPage.status = 1
                    BodyofPage.data = data.reverse()
                    BodyofPage.leaves_left = 20 - total_days
                    res.status(200).json(BodyofPage)
                console.log(result)
                
            }})
        db.close();
    })

});            
module.exports= router;