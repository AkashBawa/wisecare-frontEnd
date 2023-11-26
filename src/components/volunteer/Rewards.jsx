import React, { useState, useEffect } from 'react';
import axios from '../../services/axios';
import '../volunteer/rewards.css'
import rewards from './Images/5558132.png'
import { Link } from 'react-router-dom';
import iconProfile from './../../images/icon_profile.png';
import Certificate from '../../images/certificate 1.png'
import Bronze from '../../images/image-25.png'
import Silver from '../../images/image 24.png'
import Gold from '../../images/image 23.png'

const Rewards = () => {
  const [volProfile, setVolProfile] = useState(null);

  
  const getBadge = (points) => {
    console.log("Points:", points); 
    if (points >= 101 && points <= 200) {
      console.log("Bronze Badge");
      return 'Bronze Badge';
    } else if (points >= 201 && points <= 300) {
      console.log("Silver Badge");
      return 'Silver Badge';
    } else if(points >= 300 && points <= 1000){
      console.log("Gold Badge");
      return 'Gold Badge';
    } else {
      console.log("No Badge");
      return 'No Badge';
    }
  };
  

  useEffect(() => {
    fetchVolUserProfile();
  }, []);

  const fetchVolUserProfile = async () => {
    try {
      let getVolProfile = await axios.getRequest("user", true);
      setVolProfile(getVolProfile);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className='rewardsTop'>
        <h1>Rewards</h1>
        {volProfile ? (
        <div className='pointDiv'>
          <h2 className='points'>Your Points: {volProfile.point}</h2>
          <Link to='/elder/profile'><img src={iconProfile} alt="iconProfile" /></Link>
          {/* <h2>Badge: {getBadge(volProfile.point)}</h2> */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
        
      </div>

<div className='earn-rewards'>
  <img src={rewards} alt="" />
  <h2>Earn Rewards in 2 different ways</h2>
</div>

  <div className='certificate-section'>
    <h2>Volunteer Certificate Request</h2>
    <div className='certificate'>
      <img src={Certificate} alt="" />
      <div className='appply-now-btn'>
        <p>Complete the volunteer certificate request form and click ‘Apply Now' to initiate the certification process.</p>
        <button className='darkBtn'>Apply now</button>
      </div>
    </div>
  </div>

  <div className='certificate-description'>
    <h3>How you will receive volunteer certificate</h3>
    <div>
      <p>You have to request for volunteer certificate to Wisecare team. Then ourWisecare team will look into your profile. I you have completed minimum5 tasks as a volunteer through app. Wisecare will send Volunteer certificate to your e-mail account And sent you a notification on Your website account.</p>
    </div>
  </div>

  <div className='badgeMain'>
    <h2>Why Badged</h2>
    <div className='bagdeDesDiv'>
      <div className='whyBadgeDes'>
        <img src={Bronze} alt="" />
        <p>This Badge can be yours if you complete at lest 5 tasks by helping seniors as a volunteer. This  Badge will put positive impact on your profile and Make seniors ensure that you are more reliable person for them.</p>
      </div>
      <div className='whyBadgeDes'>
        <img src={Gold} alt="" />
        <p>This Badge can be yours if you complete at lest 15 tasks by helping seniors as a volunteer. This  Badge will put positive impact on your profile and Make seniors ensure that you are more reliable person for them.</p>
      </div>
      <div className='whyBadgeDes'>
        <img src={Silver} alt="" />
        <p>This Badge can be yours if you complete at lest 25 tasks by helping seniors as a volunteer. This  Badge will put positive impact on your profile and Make seniors ensure that you are more reliable person for them.</p>
      </div>
    </div>
  </div>
  

      {volProfile ? (
        <div>
          <p>My Points: {volProfile.point}</p>
          <p>Badge: {getBadge(volProfile.point)}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Rewards;
