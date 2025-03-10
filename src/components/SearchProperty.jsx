import PropTypes from "prop-types"
const SearchProperty = ({children}) => {
    return (
        <div className="mt-5 w-full">
            <form action="" method="get" className="w-full flex">
                <input type="text" name="searchOrder"
                placeholder="Tìm kiếm đơn hàng theo tên sản phẩm hoặc id đơn hàng"
                className="w-full py-[7px] px-2.5 border-2 border-[#2f904b] outline-none"/>
                <button
                type="submit"
                className="uppercase bg-[#2f904b] text-white py-[6px] px-[35px] cursor-pointer">
                    {children}
                </button>
            </form>
        </div>
    )
}
SearchProperty.propTypes = {
    children: PropTypes.node.isRequired,
};
export default SearchProperty