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
        console.log("sdsad",user)
        //Hash create salt;
        

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: txtpassword
        });
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password, salt, (err, hash) =>{
                if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user=>{
                jwt.sign(
                    { id: user.id },
                    process.env.SECRET_KEY)
                
            })
            })
        })
        let x = await newUser.save();
        console.log('x1',x)
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