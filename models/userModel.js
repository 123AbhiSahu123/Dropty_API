import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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

// RELATIONS 1 User -> many Posts
User.hasMany(Post, {
    foreignKey: 'userId'
});

// Har post ek user ka hoga
Post.belongsTo(User, {
    foreignKey: 'userId'
});


export { User, Post };




// import { DataTypes } from 'sequelize';
// import sequelize from '../config/db.js';

// const User = sequelize.define('User', {
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//         validate: { isEmail: true }
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull:false
//     }
// }, {
//     tableName: 'username',
//     timestamps: true
// });

// const Post = sequelize.define('Post', {
//     title: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     content: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     userId:{
//         type:DataTypes.INTEGER,
//         allowNull:false
//     }
// }, {
//     tableName: 'postsname',
//     timestamps: true
// });

// // RELATIONS 1 User -> many Posts
// User.hasMany(Post, {
//     foreignKey: 'userId'
// });

// // Har post ek user ka hoga
// Post.belongsTo(User, {
//     foreignKey: 'userId'
// });


// export { User, Post };


