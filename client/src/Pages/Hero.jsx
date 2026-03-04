import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import './css/Hero.css'
import axios from 'axios';
import { useEffect } from 'react';

const Hero = () => {


  return (
    <div className="congrats">
      <div className="center">
        <div className='zoom-in'><strong>You Got In Your Wallet! <br />For Free</strong>🎉<br /><h1>1,00,000 &#x20b9;</h1></div>
      </div>
      <DotLottieReact
        src="https://lottie.host/2068dc4c-7999-476e-a9c0-faf0c794c8ab/sJNG1KpzNA.lottie"
        loop={2}
        autoplay
        className='lottie'
      />
    </div>
  );
};

export default Hero