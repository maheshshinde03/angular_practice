const express = require('express');
const router = express.Router();
const tasksService = require('../services/tasks');
const {jwtAuthMiddleware, generateToken} = require('../middleware/jwt_authenticate');


router.get('/getAllTask/:userId',jwtAuthMiddleware, async function (req, res, next) {
  try {
   console.log('entro a getUsers');
    let getAll= await tasksService.getAllTask(req.params);
    console.log(getAll);
    res.send(getAll);
  }
  catch (error) {
   // console.log('into error');
    res.status(500).json({ error: error.message })
  }
});

router.get('/getTaskByTd/:task_id',jwtAuthMiddleware, async function (req, res, next) {
  try {
   // console.log('entro a getUsers',req.params);
    let gettask = await tasksService.getTaskByTd(req.params);
    res.send(gettask);
  }
  catch (error) {
    //console.log('into error');
    res.status(500).json({ error: error.message })
  }
});


router.post('/addTask', jwtAuthMiddleware, async function (req, res, next) {
    try {
     // console.log(req.body);
      let posttask = await tasksService.addTask(req.body);
      if (posttask.status == 'OK') {
        res.status(200).json({ status: 'success' });
      }
      else {
        res.status(200).json({ status: 'error' });
      }
    } catch (err) {
      res.status(500).json({ status: 'fail' });
  
    }
  });

  
  router.put('/updateTask', jwtAuthMiddleware, async function (req, res, next) {
    try {
      //console.log(req.body);
      let edittask = await tasksService.updateTask(req.body);
      if (edittask.status == 'OK') {
        res.status(200).json({ status: 'success' });
      }
      else {
        res.status(200).json({ status: 'error' });
      }
    } catch (err) {
      res.status(500).json({ status: 'fail' });
  
    }
  });

  
  router.delete('/deleteTask/:id', jwtAuthMiddleware, async function (req, res, next) {
    try {
      //console.log(req.params);
      let remove = await tasksService.deleteTask(req.params);
      if (remove.status == 'OK') {
        res.status(200).json({ status: 'success' });
      }
      else {
        res.status(200).json({ status: 'error' });
      }
    } catch (err) {
      res.status(500).json({ status: 'fail' });
  
    }
  });


module.exports = router;