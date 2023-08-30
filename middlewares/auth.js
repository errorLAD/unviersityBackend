const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => { 
    const token = req.header.authorization?.split('')[1];
    if (!token) return res.status(401).json({ message: 'Token missing' });
    
    jwt.verify(token, 'secret_key' , (err, decored) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.userId = decoded.universityId;
        next();
    });
};