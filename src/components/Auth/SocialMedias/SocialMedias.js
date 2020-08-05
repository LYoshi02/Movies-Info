import React from 'react';

import SocialMedia from "./SocialMedia/SocialMedia";

import googleIcon from "../../../assets/google_icon.png";
import facebookIcon from "../../../assets/facebook_icon.png";


const SocialMedias = (props) => {
    return (  
        <div>
          <SocialMedia 
            imageUrl={facebookIcon}
            alt="facebook icon"
          />
          <SocialMedia 
            imageUrl={googleIcon}
            alt="google icon"
          />
          <SocialMedia 
            imageUrl={facebookIcon}
            alt="twitter icon"
          />
        </div>
    );
}
 
export default SocialMedias;