var express = require("express");
var router = express.Router();
var path = require('path');
var fs = require("fs");
var axios =require('axios');
var FormData=require('form-data');
var atob= require('atob');
var Blob=require('blob');
/* GET home page. */
router.post("/uploadbase", async function (req, res, next) {
  let arr =[];
  arr = req.body;
  
  var form = new FormData();
  //wait form until compeleting appending
  var xForm = await saveBlobImages(form,arr);

  let formHeaders =xForm.getHeaders();
 
//console.log(form);

  //sending image copy to server 2 in form data
  axios.post('http://localhost:3002/uifd/upload',xForm,{
    headers: {
      ...formHeaders,
    },
  })
  .then(res=>console.log('ok'))
  .catch(err=>console.log('not ok'));

  res.status(200).json({
    success: true,
    document: 'hi',
  });
});
//using promise function for handling asyn issues , ordering tasks 
function saveBlobImages(form,arr) {
  return new Promise(resolve => {
    let base64String ;
    let base64Image ;
    for(let elem of arr){
      base64String =elem.imageData;
      base64Image =base64String.split(';base64,').pop();
      const filePath = 'images/'+elem.imageName;
      fs.writeFileSync(filePath,base64Image,{encoding : 'base64'});
      //console.log('file created');
      let stream = fs.createReadStream(filePath);
      form.append('imageFiles',stream);
      //console.log({form3:form});
    }
    //console.log({form2:form});
    resolve(form);
  });
}

module.exports = router;
