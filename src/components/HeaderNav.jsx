import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderBar = ({children, icon}) => {
    return (
        <div className="max-w-1/2 flex items-center max-[1000px]:!max-w-full">
            <NavLink className={'max-[600px]:hidden'}
            to={"/"}>
                <img src="/img/logo.png" alt="logo" 
                className="w-[100px] h-[100px]"/>
            </NavLink>
            <div className="mx-2.5 h-[50px] w-[2px] border-l-2 border-l-[#2f904b] max-[600px]:hidden"></div>
            {icon}
            <h1 className='text-[27px] text-[#2f904b] capitalize ml-2'>
                {children}
            </h1>
        </div>
    )
}

HeaderBar.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.node.isRequired,
}

export default HeaderBar