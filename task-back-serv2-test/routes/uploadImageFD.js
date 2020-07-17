var express = require('express');
var router = express.Router();
var multer = require('multer');

const storage= multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'./uploads/');
    },
    filename : function(req,file,cb){
        cb(null,file.originalname);
    }
})

var upload = multer({
    storage: storage,
});
router.post('/upload', upload.array('imageFiles'),function(req, res, next) {
  res.send('server 2 image saved')
});

module.exports = router;
