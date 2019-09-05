const express = require('express');
const { userService } = require("../services");
const catchException = require("../middlewares/catchExceptions");
const ErrorWithStatusCode = require("../errors/ErrorWithStatusCode");

const router = express.Router();

// GET

/**
 * offset = Numero a partir del cual deseo obtener los siguientes registros.
 * limit = Limite de usuarios que deseo obtener (Default 50).
 * fields = Campos que deseo obtener.
 */
router.get(
  "/",
  catchException(async (req, res) => {
    let { offset, limit, fields } = req.query;
    offset = parseInt(offset);
    limit = parseInt(limit);
    limit =  Math.min(limit,50);
    fields = fields ? fields.split(",") : undefined;
    const users = await userService.listUsers(offset, limit, fields);
    res.json(users);
  })
);

// // POST

router.post(
  "/",
  catchException(async (req, res) => {
    const { firstName, lastName } = req.body;
    const user = await userService.createUser(firstName, lastName);
    res.json({
      message: "Usuario creado exitosamente",
      userCreated: user
    });
  })
);

module.exports = router;