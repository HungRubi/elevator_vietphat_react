import PropTypes from "prop-types"

const Button = ({children, className}) => {
    return (
        <button className={`px-[7px] py-[15px] cursor-pointer text-center uppercase bg-[#2f904b] text-white font-[500] ${className}`}>
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired
  };
export default Button