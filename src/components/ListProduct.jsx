import ProductCard from './ProductCard';
import { useMemo, memo } from 'react';
import PropTypes from 'prop-types';

const ListProduct = ({ data, category }) => {
    const filteredProducts = useMemo(() => {
        return data?.find((cat) => cat.category === category)?.products || [];
    }, [data, category]);

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((item) => (
                    <div key={item._id} data-aos="zoom-in">
                        <ProductCard item={item} variant="elevated" categoryLabel={category} />
                    </div>
                ))
            ) : (
                <p className="col-span-full text-slate-500">Không có sản phẩm nào.</p>
            )}
        </div>
    );
};

ListProduct.propTypes = {
    data: PropTypes.array.isRequired,
    category: PropTypes.string.isRequired,
};

export default memo(ListProduct);
