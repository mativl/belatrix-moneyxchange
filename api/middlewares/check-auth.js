const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Guardo la informacion decodificada para poder ser usada mas adelante
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Autenticacion fallida' });
  }
}