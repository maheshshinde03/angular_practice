const express = require('express');
const router = express.Router();
const adminService = require('../services/admin');
const {jwtAuthMiddleware, generateToken} = require('../middleware/jwt_authenticate');


router.get('/getUsers', async function (req, res, next) {
  try {
   // console.log('entro a getUsers');
    let getAll= await adminService.getAllUsers();
    res.send(getAll);
  }
  catch (error) {
   // console.log('into error');
    res.status(500).json({ error: error.message })
  }
});


module.exports = router;