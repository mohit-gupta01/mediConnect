const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor');
const reviewRoutes = require('./routes/review');
const bookingRoutes = require('./routes/booking');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

const corsOptions = {
    origin: true
}

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/bookings', bookingRoutes);


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb database is connected");
    } catch (error) {
        console.log(error);
    }
}

app.get('/', (req, res) => {
    res.send("Hello");
});


app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
    connectDB();
});