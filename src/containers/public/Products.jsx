import icons from '../../util/icons';
import { ProductsAll, PageBar } from '../../components/index';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as actions from '../../store/actions';

const { IoChevronUpSharp } = icons;

const Products = () => {
  const dispatch = useDispatch();
  const { totalPage, products } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(actions.getProducts());
  }, []);

  const [current, setCurrent] = useState(1);
  const limit = 12;
  const lastProduct = current * limit;
  const firstProduct = lastProduct - limit;
  const currentProduct = products.slice(firstProduct, lastProduct);

  return (
    <div className="w-full pt-8 mb-15">
      <div className="w-full px-[5%] md:px-[10%] flex flex-col md:flex-row gap-8">
        
        {/* Sidebar Categories */}
        <div className="w-full md:w-[230px] flex-none">
          <div className="py-1.5 pl-1.5 uppercase text-white bg-[#2f904b] font-[600] text-sm md:text-base">
            Danh mục
          </div>
          <ul className="w-full pl-2.5">
            {[
              "COP/LOP",
              "Linh kiện điện",
              "Linh kiện inox",
              "Linh kiện thép",
              "Tay vịn thang máy",
            ].map((label, idx) => (
              <li
                key={idx}
                className="w-full border-b border-b-[#ddd] py-1.5 flex items-center justify-between"
              >
                <span>{label}</span>
                <IoChevronUpSharp className="cursor-pointer" />
              </li>
            ))}
          </ul>
        </div>

        {/* Product List */}
        <div className="flex-1">
          <ProductsAll data={currentProduct} />
        </div>
      </div>

      {/* Pagination */}
      <PageBar currentPage={current} totalPage={totalPage} onPageChange={setCurrent} />
    </div>
  );
};

export default Products;
