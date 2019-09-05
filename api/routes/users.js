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

router.get(
  "/:userId",
  catchException(async (req, res) => {
    const { userId } = req.params;
    const user = await userService.getUser(userId);
    if (user) {
      res.json(user);
    } else{
      res.status(404).json({ message: 'No se encontro un usuario con ese ID' });
    }
  })
);

// POST

router.post(
  "/signup",
  catchException(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.createUser(email, password);
    res.json({
      message: "Usuario creado exitosamente",
      userCreated: user
    });
  })
);

// PUT

/**
 * Unicamente tengo permitido actualizar email y password
 */
router.put(
  "/:userId",
  catchException(async (req, res) => {
    const { userId } = req.params;
    const { email, password } = req.body;
    const user = await userService.updateUser(userId,email,password);
    res.json(user);
  })
);

// DELETE (Soft)

router.delete(
  "/:userId",
  catchException(async (req, res) => {
    const { userId } = req.params;
    const user = await userService.deleteUser(userId);
    res.json(user);
  })
);

module.exports = router;