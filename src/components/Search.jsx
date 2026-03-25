import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import icons from '../util/icons';
import { useDispatch } from 'react-redux';
import * as actions from '../store/actions';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

const { FiSearch } = icons;

const Search = ({ className }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const debouncedRef = useRef();

    useEffect(() => {
        debouncedRef.current = debounce((value) => {
            if (value.trim()) {
                dispatch(actions.querySearch(value));
            }
        }, 500);
        return () => debouncedRef.current?.cancel();
    }, [dispatch]);

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debouncedRef.current?.(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) {
            return;
        }
        dispatch(actions.querySearch(q));
        navigate(`/products?q=${encodeURIComponent(q)}`);
    };

    return (
        <form onSubmit={handleSubmit} className={`relative w-full max-w-md ${className || ''}`}>
            <label htmlFor="header-search" className="sr-only">
                Tìm sản phẩm
            </label>
            <input
                id="header-search"
                type="search"
                value={query}
                onChange={handleChange}
                name="s"
                placeholder="Tìm sản phẩm…"
                className="h-11 w-full rounded-full border border-slate-200 bg-white/90 py-2 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[#2f904b]/40 focus:ring-2 focus:ring-[#2f904b]/20"
            />
            <button
                type="submit"
                className="absolute left-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25"
                aria-label="Tìm kiếm"
            >
                <FiSearch className="size-[18px]" />
            </button>
        </form>
    );
};

Search.propTypes = {
    className: PropTypes.string,
};

export default Search;
