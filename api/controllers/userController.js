const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userService } = require("../services");
const catchException = require("../middlewares/catchExceptions");

// GET

/**
 * offset = Numero a partir del cual deseo obtener los siguientes registros.
 * limit = Limite de usuarios que deseo obtener (Default 50).
 * fields = Campos que deseo obtener.
 */
exports.user_get_all = catchException(async (req, res) => {
  let { offset, limit, fields } = req.query;
  offset = parseInt(offset);
  limit = parseInt(limit);
  limit =  Math.min(limit,50);
  fields = fields ? fields.split(",") : undefined;
  const users = await userService.listUsers(offset, limit, fields);
  res.json(users);
});

exports.user_get_by_id = catchException(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.getUser(userId);
  if (user) {
    res.json(user);
  } else{
    res.status(404).json({ message: 'No se encontro un usuario con ese ID' });
  }
});

// POST

exports.user_signup = catchException(async (req, res) => {
  const { email, password } = req.body;
  // Chequeo si el usuario existe antes de continuar
  const userExist = await userService.checkIfUserExist(email);
  // Si no existe === []
  if (userExist.length > 0) {
    return res.status(409).json({ message: 'Email en uso' });
  }

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    } else {
      const user = await userService.createUser(email, hash);
      res.json({
        message: "Usuario creado exitosamente",
        userCreated: user
      });
    }
  });
});

exports.user_login = catchException(async (req, res) => {
  const { email, password } = req.body;
  // Chequeo si el usuario existe antes de continuar
  const user = await userService.checkIfUserExist(email);
  // Si no existe === []
  if (user.length === 0) {
    res.status(401).json({ message: 'Autenticacion fallida' });
  }

  // Verifico su contraseña
  bcrypt.compare(password, user[0].password, (err, result) => {
    if (err) {
      return res.status(401).json({ message: 'Autenticacion fallida' });
    } 
    if (result) {
      const token = jwt.sign(
        {
          email: user[0].email,
          userId: user[0]._id
        }, 
        process.env.JWT_KEY,
        { expiresIn: "1h"},
      );
      return res.status(200).json({
        message: "Autenticacion exitosa",
        token: token
      });
    }
    res.status(401).json({ message: 'Autenticacion fallida' });
  });
});

// PUT

/**
 * Unicamente tengo permitido actualizar email y password
 */
exports.user_update_by_id = catchException(async (req, res) => {
  const { userId } = req.params;
  const { email, password } = req.body;
  const user = await userService.updateUser(userId,email,password);
  res.json(user);
});

// DELETE (Soft)

exports.user_soft_delete = catchException(async (req, res) => {
  const { userId } = req.params;
  const user = await userService.deleteUser(userId);
  res.json(user);
});