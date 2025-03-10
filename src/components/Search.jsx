import icons from '../util/icons';
const {FiSearch} = icons;

const Search = () => {
    return (
        <form action="" method="get" className='relative'>
            <input type="text" name='search' className='w-full pt-[3px] pr-[0px] pb-[3px] pl-[30px] outline-0 border-1 border-[#ffffffb4] text-[#ffffffb4] rounded-[8px]' placeholder='Enter name product'/>
            <button className='absolute left-0 top-[50%] -translate-y-1/2 flex items-center justify-center w-[30px]'>
                <FiSearch className=' size-[20px] text-[#ffffffb4]'/>
            </button>
        </form>
    )
}
export default Search