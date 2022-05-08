const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(process.env.DB_CONNECT, () => {
    console.log('database connected!');
});

app.use(cors());
app.use(express.json());
app.use('/api/user', authRoute);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`app running on port ${PORT}`));