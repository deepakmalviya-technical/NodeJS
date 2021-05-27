const multer = require('multer');
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

// File Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname + '/../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + shortid.generate() + file.originalname);
    }
});
exports.upload = multer({ storage });

// File Remove
exports.removeFile = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error TO Remove File', err);
            return
        }
        console.log('File Removed');
    })
}
