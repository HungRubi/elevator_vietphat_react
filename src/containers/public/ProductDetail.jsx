import {LoveButton, QuantityButton, Button,PageBar, Form, ProductsAll} from '../../components/index';
import icons from '../../util/icons';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/'
import { useParams } from 'react-router-dom';
const {FaStar, FiTruck, AiOutlineRight, IoShieldCheckmarkOutline, PiShoppingCartBold, MdEmail, BsThreeDotsVertical, BiSolidLike} = icons

const ProductDetail = () => {
    const dispatch = useDispatch();
    const {productDetail, productSuggest} = useSelector(state => state.app);
    const {slug} = useParams();
    let pricePre = 0;
    if(Number(productDetail?.sale) === 0){
        pricePre = Number(productDetail?.price);
    }else{
        const discount = Number(productDetail?.sale) * Number(productDetail?.price) 
        pricePre = Number(productDetail?.pice) - discount;
    }

    useEffect(() => {
        if(slug){
            dispatch(actions.getProductDetail(slug))
        }
    }, [dispatch, slug])
    function format(money) {
        return money?.toLocaleString("vi-VN");
    }
    return (
        <div className='mb-15'>
            <div className="w-full px-[10%] pt-8">
                <div className="w-full flex justify-between">
                    <div className="w-[47%]">
                    <img src={productDetail?.thumbnail_main} alt={productDetail?.name || "Sản phẩm"} className="w-full"/>
                        <div className="w-full flex items-center justify-baseline mt-4 gap-4">
                            <img src={productDetail?.thumbnail_main} alt="" style={{width: "calc(25% - 12px)"}}/>
                            <img src={productDetail?.thumbnail_1} alt="" style={{width: "calc(25% - 12px)"}}/>
                            <img src={productDetail?.thumbnail_2} alt="" style={{width: "calc(25% - 12px)"}}/>
                            <img src={productDetail?.thumbnail_3} alt="" style={{width: "calc(25% - 12px)"}}/>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="relative flex">
                            <span className='inline-block'>
                                <LoveButton/>
                            </span>
                            <h1 className='line-clamp-2 text-[28px] leading-8 capitalize font-medium'>
                                {productDetail?.name}
                            </h1>
                        </div>
                        <div className="flex items-center justify-start mt-3">
                            <div className='flex gap-1 items-center'>
                                <span className='text-[28px] mr-1.5'>5</span>
                                <FaStar className='text-[#ee4d2d] text-[18px]'/>
                                <FaStar className='text-[#ee4d2d] text-[18px]'/>
                                <FaStar className='text-[#ee4d2d] text-[18px]'/>
                                <FaStar className='text-[#ee4d2d] text-[18px]'/>
                                <FaStar className='text-[#ee4d2d] text-[18px]'/>
                            </div>
                            <div className="h-[30px] w-[1px] border-l border-l-[#cbd0dd] mx-[15px]"></div>
                            <div className='flex gap-1 items-end text-[28px]'>
                                4k6
                                <span className='text-[#807f7f] capitalize text-[15px] leading-8 ml-1.5'>đánh giá</span>
                            </div>
                            <div className="h-[30px] w-[1px] border-l border-l-[#cbd0dd] mx-[14px] "></div>
                            <div className='flex gap-1 items-end text-[28px]'>
                                31.2k
                                <span className='text-[#807f7f] capitalize text-[15px] leading-8 ml-1.5'>sold</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-start mt-3 w-full bg-[#fafafa] py-[15px] px-5">
                            <span className="text-[30px] text-[#2f904b]">₫{format(pricePre)}</span>
                            <span className='text-[#929292] line-through text-[20px] ml-[0.925rem]'>₫{format(productDetail?.price)}</span>
                            <div className="bg-[#e3ffec] text-[12px] px-1 h-4.5 ml-[0.925rem] text-[#2f904b] font-bold rounded-[2px]">{productDetail?.sale}%</div>
                        </div>
                        <div className="flex items-center justify-start mt-8">
                            <h3 className="text-[#757575] capitalize text-[18px] mr-8 w-[120px] line-clamp-2">Mã giảm giá</h3>
                            <div className="bg-[#dafce5] py-[3px] px-[7px] whitespace-nowrap flex items-center justify-center discount relative mr-5 cursor-default">
                                <span className='text-[#2f904b]'>Giảm ₫200k</span>
                            </div>
                            <div className="bg-[#dafce5] py-[3px] px-[7px] whitespace-nowrap flex items-center justify-center discount relative cursor-default">
                                <span className='text-[#2f904b]'>Giảm ₫400k</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-start mt-8">
                            <h3 className="text-[#757575] capitalize text-[18px] mr-8 w-[120px] line-clamp-2">vận chuyển</h3>
                            <div className="flex items-center">
                                <FiTruck className='text-[#2f904b] text-[20px] mr-3.5'/>
                                <div className="">
                                    <div className="mr-5 flex items-center">
                                        <h5 className="text-[18px] text-[#222] line-clamp-2 flex items-center">
                                            Nhận hàng sau 5 ngày đặt, phí giao 0đ
                                            <AiOutlineRight className='ml-1'/>
                                        </h5>
                                    </div>
                                    <h5 className='text-[14px] text-[#888]'>Đặt hàng ngay để nhận được giá sốc</h5>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-start mt-8">
                            <h3 className="text-[#757575] capitalize text-[18px] mr-8 w-[120px] line-clamp-2">an tâm mua sắm</h3>
                            <div className="flex">
                                <IoShieldCheckmarkOutline className='text-[#2f904b] text-[20px] mr-3.5 '/>
                                <h5 className='flex items-center'>
                                    Trả hàng miễn phí sau 7 ngày 
                                    <AiOutlineRight className='ml-1'/>
                                </h5>
                            </div>
                        </div>
                        <div className="flex items-center justify-start mt-8">
                            <h3 className="text-[#757575] capitalize text-[20px] mr-8 w-[120px] line-clamp-2">số lượng</h3>
                            <div className="flex">
                                <QuantityButton/>
                                <h3 className="text-[#757575] capitalize text-[18px] mr-8 line-clamp-2 ml-5">Số lượng còn lại: {productDetail?.stock}</h3>
                            </div>
                        </div>
                        <div className="flex items-center mt-[80px] gap-5">
                            <Button
                            className="!bg-[#e3ffec] !text-[#2f904b] flex items-center gap-2 border border-[#2f904b]">
                                <PiShoppingCartBold className='text-[20px]'/> 
                                thêm vào giỏ hàng
                            </Button>
                            <Button className="border border-transparent">
                                mua ngay
                            </Button>
                            <Button className="border border-transparent flex items-center gap-2">
                                <MdEmail className='text-[20px]'/>
                                gửi mail
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-white mt-5 pb-[50px]">
                    <div className="w-full bg-[#DBDBDB] flex">
                        <h3 className='uppercase text-[18px] bg-white px-2.5 py-2.5 font-[600]'>
                            Mô tả sản phẩm
                        </h3>
                    </div>
                    <div className="w-[90%] mx-auto mt-[70px] wrapper_detail_product py-2.5">
                        <div className="py-2 5 border-b border-b-[#2f904b] relative detail_img_products">
                            <h3 className='text-[25px] font-[600] text-[#2f904b]'>
                                Hình ảnh sản phẩm
                            </h3>
                        </div>
                        <div className="flex">
                            <div className="w-1/3">
                                <img src={productDetail?.thumbnail_1} alt="" />
                            </div>
                            <div className="w-1/3">
                                <img src={productDetail?.thumbnail_2} alt="" />
                            </div>
                            <div className="w-1/3">
                                <img src={productDetail?.thumbnail_3} alt="" />
                            </div>
                        </div>
                        <p className="py-2 text-[16px] leading-8 text-justify">
                            {productDetail?.description}
                        </p>
                        <p className="py-2 text-[16px] leading-8 text-justify">
                            Số lượng tồn kho: {productDetail?.stock}
                        </p>
                    </div>
                    <div className="w-[90%] mx-auto wrapper_detail_product py-2.5 mb-[50px]">
                        <p className="text-[16px] leading-8 text-justify">
                            Nơi gửi: <span className=' capitalize text-blue-600'>hải phòng - việt nam</span>
                        </p>
                        <p className="text-[16px] leading-8 text-justify">
                            Danh mục: <span className=' capitalize text-blue-600'>thiết bị điện</span>
                        </p>
                    </div>
                </div>
                <div className="w-full bg-white mt-5 pb-[50px]">
                    <div className="w-full bg-[#DBDBDB] flex">
                        <h3 className='uppercase text-[18px] bg-white px-2.5 py-2.5 font-[600]'>
                            đánh giá sản phẩm
                        </h3>
                    </div>
                    <div className="w-[90%] mx-auto mt-5 px-[1.875rem] py-[1.875rem] mb-[1rem] rounded-[2px] bg-[#e3ffec] border border-[#2f904a34] flex items-center">
                        <div>
                            <div className="flex text-[1.875rem] text-[#2f904b] items-end">
                                5.0 <span className='text-[1.125rem] leading-9 ml-[5px]'>trên 5</span>
                            </div>
                            <div className="flex items-center">
                                <FaStar className='text-[20px] text-[#2f904b]'/>
                                <FaStar className='text-[20px] text-[#2f904b]'/>
                                <FaStar className='text-[20px] text-[#2f904b]'/>
                                <FaStar className='text-[20px] text-[#2f904b]'/>
                                <FaStar className='text-[20px] text-[#2f904b]'/>
                            </div>
                        </div>
                        <div className="ml-[25px] w-full flex flex-wrap items-center gap-4">
                        <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                tất cả
                            </Button> 
                            <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                5 sao (10,7k)
                            </Button> 
                            <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                4 sao (10,7k)
                            </Button>  
                            <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                3 sao (10,7k)
                            </Button>  
                            <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                2 sao (10,7k)
                            </Button>
                            <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                1 sao (10,7k)
                            </Button>
                            <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                có bình luận (10,7k)
                            </Button> 
                            <Button className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b]">
                                có hình ảnh (10,7k)
                            </Button>      
                        </div>
                    </div>
                    <ul className="w-[90%] mx-auto mt-5">
                        <li className="flex border-b border-b-[#2e2a2a17] py-[1rem] pl-[1.25rem]">
                            <div className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center overflow-hidden">
                                <img src="/img/default.png" alt="" />
                            </div>
                            <div className="ml-[15px] w-full">
                                <h4>huyhung</h4>
                                <div className="flex items-center mt-1.5 gap-1">
                                    <FaStar className='text-[13px] text-[#2f904b]'/>
                                    <FaStar className='text-[13px] text-[#2f904b]'/>
                                    <FaStar className='text-[13px] text-[#2f904b]'/>
                                    <FaStar className='text-[13px] text-[#2f904b]'/>
                                    <FaStar className='text-[13px] text-[#2f904b]'/>
                                </div>
                                <div className="text-[17px] text-[#0e0c0c] mt-1">
                                    <span className='text-[#0e0c0c63] text-[0.75rem] mb-[0.9375rem]'>
                                        12/3/2025 | 12:34 | Phân loại: Linh kiện điện
                                    </span>
                                    <br />
                                    Chất lượng sản phẩm: tốt 
                                    <br />
                                    Đúng với mô tả: đúng
                                </div>
                                <div className="my-[15px] text-[17px] line-clamp-2">
                                    Shop giao hàng nhanh, đóng gói cẩn thận, hàng đúng mô tả
                                </div>
                                <div className="w-full flex items-center gap-4 flex-wrap">
                                    <img src="/img/products/1.png" alt="" className='w-[100px] h-[100px] border border-[#cbd0dd] rounded-[5px]'/>
                                    <img src="/img/products/1.png" alt="" className='w-[100px] h-[100px] border border-[#cbd0dd] rounded-[5px]'/>
                                    <img src="/img/products/1.png" alt="" className='w-[100px] h-[100px] border border-[#cbd0dd] rounded-[5px]'/>
                                    <img src="/img/products/1.png" alt="" className='w-[100px] h-[100px] border border-[#cbd0dd] rounded-[5px]'/>
                                </div>
                                <div className="w-full bg-[rgba(83,82,82,0.0823529412)] py-2.5 pl-2.5 mt-5">
                                    <span>
                                        Phản hồi từ shop 
                                    </span>
                                    <br />
                                    <span className='text-[rgba(0,0,0,0.459)] text-[15px] line-clamp-2'>
                                        Cảm ơn đã ủng hộ chúng tôi
                                    </span>
                                </div>
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex gap-2.5 items-center">
                                        <BiSolidLike className='text-[20px] cursor-pointer text-[#2f904b]'/>
                                        <span className='leading-8 text-[20px]'>29</span>
                                    </div>
                                    <BsThreeDotsVertical className='text-20px -mr-[7px] cursor-pointer'/>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <PageBar/>
                </div>
            
            </div>
            <div className="text-center text-[50px] text-[#2f904b] capitalize mt-8"
                style={{ fontFamily: "Impact, sans-serif" }}>
                contact
            </div>
            <div className="w-full">
                <Form/>
            </div>
            <div className="text-center text-[50px] text-[#2f904b] capitalize mt-8"
                style={{ fontFamily: "Impact, sans-serif" }}>
                suggest products
            </div>
            <div className="w-full px-[10%] pt-5">
                <ProductsAll data={productSuggest}/>
            </div>
        </div>
        
    )
}
export default ProductDetail