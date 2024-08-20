const express = require('express');
const router = express.Router();
const usersServices = require('../services/users');
const { jwtAuthMiddleware, generateToken } = require('../middleware/jwt_authenticate');

var path = require('path');
const fs = require('fs');

const multer = require('multer');


router.post('/login', async function (req, res, next) {
  try {
    // console.log('entro a getUsers', req.body);
    let logindata = await usersServices.login(req.body);
    //console.log('User Data - ', logindata);

    if (logindata.message == 'password matched') {

      const payload = {
        id: logindata.id,
        email: logindata.email
      };

      const token = generateToken(payload);

      res.status(200).json({ response: logindata, token: token })
      
    } else if (logindata.message == 'password does not matched') {
      error = 'password does not matched';
      res.status(401).json({ error });
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
    // res.status(500).json({ status: 'fail' });

  }
});

router.get('/getAllUsers', jwtAuthMiddleware, async function (req, res, next) {
  try {
    //console.log('entro a getUsers');
    let getData = await usersServices.getAllUsers();
    res.send(getData);
  }
  catch (error) {
    //console.log('into error');
    res.status(500).json({ error: error.message })
  }
});

router.get('/getAllUsersForReact', async function (req, res, next) {
  try {
    //console.log('entro a getUsers');
    let getData = await usersServices.getAllUsers();
    res.send(getData);
  }
  catch (error) {
    //console.log('into error');
    res.status(500).json({ error: error.message })
  }
});

/* POST Users. */
// router.post('/', async function(req, res, next) {
//   try {
//     res.json(await usersServices.addUsers(req.query.page));
//   } catch (err) {
//     console.error(`Error while getting programming languages `, err.message);
//     next(err);
//   }
// });

router.post('/registration', async function (req, res, next) {
  try {
    let user = await usersServices.addUsers(req.body);
    if (user.status == 'OK') {
      res.status(200).json({ status: 'success' });
    }
    else {
      res.status(200).json({ status: 'error' });
    }
  } catch (err) {
    res.status(500).json({ status: 'fail' });

  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = `./upload/profile/${req.params.user_id}`;
    fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir); // Save file in the correct user folder
  },
  filename: (req, file, cb) => {
    cb(null, 'profile.jpg'); // Set filename
  }
});

const upload = multer({ storage: storage });


router.post('/uploadImage/:user_id', upload.single('upload'), (req, res) => {
  console.log(req.body);
  try {
    // Ensure the file is received
    if (!req.file) {
      return res.status(400).json({ status: 'No file uploaded' });
    }

    // File information can be accessed through req.file
    console.log('File uploaded to:', req.file.path);

    res.status(200).json({ status: 'success', path: req.file.path });
  } catch (error) {
    console.error('Error during file upload:', error);
    res.status(500).json({ status: 'upload error', error });
  }
});

router.get('/getProfileImage/:userId', (req, res) =>{
 // Get the user ID from the request parameters
 const userId = req.params.userId;

 // Find the profile image file path
 const profileImageFilePath = `./upload/profile/${userId}/profile.jpg`;

 // Read the profile image file
 const profileImage = fs.readFileSync(profileImageFilePath);

 // Send the profile image to the frontend
 res.send(profileImage);
});




module.exports = router;