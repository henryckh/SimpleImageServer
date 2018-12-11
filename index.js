const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const multer = require('multer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit:'1MB'}));
app.use(express.static('uploads'));

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.resolve(__dirname, 'uploads'));
    },
    filename: function (req, file, callback) {
        callback(null, `${file.fieldname}-${Date.now()}.jpg`);
    }
});
const upload = multer({storage: storage});

app.post('/test', function (req, res) {
    const pic = req.body.name;
});

app.post('/photo/upload', upload.single('image'), function (req, res, next) {
    res.send('saved');
    console.log('res save:');
});

app.listen(3000, function () {
    console.log("Working on port 3000");
});