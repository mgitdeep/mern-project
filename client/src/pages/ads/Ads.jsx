// Child component 

import { useEffect, useState } from 'react';
import style from './Ads.module.scss'
import Card from '../../components/card/Card'

// Importing the Context
// import { adImage } from '../ad/Ad';

// firebase
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/storage'

// const storageRef = firebase.storage().ref();
// const imageRef = storageRef.child("image/txtt.png")

// imageRef.getDownloadURL().then((url) => {
//   // use the URL to display the image in your React component
// })

const Ads = () => {

  const [ads, setAds] = useState([]);

  // Retrieving Image data from Firebase Storage
  // const ImageComponent = () => {
  //   const [imageUrl, setImageUrl] = useState("");
  
  //   useEffect(() => {
  //     const storageRef = firebase.storage().ref();
  //     const imageRef = storageRef.child("image/");
  
  //     imageRef.getDownloadURL().then((url) => {
  //       setImageUrl(url);
  //     });
  //   }, []);
  
  // };

  // Retrieving Ad post data from Atlas
  useEffect(() => {
    const fetchData = async() => {
      try {
        const res = await fetch('/ads');
        const ads = await res.json();
        setAds(ads);
      } catch (err) {
        console.log(err)
      }
    }
    fetchData();
  }, []);



  return (
    <div className={style.section}>
      <div className={style.item}>

        {/* <img src={props.image} alt="Ad" /> */}
      
      {ads.map((ad, i) => (
        // {imageRef.map((imG, j))}
        // Used 99% of brain here!
        <Card key={i}>
          <div className={style.adContent}>

            {/* Defining the Consumer here */}

            {/* <adImage.Consumer>{(url) => {
              console.log(url)
              return <img src={url} alt="Ad" />
            }}</adImage.Consumer> */}

            {/* <img src={imageUrl} alt="image" /> */}
            <div key={ad._id + 1}> {ad.name} </div>
            <div key={ad._id + 2}>{ad.category}</div>
            <div key={ad._id + 3}>{ad.price}</div>
            <div key={ad._id + 4}>{ad.condition}</div>
            <div key={ad._id + 5}>{ad.location}</div>
            <div key={ad._id + 6}>{ad.description}</div>
            <div key={ad._id + 7}>{ad.advertiser_info}</div>
            <div key={ad._id + 8}>{ad.contact_info}</div>
            {/* {console.log(ad._id)} */}

          </div>
        </Card>
      ))}
      
      </div>
    </div>
  )
}

export default Ads