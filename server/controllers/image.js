var AWS = require('aws-sdk');
var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var s3Config = require('../config/s3');
var lodash = require('lodash');
AWS.config.update(s3Config);

const db = require('../db/models/index');
const Image = db.Image;

// POST /:type/:id/images
const postImage = (req, res) => {
  try {
    lodash.forEach(req.files, (file) => {
      var fileName = new Date().getTime() + '-' + file.originalname.replace(" ","_");
      var key = 'user_content/images/' + fileName; 
      var params = {Body: file.buffer, Bucket: s3Config.bucket, Key: key};
      s3.putObject(params).promise().then((data) => {
        data.filename = fileName;
        if (req.params.type === 'blog') {
          Image.create({
            filename: fileName,
            UserId: req.session.user.id,
            BlogId: req.params.id,
          }).catch((err) => { throw err;});
        } else if (req.params.type === 'idea') {
          Image.create({
            filename: fileName,
            UserId: req.session.user.id,
            IdeaId: req.params.id, 
          }).catch((err) => { throw err;});
        }
        res.status(200).send(data);
      }).catch((err) => { throw err;});
    });
  } catch (e) {
    return res.status(500).json({
      errors: {
        error: e.stack
      },
    });
  }
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

// GET /:type/:id/images
const getImageUrls = (req, res) => {
  if (req.params.type === 'blog') { 
    Image.findAll({
      where: {
        'BlogId': req.params.id
      },
    }).then((images) => {
      const imageUrls = images.map(image => "/image/" + image.filename);
      res.send(imageUrls);
    })
    .catch(err => {
      return res.status(500).json({
        errors: {
          error: err.stack
        },
      });
    });
  } else if (req.params.type === 'idea') {
    Image.findAll({
      where: {
        'IdeaId': req.params.id
      },
    }).then((images) => {
      const imageUrls = images.map(image => "/api/image/" + image.filename);
      res.send(imageUrls);
    })
    .catch(err => {
      return res.status(500).json({
        errors: {
          error: err.stack
        },
      });
    });
  }
};

module.exports = {
  postImage,
  getImage,
  getImageUrls
};
