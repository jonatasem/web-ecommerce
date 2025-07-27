import React from 'react';
import './index.scss';

import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

export default function Mobile({ toggleDrawer }){ // Accept toggleDrawer as a prop
    return (
        <section className="container-mobile" onClick={toggleDrawer}> {/* Call toggleDrawer on click */}
            <HiOutlineBars3CenterLeft className='icon'/>
        </section>
    )
}