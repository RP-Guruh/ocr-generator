const express = require('express');
const multer = require('multer');
const app = express();
const fs = require('fs');

var Tesseract = require('tesseract.js');

app.use('/static', express.static('./static'));
app.set('view engine', 'pug');
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const PORT = process.env.PORT | 3000;

var Storage = multer.diskStorage({
     destination: (req, file, callback) => {
         callback(null, "./images");
     },
     filename: (req, file, callback) => {
         callback(null, file.originalname);
     }
});

var upload = multer({
  storage: Storage
}).array('image', 3);

app.get('/home', (req, res) => { 
 Tesseract.recognize(image,'eng', { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
       var x = text;
       res.render('home', { result_ocr: text });
       console.log(x);
    });
});

var image = fs.readFileSync(__dirname + '/images/sample.png', {
  encoding: null
});

app.listen(PORT, () => {
  console.log('Server Running ... ');
});