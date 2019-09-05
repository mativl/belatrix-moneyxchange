const express = require('express');
const checkAuth = require("../middlewares/check-auth");
const UserController = require("../controllers/userController");

const router = express.Router();

// GET

/**
 * offset = Numero a partir del cual deseo obtener los siguientes registros.
 * limit = Limite de usuarios que deseo obtener (Default 50).
 * fields = Campos que deseo obtener.
 */
router.get(
  "/",
  checkAuth,
  UserController.user_get_all
);

router.get(
  "/:userId",
  checkAuth,
  UserController.user_get_by_id
);

// POST

router.post(
  "/signup",
  UserController.user_signup
);

// TODO: check headers errors
router.post(
  "/login",
  UserController.user_login
);

// PUT

/**
 * Unicamente tengo permitido actualizar email y password
 */
router.put(
  "/:userId",
  checkAuth,
  UserController.user_update_by_id
);

// DELETE (Soft)

router.delete(
  "/:userId",
  checkAuth,
  UserController.user_soft_delete
);

module.exports = router;