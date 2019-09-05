module.exports = fx => (req, res, next) => 
Promise.resolve(fx(req, res, next)).catch(next);