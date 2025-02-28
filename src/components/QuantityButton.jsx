
const QuantityButton = () => {
    return (
        <div className="flex items-center">
            <button className="w-[30px] h-[30px] flex items-center justify-center !bg-transparent !text-black border border-[#cbd0dd] text-[18px] cursor-pointer">
                -
            </button>
            <input type="text" value="1" className='text-center h-[30px] w-[50px] border-t bg-white border-t-[#cbd0dd] border-b border-b-[#cbd0dd] outline-0'/>
            <button className="w-[30px] h-[30px] flex items-center justify-center !bg-transparent !text-black border border-[#cbd0dd] text-[18px] cursor-pointer">
                +
            </button>
        </div>
    )
}
export default QuantityButton