import PropTypes from "prop-types"

const CircleButton = ({ children, className }) => {
    return (
        <div 
        className={`w-10 h-10 rounded-[50%] cursor-pointer flex items-center justify-center bg-[rgba(255,255,255,0.253)] ${className}`}>
            {children}
        </div>
    )
}

CircleButton.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.node.isRequired,
}

export default CircleButton
    