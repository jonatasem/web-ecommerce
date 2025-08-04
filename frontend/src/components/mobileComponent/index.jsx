import './index.scss';

import { HiOutlineBars3CenterLeft } from "react-icons/hi2";

export default function MobileComponent({ toggleDrawer }){
    return (
        <section className="container-mobile" onClick={toggleDrawer}>
            <HiOutlineBars3CenterLeft className='icon'/>
        </section>
    )
}