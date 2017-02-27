const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: AWSaccessKey,
  secretAccessKey: AWSsecretKey
});
const s3Bucket = new AWS.S3( { params: {Bucket: 'isearchstore'} } );
var uploadCount = 0;

/** AWS UPLOAD **/
app.post('/upload', (req, res) => {

  if(req.body.fileName.split('.')[1] !== 'zip') {
    res.send('Error, not a zip file!');
    return;
  }

  const fileBuffer = utils.decodeBase64File(req.body.filePath);

  console.log(fileBuffer.data)
  console.log(req.body.fileName);

  uploadCount++;
  var tmpDir = './server/tmpApps/'+req.body.fileName.split('.')[0]+uploadCount+'/';
  
  //Create temporary directory
  fs.mkdir(tmpDir, function(err) {
    console.log('Created temporary directory!')
    // Write out zip file into temporary path
    fs.writeFile(tmpDir+req.body.fileName, fileBuffer.data, (err) => {
      if (err) {
        console.log('Error in writing zip file:' , err)
      }
      console.log('Completed writting zip file to temporary directory!');

      // Extract zip file inside temporary directory
      extract(tmpDir+req.body.fileName, {dir: tmpDir}, function (err) {
        if (err) {
          console.log('Error in zip file extraction:', err)
        }
        console.log('Extracted zip file!');

        var extractedFolder = req.body.fileName.split('.')[0]+'/';

        // Read file names inside tmpDir/extractedFolder
        fs.readdir(tmpDir+extractedFolder, function(err, files) {
          console.log('Read temporary directory and obtained all file names!');

          // var jsFile, htmlFile, cssFile, pngFile, manifestJSON, htmlIndex;
          var manifestJSON = 'manifest.json'
          // files.forEach(function(file, index) {
          //   // if (file.split('.')[1] === 'js') {
          //   //   jsFile = file;
          //   // } else if (file.split('.')[1] === 'html') {
          //   //   htmlFile = file;
          //   //   htmlIndex = index
          //   // } else if (file.split('.')[1] === 'css') {
          //   //   cssFile = file;
          //   // } else if (file.split('.')[1] === 'png') {
          //   //   pngFile = file;
          //   // } else 
          //   if (file.split('.')[1] === 'json') {
          //     manifestJSON = file;
          //   }
          // });

          // Html file is moved to the end of the array
          // files.push(files.splice(htmlIndex, 1)[0]);

          if (files.indexOf('manifest.json') < 0) {
            res.send('Error, no manifest.json file');
            return;
          }

          // Read manifest.json file
          fs.readFile(tmpDir+extractedFolder+manifestJSON, 'utf8', function(err, fileData) {
            if (err) throw err;

            // Parse the json data into a variable
            var jsonData = JSON.parse(fileData);
            console.log('Read and parsed Manifest file')

            //Get key words for commands from json data
            var triggerCommands = jsonData['trigger_words'];
            delete jsonData['trigger_words'];
            delete jsonData['sample_commands'];
            
            // Check if the app already exists
            appController.findOne({where: {name: jsonData.name}}, function (app) {
              if (app) {  // If the app exists then send back an error to the client
                res.send('App with that name already exists');
                return;
              } else {  //else if new app is being uploaded ->
                // Upload app files to AWS S3
                appController.uploadFiles(fs, s3Bucket, tmpDir, extractedFolder, jsonData, files, 0, function(updatedJSON) {
                  console.log('Uploaded all files to AWS!');
                  // Get current user
                  userController.findOne({where: {email: req.session.email}}, function(user) {
                    // Save Manifest file data to database
                    user.createApp(updatedJSON).then(function(app) {
                      console.log('Saved app data!');

                      // Save commands that activate app to database
                      commandController.addCommands(triggerCommands, app, function() {

                        // Remove all files and folders
                        appController.removeFiles(fs, tmpDir, extractedFolder, req.body.fileName, files, 0, function() {
                          console.log('Removed all files and sent response!')
                          //Decrement upload counter
                          uploadCount--;
                          // Send response
                          res.send('Uploaded all files and saved all data!');
                        })
                      })
                    })
                  })
                })                  
              }
            });
          });
        });
      });
    });
  });
});