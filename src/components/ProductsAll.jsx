import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

const ProductsAll = ({ data }) => {
    const list = Array.isArray(data) ? data : [];

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-7">
            {list.length > 0 ? (
                list.map((item) => <ProductCard key={item._id} item={item} variant="mosaic" />)
            ) : (
                <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 py-16">
                    <img src="/img/products_empty.png" alt="" className="w-64 max-w-full opacity-50" />
                    <p className="text-slate-500">Không có sản phẩm nào ở đây.</p>
                </div>
            )}
        </div>
    );
};

ProductsAll.propTypes = {
    data: PropTypes.array,
};

export default ProductsAll;
