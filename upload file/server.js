const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up the storage configuration for multer
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    // Generate a unique filename using the current timestamp and original file extension
    const uniqueSuffix =  path.extname(file.originalname);
    console.log(uniqueSuffix);
    console.log(file.filename);
    cb(null, file.filename+ '-' +Date.now()+ uniqueSuffix);
  }
});

// Create a multer instance with the storage configuration
const upload = multer({ storage: storage });

// Set up the endpoint to handle file upload
app.post('/upload', upload.single('fileToUpload'), (req, res) => {
  if (req.file) {
    // File uploaded and renamed successfully
    res.json({ status: 'success', filename: req.file.filename });
  } else {
    // Error uploading the file or renaming
    res.status(400).json({ status: 'error', message: 'Failed to upload the file.' });
  }
});

// Serve the static HTML file
app.use(express.static(__dirname));

// Start the server
app.listen(3000, 'localhost', () => {
  console.log('Server is running on http://localhost:3000');
});
