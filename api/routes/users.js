const express = require('express');
const router = express.Router();

// GET

router.get('/',(req, res, next) => {
  res.status(200).json({
    message: 'GET de /api/v1/users'
  });
});

router.get('/:userId',(req, res, next) => {
  const { userId } = req.params;
  res.status(200).json({
    message: `GET de /api/v1/users con ID ${userId}`
  });
});

// POST

router.post('/',(req, res, next) => {
  res.status(201).json({
    message: 'POST de /api/v1/users'
  });
});

module.exports = router;
// const { userService } = require("./services");
// const catchException = require("./middlewares/catchException");
// const ErrorWithStatusCode = require("./errors/ErrorWithStatusCode");

// /**
//  * offset = Numero a partir del cual deseo obtener los siguientes registros.
//  * limit = Limite de usuarios que deseo obtener (Default 50).
//  * fields = Campos que deseo obtener.
//  */
// router.get(
//   "/",
//   catchException(async (req, res) => {
//     let { offset, limit, fields } = req.query;
//     offset = parseInt(offset);
//     limit = parseInt(limit);
//     limit =  Math.min(limit,50);
//     fields = fields ? fields.split(",") : undefined;
//     const users = await userService.listUsers(offset, limit, fields);
//     res.json(users);
//   })
// );

// router.post(
//   "/",
//   catchException(async (req, res) => {
//     const { firstName, lastName } = req.body;
//     const user = await userService.createUser(firstName,lastName);
//     res.json(user);
//   })
// );

// /**
//  * Unicamente tengo permitido actualizar firstName y lastName
//  */
// router.put(
//   "/:userId",
//   catchException(async (req, res) => {
//     const { userId } = req.params;
//     const { firstName, lastName } = req.body;
//     const user = await userService.updateUser(userId,firstName,lastName);
//     res.json(user);
//   })
// );

// router.delete(
//   "/:userId",
//   catchException(async (req, res) => {
//     const { userId } = req.params;
//     const user = await userService.deleteUser(userId);
//     res.json(user);
//   })
// );

// router.use((error, req, res, next) => {
//   console.log(error);
//   res.status(error.statusCode || 500).json({ message: error.messaje });
// });

// module.exports = app;