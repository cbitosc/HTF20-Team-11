// const e = require('express');
const express = require('express');

const router = express.Router();
// const async = require('async');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Shrikar:shrikar123@cluster0.lwbvg.mongodb.net/<dbname>?retryWrites=true&w=majority";

   
/* 
    Body : { faculty_name, faculty_id, faculty_dept, from_date, to_date, reason 
*/
/* 
    DBS : Faculty and Leaves
*/

router.post('/',(req,res,next)=>{
    var leave_body = {}
    var leave_id = 0
    MongoClient.connect(url, function(err, db) {
        console.log('Here')
        if (err) {
            res.status(404).json({'message': "Failed to connect to dB."});
        };
        var number_of_leaves_requested = Math.ceil((Math.abs(new Date(req.body.from_date)-new Date(req.body.to_date))) / (1000 * 60 * 60 * 24));  
        var dbo_1 = db.db("Faculty_db")
        var condition = {_id : parseInt(req.body.faculty_id)}
        var dbo = db.db("Leaves");
            dbo_1.collection('Data').find(condition).toArray((err, result) => {
                console.log('inside dbo')
                    // if (err){
                    //     console.log(err)
                    // }
                        if (result.length == 0){
                            res.status(400).json({'status': 0, 'message': 'Invalid ID.'});
                            db.close()
                            return;
                        }
                        result = result[0]
                        leave_body = {
                            'faculty_name': result.name,
                            'faculty_id'  : result._id,
                            'faculty_dept': result.department,
                            'from_date'   : Date.parse(req.body.from_date),
                            'to_date'     : Date.parse(req.body.to_date),
                            'reason'      : req.body.reason,
                            '_id'         : 0,
                            'number_of_days': 0,
                            'status': 0,
                            'date_of_application': new Date()
                        }
                        result = result[0];
                        if (number_of_leaves_requested > 20){
                            res.status(400).json({'status': 0, 'message': 'Leaves not available.'});
                            db.close();
                            return;
                        }
                        else{
                            leave_body.number_of_days = number_of_leaves_requested;
                            console.log('Inside Else')
                        }
                        dbo.collection('Data').find({}).toArray((err, result) => {
                            
                            if (typeof(result) === 'undefined'){
                                leave_id = 1;
                            }
                            else{
                                leave_id = result.length + 1;
                            }   
                            leave_body._id = leave_id;
                        dbo.collection('Data').insertOne(leave_body,(err,result)=>{
                                if (err) {
                                    console.log(err)
                                }
                                else{
                                    res.status(200).json({'status': 1,'message': "Leave Application Successful"});
                                }
                            })
                        })
                
                }
            )})});
        
                 
module.exports= router;