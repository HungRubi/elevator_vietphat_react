import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import icons from '../util/icons';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { debounce } from 'lodash';

const {FiSearch} = icons;

const Search = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [fromData, setFromData] = useState({
        s: ''
    });

    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFromData(prev => ({
            ...prev,
            [name]: value
        }));
        debouncedSearch(value);
    }

    const debouncedSearch = useCallback(
        debounce((value) => {
            if (value.trim()) {
                dispatch(actions.querySearch(value));
            }
        }, 500),
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fromData.s.trim()) {
            dispatch(actions.querySearch(fromData.s));
            navigate('/timkiem');
        }
    }

    return (
        <form onSubmit={handleSubmit} className='relative search-1513'>
            <input 
                type="text"
                onChange={handleChange}
                value={fromData.s} 
                name='s' 
                className={`hidden-1513 w-full pt-[3px] pr-[0px] pb-[3px] pl-[30px] outline-0 border-1 border-[#ffffffb4] text-[#ffffffb4] rounded-[8px] transition-all duration-300 ${
                    isFocused ? 'bg-white/10' : ''
                }`}
                placeholder='Enter name product'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            <button 
                type="submit"
                className='bg-search-1513 search-1513 absolute left-0 top-[50%] -translate-y-1/2 flex items-center justify-center w-[30px] hover:opacity-80 transition-opacity'
            >
                <FiSearch className='size-[20px] text-[#ffffffb4]'/>
            </button>
        </form>
    )
}

export default Search