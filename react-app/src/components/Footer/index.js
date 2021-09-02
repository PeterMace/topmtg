import React from 'react'
import { NavLink } from 'react-router-dom';
export const Footer = () => {
    return (
        <div>
            <NavLink to='http://linkedin.com/in/peter-mace-510b35131' exact={true} activeClassName='active'>
              
            </NavLink>
            
            <NavLink to='https://github.com/PeterMace' exact={true} >
              
            </NavLink>

        </div>
    )
}
