import React from 'react'
import playstore from "../../../images/playstore.png"
import appstore from "../../../images/appstore.png"

import "./Footer.css"

export const Footer = () => {
  return (
    <div>
     <footer id="footer">
        <div className='leftFooter'>
            <h4>Download Our App</h4>
            <p>Download for Android And iPhone</p>
            <img className='footerImg' src={playstore} alt ="playstore" />
            <img className='footerImg' src={appstore} alt ="appstore" />
        </div>

        <div className='midFooter'>
        <h1>ItemKart.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; Aditya</p>
        </div>

        <div className='rightFooter'>
        <h4>Follow Us</h4>
        <a href="http://instagram.com/adity_gupta.nits">Instagram</a>
        <a href="http://instagram.com/Aditya">Facebook</a>
        </div>
        </footer>
    </div>
  )
}
