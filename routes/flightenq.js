var express = require('express')
var router = express.Router()
var pool = require('./pool')
var upload = require('./multer')
router.get('/flightinterface',function(req,res){
    res.render('flightinterface',message='')
})
router.get('/displayallflight',function(req,res){
    pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.source)as source , (select C.cityname from cities C where C.cityid=F.destination)as destination from flightsdetails F",function(error,result){
        if(error){
            console.log(error)
            res.render('displayallflight',{'data':[],message:'server error'})
        }
        else{
            res.render('displayallflight',{'data':result,'message':'success'})
        }
    })
})
router.get('/searchbyid',function(req,res){
    pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.source)as source , (select C.cityname from cities C where C.cityid=F.destination)as destination from flightsdetails F where flightid=?",[req.query.fid],function(error,result){
        if(error){
            console.log(error)
            res.render('flightbyid',{'data':[],message:'server error'})
        }
        else{
            res.render('flightbyid',{'data':result[0],'message':'success'})
        }
    })
})

router.get('/searchbyidforimages',function(req,res){
    pool.query("select F.*,(select C.cityname from cities C where C.cityid=F.source)as source , (select C.cityname from cities C where C.cityid=F.destination)as destination from flightsdetails F where flightid=?",[req.query.fid],function(error,result){
        if(error){
            console.log(error)
            res.render('showimage',{'data':[],message:'server error'})
        }
        else{
            res.render('showimage',{'data':result[0],'message':'success'})
        }
    })
})
router.post('/flightsubmit',upload.single('logo'),function(req,res){
    console.log("BODY",req.body)
    console.log("BODY",req.file)
    var days = (""+req.body.days).replaceAll("'",'"')
    pool.query("insert into flightsdetails(flightname, types, totalseats, days, source, departuretime, destination, arrialtime, company, logo)values(?,?,?,?,?,?,?,?,?,?)",[req.body.flightname,req.body.flighttype,req.body.noofseats,days,req.body.sourcecity,req.body.deptime,req.body.destinationcity,req.body.arrivaltime,req.body.company,req.file.originalname],function(error,result){
        if(error){
            console.log(error)
            res.render('flightinterface',{'message':'server error'})
        }
        else{
            res.render('flightinterface',{'message':'record submitted succesfully'})
        }
    })
})
router.get('/fetchallcities',function(req,res){
    pool.query("select * from cities",function(error,result){
        if (error) {
            res.status(500).json({result:[],message:'error'})
        }
        else {
            res.status(200).json({result:result,message:'Success'})
        }
    })
})

router.post('/flight_edit_delete',function(req,res){
    if (req.body.btn=="Edit") {
        var days = (""+req.body.days).replaceAll("'",'"')
    pool.query("update flightsdetails set flightname = ?, types=?, totalseats=?, days=?, source=?, departuretime=?, destination=?, arrialtime=?, company=?, logo=? where flightid=?",[req.body.flightname,req.body.flighttype,req.body.noofseats,days,req.body.sourcecity,req.body.deptime,req.body.destinationcity,req.body.arrivaltime,req.body.company,req.body.logo,req.body.flightid],function(error,result){
        if(error){
            console.log(error)
            res.redirect('/flight/displayallflight')
        }
        else{
            res.redirect('/flight/displayallflight')
        }
    })


    } 
    else {
            pool.query("delete from flightsdetails where flightid=?",[req.body.flightid],function(error,result){
                if(error){
                    console.log(error)
                    res.redirect('/flight/displayallflight')
                }
                else{
                    res.redirect('/flight/displayallflight')
                }
            })
        }
    })
    router.post('/editimage',upload.single('logo'),function(req,res){
        console.log("BODY",req.body)
        console.log("BODY",req.file)
        pool.query("update flightsdetails set logo=? where flightid = ?",[req.file.originalname,req.body.flightid],function(error,result){
            if(error){
                console.log(error)
                res.redirect('/flight/displayallflight')
            }
            else{
                res.redirect('/flight/displayallflight')
            }
        })
    })
module.exports = router;