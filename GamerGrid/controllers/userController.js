const User = require('../models/userModel');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Ensure all required fields are provided
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        const newUser = await User.create({ username, email, password, role });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true, // Ensures validation rules are applied
        });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    try {

        console.log('Login request body:', req.body);

        
        const { email, password } = req.body;

        // Ensure email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare plain text passwords
        if (user.password !== password) {
            return res.status(400).json({ message: 'Password is not correct.' });
        }

        // If login is successful
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

