
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//1.) Register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // Password ko hash karna (Security ke liye)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ 
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({ message: "User created!", user: { name, email } });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// 2.) Login
export const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({ where: { email }});
        if (!user) return res.status(404).json({ message: "User nahi mila!" });

        // Password check karna
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Galat password!" });

        // JWT Token banana (Secret key ko .env mein rakhein)
        const token = jwt.sign({ id: user.id }, 'secret_key_123', { expiresIn: '1h' });

        res.status(200).json({ message: "Login Success!", token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. Profile API (Protected)
export const getProfile = async (req, res) => {
    try {
        // req.user humein middleware se milega (jo hum niche banayenge)
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] } // Password nahi dikhana
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

























// import User from '../models/userModel.js';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// //1.) Register
// export const registerUser = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         // Password ko hash karna (Security ke liye)
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newUser = await User.create({ 
//             name,
//             email,
//             password: hashedPassword
//         });
//         res.status(201).json({ message: "User created!", user: { name, email } });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };

// // 2.) Login
// export const loginUser = async(req, res) => {
//     try {
//         const {email, password} = req.body;

//         const user = await User.findOne({ where: { email }});
//         if (!user) return res.status(404).json({ message: "User nahi mila!" });

//         // Password check karna
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(400).json({ message: "Galat password!" });

//         // JWT Token banana (Secret key ko .env mein rakhein)
//         const token = jwt.sign({ id: user.id }, 'secret_key_123', { expiresIn: '1h' });

//         res.status(200).json({ message: "Login Success!", token });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// // 3. Profile API (Protected)
// export const getProfile = async (req, res) => {
//     try {
//         // req.user humein middleware se milega (jo hum niche banayenge)
//         const user = await User.findByPk(req.user.id, {
//             attributes: { exclude: ['password'] } // Password nahi dikhana
//         });
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



