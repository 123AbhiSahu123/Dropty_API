
import { User, Post, Comment } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// username table features

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
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "User nahi mila!" });

        // Password check karna
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Galat password!" });

        // JWT Token banana (Secret key ko .env mein rakhein)
        const token = jwt.sign({
            user: { id: user.id } // Object structure (aapka dusra syntax)
        },
            process.env.JWT_SECRET, // Secure Environment Variable
            {
                expiresIn: '1d' // Expiry (aapka pehla syntax)
            });

        res.status(200).cookie("token", token).json({ message: "Login Success!", token });
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

// postsname table features
// 4. Create Post API (Protected)
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const post = await Post.create({
            title,
            content,
            userId: req.user.id
        });
        res.status(201).json({ message: "Post created!", post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//delete post
export const deletePost = async(req, res) => {
    try{
        const {id} = req.params;
        const userId = req.user.id;

        const post =  await Post.findByPk(id);
        if(!post) {
            return res.status(404).json({message:"Post don't have!"});
        }
        if (post.userId !== userId) {
            return res.status(403).json({message: "Post sucessfully delete!"})
        }
        await post.destroy();
         res.status(200).json({message: "Post sucessfully delete!"})
    }
    catch (error) {
        res.status(500).json({error:error,message});
    }
}

// comment table features
export const commentPost = async (req, res) => {
    try {
        const {id} = req.params; // post id
        const userId= req.user.id;
        const {commentText} = req.body;

        const post = await Post.findByPk(id);

        if(!post){
            return res.status(404).json({
                message:"Post not found"
            });
        }
    
        const comment = await Comment.create({
            commentText,
            userId,
            postId: id
        });
        res.status(201).json({ 
            message: "Comment on post Sucessfull!", comment });  // data object
    } catch (error) {
        res.status(500).json({ 
            error: error.message 
        });
    }
}















