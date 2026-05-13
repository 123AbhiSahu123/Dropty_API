import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: "Token zaruri hai!" });

    try {
        const decoded = jwt.verify(token.split(" ")[1], 'secret_key_123');
        req.user = decoded; // Token se user id nikal kar request mein daal di
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid Token!" });
    }
};









// import jwt from 'jsonwebtoken';

// export const verifyToken = (req, res, next) => {
//     const token = req.headers['authorization'];
//     if (!token) return res.status(403).json({ message: "Token zaruri hai!" });

//     try {
//         const decoded = jwt.verify(token.split(" ")[1], 'secret_key_123');
//         req.user = decoded; // Token se user id nikal kar request mein daal di
//         next();
//     } catch (err) {
//         res.status(401).json({ message: "Invalid Token!" });
//     }
// };