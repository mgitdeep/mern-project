
const express = require('express')
const router = express.Router()
const userController = require('../controllers/adController') 

// multer requirements
const multer = require('multer')
const path = require('path')

require('../db/conn')

const Ads = require('../model/adsSchema')


// setting up the multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, './AdImages')
  },
  filename: (req, file, cb) => {
      console.log(file)
      cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })


// Posting a product ad
router.post("/ad", upload.single('image'), userController.createAd)
router.get("/ads", userController.getAds)

// router.post("/ad", upload.single('adImage'), async(req, res) => {

//     console.log('Inside posting an Ad section')

//     // next() - you're using this NEXT() function in a wrong way - we've to use this function while defining the MIDDLEWARE, not while using the MIDDLEWARE!!

//     const {name, category, price, isFree, condition, image, location, description, advertiser_info, contact_info} = req.body
//     // const {filename} = req.file

//     if (!name || !category || !price || !condition || !image || !location || !description || !advertiser_info || !contact_info) {
//     // if (!name || !category || !image ) {
//         return res.status(422).json({ error: "Please fill up the rest!"})
//     } else {
//         const ad = new Ads({name, category, price, isFree, condition, image: filename, location, description, advertiser_info, contact_info})

//         await ad.save()

//         console.log("Ad Posted Successfully :)")
//         res.status(201).json({message: "Ad Posted Successfully :)"})
//     }


// })


// Getting the data from database
// router.get('/ads', async (req, res) => {
//     try {
//       const ads = await Ads.find();
//       res.json(ads);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });



module.exports = router