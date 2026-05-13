import express from 'express';
import sequelize from './config/db.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true })     //after development remove this alter: true, 
.then(()=> {
    console.log('Database Connected!');
    app.listen(PORT, () => console.log(`Server running on port ${PORT} (PostgreSQL mode)`));
})
.catch(err => console.log('Error: ' +err));














// import express from 'express';
// import sequelize from './config/db.js';
// import userRoutes from './routes/userRoutes.js';

// const app = express();
// app.use(express.json());

// app.use('/api', userRoutes);

// const PORT = process.env.PORT || 5000;

// sequelize.sync()
// .then(()=> {
//     console.log('Database Connected!');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT} (PostgreSQL mode)`));
// })
// .catch(err => console.log('Error: ' +err));









