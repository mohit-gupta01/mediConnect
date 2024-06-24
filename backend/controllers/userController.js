const User = require('../models/UserSchema');
const Booking = require('../models/BookingSchema');
const Doctor = require('../models/DoctorSchema');

const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json({ success: true, message: "Successfully Updated", data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Updated" });
    }
}

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Successfully Deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to Delete" });
    }
}

const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        res.status(200).json({ success: true, message: "User found", data: user });
    } catch (error) {
        res.status(404).json({ success: false, message: "User not found" });
    }
}

const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, message: "Users found", data: users });
    } catch (error) {
        res.status(404).json({ success: false, message: "Users not found" });
    }
}

const getUserProfile = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const { password, ...rest } = user._doc;
        res.status(200).json({ success: true, message: "Getting profile info", data: { ...rest } });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get user" });
    }
}

const getMyAppoinments = async (req, res) => {
    try {
        // 1. Get appointments for booking for specific user
        const bookings = await Booking.find({ user: req.userId });

        // 2. Extract doctor ids from appointments bookings
        const doctorIds = bookings.map(el => el.doctor.id);

        // 3. get doctors using doctor ids and populate their details
        const doctor = await Doctor.find({ _id: { $in: doctorIds } }).select("-password");

        res.status(200).json({ success: true, message: "Appointments found", data: doctor });
    } catch (error) {
        res.status(500).json({ success: false, message: "Something went wrong, cannot get appointments" });
    }
}

module.exports = { updateUser, deleteUser, getSingleUser, getAllUser, getUserProfile, getMyAppoinments };