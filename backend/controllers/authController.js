const User = require('../models/UserSchema');
const Doctor = require('../models/DoctorSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
        expiresIn: '10d'
    });
}

const register = async (req, res) => {
    const { email, password, name, role, photo, gender } = req.body;
    try {
        let user = null;
        if (role === 'patient') {
            user = await User.findOne({ email });
        }
        else if (role === 'patient') {
            user = await Doctor.findOne({ email });
        }
        if (user) {
            return res.status(400).json({ message: 'User already exist' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'patient') {
            user = new User({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }
        if (role === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashPassword,
                photo,
                gender,
                role
            });
        }
        await user.save();
        res.status(200).json({ success: true, message: "User successfully created" });
    } catch (error) {
        res.status(500).json({ success: false, message: error, });
    }
}

const login = async (req, res) => {
    const { email } = req.body;
    try {
        let user = null;
        const patient = await User.findOne({ email });
        const doctor = await Doctor.findOne({ email });
        if (patient) {
            user = patient;
        }
        if (doctor) {
            user = doctor;
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Incorrect password" });
        }

        // get token
        const token = generateToken(user);

        const { password, role, appointments, ...rest } = user._doc;
        return res.status(200).json({ success: true, message: "Successfully login", token, data: { ...rest }, role });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Failed to login" });
    }
}

module.exports = { register, login };