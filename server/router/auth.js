
const express = require('express')
const router = express.Router()

require('../db/conn')
const Users = require('../model/userSchema')

router.get("/", (req, res) => {
    res.send("Hello.. I'm a bot from server - auth.js");
})


//Registration

router.post('/register', async(req, res) => {

    const {name, email, phone, work, password, cpassword} = req.body

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill up the rest!"})
    }

    try {
        const userExists = await Users.findOne({ email: email })
        
        if (userExists) {
            return res.status(422).json({ error: "Email already exist :("})
        } else if (password != cpassword) {
            return res.status(422).json({ error: "Passwords are not matching :("})
        } else {
            const user = new Users({name, email, phone, work, password, cpassword})

            const userRegister = await user.save()
        
            res.status(201).json({message: "User registered successfully :)"})
        }
        
        
        // if (userRegister) {
        //     res.status(201).json({message: "User registered successfully!"})
        // } else {
        //     res.status(500).json({error: "Failed to register!"})
        // }
 

    } catch(err) {
        console.log(err)
    }
    
})


// Login 

// router.post('/signin', (req, res) => {               // The basic code to check whether user able to post it or not
//     console.log(req.body)
//     res.json({message: "Superb login!"})
// })
router.post('/signin', async(req, res) => {
    
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({error: "Please fill required data"})
        }

        const userLogin1 = await Users.findOne({ email: email})
        const userLogin2 = await Users.findOne({password: password})
        

        if ( userLogin1 && userLogin2) {
            res.status(201).json({message: "User logged in successfully!"})
            console.log(userLogin1)
            
        } else {
            res.status(422).json({message: "Invalid credentials!"})
        }
        

    } catch(err) {
        console.log(err)
    }
    

})

module.exports = router
