import PropTypes from "prop-types"

const Button = ({children, className, onClick}) => {
    return (
        <button onClick={onClick}
        className={`py-[7px] px-[15px] cursor-pointer text-center uppercase bg-[#2f904b] text-white font-[500] ${className}`}>
            {children}
        </button>
    )
}
Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
    onClick: PropTypes.func
  };
export default Button