var express = require('express')
var router = express.Router()
var pool = require('./pool')
var LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');
/* GET home page. */
router.get('/adminlogin', function (req, res, next) {
  res.render('adminlogin', { message: '' });
});
router.post('/chkadminlogin', function (req, res, next) {

  pool.query("select * from administrator where (emailid =? or moblinumber =?)  and password = ?", [req.body.email_mobile, req.body.email_mobile, req.body.pwd], function (error, result) {
    if (error) {

      res.render('adminlogin', { message: 'server Error' })
    }
    else {
      if (result.length == 1) {
        res.render('dashboard', { data: result })
      }
      else {
        res.render('adminlogin', { 'message': 'invalid email address/mobile Number/Password' })
      }
    }
  })
});

module.exports = router;