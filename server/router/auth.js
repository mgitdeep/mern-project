
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
// const jwt = require('jsonwebtoken')
// const authenticate = require('../middleware/authenticate')

// // multer requirements
// const multer = require('multer')
// const path = require('path')

// Require to send the cookie from front end to backend
const cookieParser = require("cookie-parser")
router.use(cookieParser())

// // setting up the multer middleware
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './AdImages')
//     },
//     filename: (req, file, cb) => {
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({ storage: storage })


require('../db/conn')
const Users = require('../model/userSchema')

router.get("/", (req, res) => {
    res.send("Hello.. I'm a bot from server - auth.js");
})


//Registration

router.post("/register", async(req, res) => {

    const {email, password, cpassword} = req.body

    if (!email || !password || !cpassword) {
        return res.status(422).json({ message: "Please fill up the rest!"})
    }

    try {
        const userExists = await Users.findOne({ email: email })

        if (userExists) {
            console.log("Email already exist :(")
            return res.status(422).json({ message: "Email already exist :("})
        } else if (password != cpassword) {
            console.log("Passwords are not matching :(")
            return res.status(422).json({ message: "Passwords are not matching :("})
        } else {
            const user = new Users({email, password, cpassword})

            const userRegister = await user.save()
        
            console.log("User registered successfully :)")
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

        const userLogin = await Users.findOne({ email: email})

        const token = await userLogin.generateAuthToken()
        console.log(token)

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true
        })
        
        if (userLogin) {
            const checkPass = await bcrypt.compare(password, userLogin.password)
            if (checkPass) {
                res.status(201).json({message: "User logged in successfully!"})
            } else {
                res.status(422).json({message: "Invalid credentials!"})
            }
        } else {
            res.status(422).json({message: "Invalid credentials!"})
        }

        // const userLogin1 = await Users.findOne({ email: email})
        // // const userLogin2 = await Users.findOne({password: password})
        // const userLogin2 = await bcrypt.compare(password, userLogin1.password)

        // if ( userLogin1 && userLogin2) {
        //     res.status(201).json({message: "User logged in successfully!"})
        //     console.log(userLogin1)
            
        // } else {
        //     res.status(422).json({message: "Invalid credentials!"})
        // }
        

    } catch(err) {
        console.log(err)
    }
    

})


// My Profile page:
// Here we're using the Middleware concept
// router.get("/myprofile", authenticate, (req, res, next) => {
//     console.log('Inside the About section')                 
//     // next() - you're using this NEXT() function in a wrong way - we've to use this function while defining the MIDDLEWARE, not while using the MIDDLEWARE!!
//     // res.send("Hello.. I'm a bot from About server");
//     res.send(req.rootUser);
// });

router.get("/myprofile", (req, res) => {
    console.log('Inside the About section')                 
    // res.send("Hello.. I'm a bot from About server");
    // res.send(req.rootUser);
});


// router.post("/ad", upload.single('adImage'), (req, res, next) => {
//     console.log('Inside posting an Ad section')

//     next()
// })

module.exports = router
