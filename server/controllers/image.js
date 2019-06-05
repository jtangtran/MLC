var AWS = require('aws-sdk');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var s3Config = require('../config/s3');
var lodash = require('lodash');

AWS.config.update(s3Config);


// POST /image
const postImage = (req, res) => {
  lodash.forEach(req.files, (file) => {
    var fileName = new Date().getTime() + '-' + file.originalname.replace(" ","_");
    var key = 'user_content/images/' + fileName; 
    var params = {Body: file.buffer, Bucket: s3Config.bucket, Key: key};
    s3.putObject(params).promise().then((data) => {
      data.filename = fileName;
      res.status(200).send(data);
    }).catch((err) => {
      res.status(500).json({
        errors: {
          error: err.stack
        }
      });
    });
  });
};

// GET /image/:filename
const getImage = (req, res) => {
  var imgStream = s3.getObject({
    Bucket: s3Config.bucket,
    Key: 'user_content/images/'
    + req.params.filename
  }).createReadStream();
  imgStream.pipe(res);
};

module.exports = {
  postImage,
  getImage
};
