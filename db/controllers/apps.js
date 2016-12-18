var App = require('../models/index.js').App;

var create = function(props, callback) {
  App.build(props)
  .save()
  .then(function(app) {
    callback(app);
  }).catch(function(err) {
    console.log(err);
  });
};

var findAll = function(appObj, callback) {
  App.findAll(appObj).then(function(apps) {
    callback(apps);
  }).catch(function(err) {
    console.log(err);
  });
};

var findOne = function(appObj, callback) {
  App.findOne(appObj).done(function(app) {
    console.log('🍊  Found one App in db:', app);
    callback(app);
  });
};

var uploadFiles = function (fs, s3Bucket, tmpDir, extractedFolder, jsonData, files, fileIndex, callback) {

  if (fileIndex === files.length) {
    console.log('Uploaded all files!')
    callback(jsonData);
    return;
  }

  var fileName = files[fileIndex];
  var fileExt = fileName.split('.')[1];
  var contentType = 'text/plain'

  if(fileExt === 'json' || fileExt === 'DS_Store') {

    uploadFiles(fs, s3Bucket, tmpDir, extractedFolder, jsonData, files, fileIndex+1, callback);

  } else {
    if (fileExt === 'html') {
      var tags = '';
      if (jsonData.jsLink) {
        tags += '<script src=\"'+jsonData.jsLink+'\"></script>';
      }
      if (jsonData.cssLink) {
        tags += '<link rel=\"stylesheet\" type=\"text/css\" href=\"'+jsonData.cssLink+'\" />'
      }
      fs.appendFileSync(tmpDir+extractedFolder+fileName, tags);
      console.log('Added tags to html file!')
    }
    fs.readFile(tmpDir+extractedFolder+fileName, (err, fileData) => {
      if (err) throw err;
      if(fileExt === 'css') {
        contentType = 'text/css';
      }
      const awsData = {
        Bucket: 'isearchstore',
        Key: jsonData.name+'/'+fileName,
        Body: fileData,
        ContentType: contentType
      };

      s3Bucket.upload(awsData, (err, s3data) => {
        if (err) {
          console.log('Error uploading data: ', s3data, err);
        } else {
          console.log('************Looking for urlssss!!!', s3data)
          if (fileExt === 'png') {
            jsonData.iconLink = s3data.Location;
          }
          if (fileExt === 'js') {
            jsonData.jsLink = s3data.Location;
          }
          if (fileExt === 'css') {
            jsonData.cssLink = s3data.Location;
          }
          if (fileExt === 'html') {
            jsonData.htmlLink = s3data.Location;
          }

          console.log('succesfully uploaded '+fileName);
          uploadFiles(fs, s3Bucket, tmpDir, extractedFolder, jsonData, files, fileIndex+1, callback);
        }
      });
    });
  }
}

var removeFiles = function(fs, tmpDir, extractedFolder, zipFile, files, fileIndex, callback) {
  if (fileIndex === files.length) {
    fs.rmdir(tmpDir+extractedFolder, function() {
      fs.unlink(tmpDir+zipFile, function() {
        fs.rmdir(tmpDir, function() {
          callback();
        })
      })
    })
    return;
  }
  console.log(fs);
  console.log(fs.unlink);
  fs.unlink(tmpDir+extractedFolder+files[fileIndex], function() {
    removeFiles(fs, tmpDir, extractedFolder, zipFile, files, fileIndex+1, callback)
  })
}

exports.create = create;
exports.findAll = findAll;
exports.findOne = findOne;
exports.uploadFiles = uploadFiles;
exports.removeFiles = removeFiles;


