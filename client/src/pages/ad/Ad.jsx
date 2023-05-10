// Parent component

import styles from './Ad.module.scss'
// import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'

// Importing the child component to send the image
// import Ads from '../ads/Ads';

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase imports
// import { storage } from './firebase';
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

// Creating the context to send the Image!
// const adImage = createContext()

const Ad = () => {

  const [ad, setAd] = useState({
    name: "",
    category: "", 
    price: "",
    isFree: '', 
    condition: "", 
    // urll: "", 
    image: "",
    location: "", 
    description: "", 
    advertiser_info: "", 
    contact_info: ""
  })

  const [isFree, setIsFree] = useState(false)
  const [adImage, setAdImage] = useState(null)
  // const [urll, setUrll] = useState(null)

  // Uploading image to Firebase
  // const [imagE, setImagE] = useState(null)
  // const [imageUrl, setImageUrl] = useState(null)


  // as we're now going to use Multer, so commenting out this firebase storage code
  // const upload = () => {
  //   if (imagE == null) {
  //     return
  //   } else {
  //     // const imageRef = storage.ref(`/image/${imagE.name}`).put(imagE).on("State changed", alert("Success"), alert)

  //     const imageRef = ref(storage, `image/${imagE.name}`)

  //     uploadBytes(imageRef, imagE).then(() => {
  //       getDownloadURL(imageRef).then((url) => {
  //         console.log(url)
  //         setImageUrl(url)

  //         //from here we're sending the image url to DB
  //         setUrll(imageUrl)
          
  //       }).catch((err) => {
  //         console.log(err)
  //       })
  //       // setImagE(e.target.files[0])
  //     }).catch((err) => {
  //       console.log(err)
  //     })
      
  //     // imageRef()
  //   }
  //   // setImagE(e.target.files[0])
  // }

  const navigateToMyProfile = useNavigate()

  let name, value
  const handleInputs = (e) => {
    // console.log(e)
    name = e.target.name
    value = e.target.value
    
    // setAd({...ad, urll: imageUrl})
    setAd({...ad, [name] : value})
  }

  const handleAdPost = async (f) => {
    f.preventDefault()

    const {name, category, price, condition, image, location, description, advertiser_info, contact_info} = ad

    // if (!name || !category || !price || !condition || !image || !location || !description || !advertiser_info || !contact_info) {
      if (name && category && price && condition && image && location && description && advertiser_info && contact_info) {
      toast.error("Please enter all details!")
    } else {

      const resPonse = await fetch("/ad", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, category, price, isFree, condition, image, location, description, advertiser_info, contact_info
      })
      })

      const data = await resPonse.json()
  
      if (data.status === 422 || !data) {
        window.alert("Ad not posted!")
        console.log("Ad not posted!")
      } else {
        window.alert("Ad posted successfully!")
        console.log("Ad posted successfully!")

        // upload()
  
        navigateToMyProfile("/myprofile")
      }
    }
    
  }
  // console.log(imageUrl)
  // console.log(imagE)

  return (
    <div className={styles.mainAuth}>
    <ToastContainer />
      {/* { loader && <Loader />} */}
      <section className={` ${styles.auth}`}>
        
        <Card>
          <div className={styles.form}>
            {/* <img src={imageUrl} alt="ad" /> */}
            <h2>Product Ad</h2>
            <form method="POST" encType="multipart/form-data">
              
              {/* <p>
              <label>Product_Name</label> */}
              <input type="text" name='name' placeholder='Product Name' required
              value={ad.name}
              onChange={handleInputs} 
              autoComplete='off'/>
              {/* </p> */}
              {/* </div> */}

              <input type="text" name='category' placeholder='Category' required 
              value={ad.category}
              onChange={handleInputs}  
              autoComplete='off'/>

              <div className={styles.priceNfree}>
              <label>
              <input type="number" name='price' placeholder='Price' required 
              value={ad.price}
              onChange={handleInputs}  
              autoComplete='off'/>
              </label>

              <label>
              <input type="checkbox" checked={isFree} name='isFree' placeholder='' required 
              onChange={(e) => setIsFree(e.target.checked)}  
              autoComplete='off'/>
              SHARE
              </label>
              </div>

              {/* <p name="urll" value={ad.urll}>{imageUrl}</p> */}

              <input type="text" name='condition' placeholder='Condition' required
              value={ad.condition}
              onChange={handleInputs} 
              autoComplete='off'/>

              <p>
              <label htmlFor="img">Select image:</label>
              <input type="file" id="img" name="adImage"
              onChange={(e) => setAdImage(e.target.files[0])}
              />
              
              {/* <button onClick={upload}>Upload</button> */}
              {/* <input type="submit" /> */}
              {/* <label htmlFor="ad" name="urll" value={ad.urll} onChange={setUrll(imageUrl)}></label> */}
              </p>

              {/* <label htmlFor="ad" name="urll" value={imageUrl} ></label> */}

              <input type="text" name='location' placeholder='Location' required
              value={ad.location}
              onChange={handleInputs} 
              autoComplete='off'/>

              <input type="text" name='description' placeholder='Description' required
              value={ad.description}
              onChange={handleInputs} 
              autoComplete='off'/>

              <input type="text" name='advertiser_info' placeholder='Advertiser Info' required
              value={ad.advertiser_info}
              onChange={handleInputs} 
              autoComplete='off'/>

              <input type="text" name='contact_info' placeholder='Contact Info' required
              value={ad.contact_info}
              onChange={handleInputs}  
              autoComplete='off'/>

              <button className='--btn --btn-primary --btn-block' onClick={handleAdPost}>Post Ad</button>

            </form>
            {/* <span className={styles.register}>
              <p>Already Registered?</p>
              <Link to="/login">Login</Link>
            </span> */}
          </div>
        </Card>

        {/* <div className={styles.img}>
          <img src={registerImg} alt="login" width="400"/>
        </div> */}
        
      </section>

        {/* Passing the image to the Ads.jsx child component */}
        {/* <Ads image={url}/>     */}

        {/* Trying to pass the image to Ads.jsx through Context API now */}

      {/* <adImage.Provider value={imageUrl}></adImage.Provider> */}

    
    </div>
  )
}

export default Ad

// Export the Context here
// export { adImage }