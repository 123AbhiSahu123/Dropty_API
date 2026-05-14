import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

// "username" table create only
const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
    },
    password: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
    tableName: 'username',
    timestamps: true
});

// "postsname" table create only
const Post = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, {
    tableName: 'postsname',
    timestamps: true
});

// "comment" table create only
const Comment = sequelize.define('Comment', {
    commentText : {
        type: DataTypes.TEXT,
        allowNull: false
    },
    postId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
}, {
    tableName: 'comment',
    timestamps: true
});

// RELATIONS 1 User -> many Posts
User.hasMany(Post, {
    foreignKey: 'userId'
});

// Har post ek user ka hoga
Post.belongsTo(User, {
    foreignKey: 'userId'
});

export { User, Post, Comment };












