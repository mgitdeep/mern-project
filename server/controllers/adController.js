const Ads = require('../model/adsSchema')

// FUNCTIONAL component

const createAd = async (req, res) => {
    const { name, category, price, isFree, condition, location, description, advertiser_info, contact_info } = req.body;
    const { filename } = req.file;
  
    try {
      if (name && category && price || isFree && condition && location && description && advertiser_info && contact_info && filename) {
        const newAd = new Ads({
          name,
          category,
          price,
          isFree,
          condition,
          image: filename,
          location,
          description,
          advertiser_info,
          contact_info
        });
  
        const saveAd = await newAd.save();
  
        if (saveAd) {
          return res.status(201).json({ message: 'Ad created successfully!' });
        } else {
          return res.status(400).json({ message: 'Something wrong!' });
        }
      } else {
        return res.status(400).json({ message: 'All fields are required!' });
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  };
  
  const getAds = async (req, res) => {
    try {
      const allAds = await Ads.find();
      if (allAds) {
        return res.status(200).json(allAds);
      } else {
        // Do something here
      }
    } catch (err) {
      return res.status(400).json(err);
    }
  };
  
  const adController = {
    createAd,
    getAds,
  };
  
module.exports = adController
  



// CLASS component

// class adController {
//     static createAd = async (req, res) => {
//         const {name, category} = req.body
//         const {filename} = req.file

//         try {
//             if (name && category && filename) {
//                 const newAd = new Ads({
//                     name, category, image: filename
//                 })

//                 const saveAd = await newAd.save()

//                 if (saveAd) {
//                     return res.status(201).json({"message" : "Ad created successfully!"})
//                 } 
//                 else {
//                     return res.status(400).json({"message" : "Something wrong!"})
//                 }
//             } else {
//                 return res.status(400).json({"message" : "All fields are required!"})
//             }
//     } catch (err) {
//         return res.status(400).json(err)
//     }
//     }

//     static  getAds = async (req, res) => {

//         try {
//             const allAds = await Ads.find()
//             if (allAds) {
//                 return res.status(200).json(allAds)
//             } else {

//             }
            
//         } catch (err) {
//             return res.status(400).json(err)
//         }
//     }

// }

// module.exports = adController