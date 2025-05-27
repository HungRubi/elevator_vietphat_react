import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const HeaderBar = ({ children, icon }) => {
  return (
    <div className="w-full flex items-center px-4 py-2 bg-white">
      {/* Logo */}
      <NavLink to="/" className="flex-shrink-0">
        <img
          src="/img/logo.png"
          alt="logo"
          className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] object-contain"
        />
      </NavLink>

      {/* Divider */}
      <div className="mx-2 h-[40px] sm:h-[50px] w-[2px] bg-[#2f904b] flex-shrink-0"></div>

      {/* Icon + Title */}
      <div className="flex items-center flex-wrap text-[#2f904b] gap-2 ml-2">
        <div className="text-[18px] sm:text-[22px] md:text-[27px] flex items-center gap-2">
          {icon}
          <span className="capitalize">{children}</span>
        </div>
      </div>
    </div>
  );
};

HeaderBar.propTypes = {
  children: PropTypes.node.isRequired,
  icon: PropTypes.node.isRequired,
};

export default HeaderBar;
