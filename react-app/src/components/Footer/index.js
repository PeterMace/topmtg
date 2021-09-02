import React from 'react'
import gitHub from '../../images/github.png';
import linkedIn from '../../images/linkedIn.png';
import './Footer.css'
export const Footer = () => {
    return (
        <footer>
            <div className="footer-container">
                 <a  href='https://github.com/PeterMace' target="_blank">
                    <img src={gitHub} alt="github logo" className="github-icon"></img>
                </a>
                <a  href='http://linkedin.com/in/peter-mace-510b35131' target="_blank">
                    <img src={linkedIn} alt="linkedIn logo" className="linkedin-icon"></img>
                </a>
            </div>
        </footer>  
    )
}
