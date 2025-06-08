import icons from '../../util/icons';
import {ProductsAll, PageBar} from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions';
import { Helmet } from 'react-helmet';

const {IoChevronUpSharp} = icons;


const Products = () => {
    const dispatch = useDispatch();
    const { products, categoryProduct } = useSelector(state => state.app);
    const [activeId, setActiveId] = useState(null)
    useEffect(() => {
        dispatch(actions.getProducts());
        dispatch(actions.getCategoryProduct());
    }, [dispatch]);

    const [current, setCurrent] = useState(1);
    const limit = 12;
    const lastProduct = current * limit;
    const firstProduct = lastProduct - limit;
    
    const currentProduct = products.slice(firstProduct, lastProduct);
    const handleClick = (id) => {
        setActiveId(id);
        dispatch(actions.getProductByCategory(id));
    };
    return (
        <>
            <Helmet>
                <title>Sản phẩm - Thang máy Việt Phát</title>
                <meta name="description" content="Khám phá các dòng sản phẩm thang máy chất lượng cao tại Thang máy Việt Phát: thang máy gia đình, thang máy tải hàng, thang máy kính và nhiều hơn nữa." />
                <meta name="keywords" content="sản phẩm thang máy, thang máy gia đình, thang máy tải hàng, thang máy kính, thang máy Việt Phát" />
                <meta name="robots" content="index, follow" />
                <link rel="canonical" href="https://vmu.com.vn/products" />
            </Helmet>
            <div className="w-full pt-8 mb-8">
                <div className="w-full px-[10%] flex gap-8">
                    <div className="w-[230px] flex-none">
                        <div className="py-1.5 pl-1.5 uppercase text-white bg-[#2f904b] font-[600] ">categories</div>
                        <ul className="w-full pl-2.5">
                            {categoryProduct.length > 0 && categoryProduct.map(item => (
                                <li key={item._id} onClick={() => handleClick(item._id)}
                                className={`w-full border-b border-b-[#ddd] py-1.5 flex items-center justify-between cursor-pointer ${activeId === item._id ? "text-[#2f904b]" : ""}`}>
                                    <span>{item.name}</span>
                                    <IoChevronUpSharp className='cursor-pointer'/>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex-1">
                        <ProductsAll data={currentProduct} />
                    </div>
                </div>
                <div className="w-full ml-[120px] flex justify-center">
                    <PageBar currentPage={current} totalPage={Math.ceil(products.length / limit)} onPageChange={setCurrent} />
                </div>
            </div>
        </>
    )
}
export default Products                                 