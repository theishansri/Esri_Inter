const router = require('express').Router();
const User = require('../../Models/User-Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../Middleware/auth');
const dotenv = require('dotenv');
router.post('/', async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ msg: "User does not exists" })
        }
        //Compare password
        const isMatch = await (bcrypt.compare(password, user.password));
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        jwt.sign({
            id: user.id
        },
            process.env.SECRET_KEY,
            { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({
                    token, user: {
                        user: user.id,
                        name: user.firstName + ' ' + user.lastName,
                        email: user.email,
                        registration_date: user.registered_date
                    }
                })
            }
        )
    } catch (error) {
        res.status(400).json({ msg: "Server Error" });
    }
})
router.get('/user', auth, async (req, res) => {
    let user = await User.findById(req.user.id).select('-password');
    user = user.toJSON();
    user['name'] = user.firstName + ' ' + user.lastName
    res.json({
        ...user
    })
})
module.exports = router;