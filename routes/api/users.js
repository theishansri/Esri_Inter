const router = require('express').Router();
const User = require('../../Models/User-Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
router.post('/', async (req, res) => {
    const { email, firstName, lastName, password } = req.body
    if (!email || !firstName || !lastName || !password) {
        return res.status(400).json({ msg: "Please enter all fields" })
    }
    try {
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ msg: "User already exists" })
        }
        //Hash create salt;
        const salt = await bcrypt.genSalt(10);
        const txtpassword = await (bcrypt.hash(password, salt))

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: txtpassword
        });
        let x = await newUser.save();
        jwt.sign({
            id: x.id
        },
            process.env.SECRET_KEY,
            { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({
                    token, user: {
                        user: x.id,
                        name: x.firstName + ' ' + x.lastName,
                        email: x.email,
                        registration_date: x.registered_date
                    }
                })
            }
        )



    } catch (error) {
        res.status(400).json({ msg: "Server Error" });
    }
})
module.exports = router;