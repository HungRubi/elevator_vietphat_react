import PropTypes from 'prop-types';

const QuantityButton = ({ quantity, setQuantity, price, onQuantityChange }) => {
    const handleDecrease = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            onQuantityChange(newQuantity, price);
        }
    };

    const handleIncrease = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onQuantityChange(newQuantity, price);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
            onQuantityChange(value, price);
        }
    };

    return (
        <div className="flex items-center">
            <button 
                onClick={handleDecrease}
                className="w-[30px] h-[30px] flex items-center justify-center !bg-transparent !text-black border border-[#cbd0dd] text-[18px] cursor-pointer"
            >
                -
            </button>
            <input 
                type="text" 
                value={quantity} 
                onChange={handleInputChange}
                className='text-center h-[30px] w-[50px] border-t bg-white border-t-[#cbd0dd] border-b border-b-[#cbd0dd] outline-0'
            />
            <button 
                onClick={handleIncrease}
                className="w-[30px] h-[30px] flex items-center justify-center !bg-transparent !text-black border border-[#cbd0dd] text-[18px] cursor-pointer"
            >
                +
            </button>
        </div>
    )
}

QuantityButton.propTypes = {
    quantity: PropTypes.number.isRequired,
    setQuantity: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
}

export default QuantityButton