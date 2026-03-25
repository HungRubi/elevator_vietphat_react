import PropTypes from 'prop-types';

const Button = ({ children, className, onClick, type, disabled, 'aria-label': ariaLabel, 'aria-busy': ariaBusy }) => {
    return (
        <button
            onClick={onClick}
            type={type || 'button'}
            disabled={disabled}
            aria-label={ariaLabel}
            aria-busy={ariaBusy}
            className={`cursor-pointer rounded-lg bg-[#2f904b] px-4 py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#268a42] focus:outline-none focus:ring-2 focus:ring-[#2f904b]/35 disabled:cursor-not-allowed disabled:opacity-60 ${className || ''}`}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    'aria-label': PropTypes.string,
    'aria-busy': PropTypes.bool,
};

export default Button;