import { LoveButton, QuantityButton, Button, PageBar, Form, ProductsAll } from '../../components/index';
import icons from '../../util/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions/';
import { useParams } from 'react-router-dom';

const { FaStar, FiTruck, AiOutlineRight, IoShieldCheckmarkOutline, PiShoppingCartBold, MdEmail, BsThreeDotsVertical, BiSolidLike, FaRegStar } = icons;

const ProductDetail = () => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector(state => state.user);
    const { productDetail, productSuggest, comments } = useSelector(state => state.app);
    const [oneStar, setOneStar] = useState([]);
    const [twoStar, setTwoStar] = useState([]);
    const [threeStar, setThreeStar] = useState([]);
    const [fourStar, setFourStar] = useState([]);
    const [fiveStar, setFiveStar] = useState([]);
    const [averageStar, setAverageStar] = useState(0);

    useEffect(() => {
        if (comments) {
            setOneStar(comments.filter(item => item.star === 1));
            setTwoStar(comments.filter(item => item.star === 2));
            setThreeStar(comments.filter(item => item.star === 3));
            setFourStar(comments.filter(item => item.star === 4));
            setFiveStar(comments.filter(item => item.star === 5));

            const totalStars = comments.reduce((sum, item) => sum + item.star, 0);
            const avg = totalStars / comments.length;
            setAverageStar(Math.round(avg * 10) / 10);
        }
    }, [comments]);

    const typeComment = [
        { title: 'tất cả', length: comments?.length || 0 },
        { title: '5 sao', length: fiveStar?.length || 0 },
        { title: '4 sao', length: fourStar?.length || 0 },
        { title: '3 sao', length: threeStar?.length || 0 },
        { title: '2 sao', length: twoStar?.length || 0 },
        { title: '1 sao', length: oneStar?.length || 0 }
    ];

    const { slug } = useParams();
    let pricePre = 0;
    if (Number(productDetail?.sale) === 0) {
        pricePre = Number(productDetail?.price);
    } else {
        const discount = Number(productDetail?.sale) * Number(productDetail?.price);
        pricePre = Number(productDetail?.price) - discount;
    }

    useEffect(() => {
        if (slug) dispatch(actions.getProductDetail(slug));
    }, [dispatch, slug]);

    const format = (money) => money?.toLocaleString("vi-VN");

    const handleAddToCart = (product, userId) => {
        const cartData = { productId: product._id, quantity: 1 };
        dispatch(actions.updateCart(cartData, userId));
    };

    return (
        <div className='mb-15'>
            <div className="w-full px-4 sm:px-8 lg:px-[10%] pt-8">
                <div className="w-full flex flex-col lg:flex-row justify-between gap-5">
                    <div className="w-full lg:w-[47%]">
                        <img src={productDetail?.thumbnail_main} alt={productDetail?.name || "Sản phẩm"} className="w-full" />
                        <div className="w-full flex flex-wrap items-center justify-start gap-3 mt-4">
                            {[productDetail?.thumbnail_main, productDetail?.thumbnail_1, productDetail?.thumbnail_2, productDetail?.thumbnail_3].map((src, idx) => (
                                <img key={idx} src={src} alt="" className="w-[22%] min-w-[60px]" />
                            ))}
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
                        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2">
                            <LoveButton />
                            <h1 className='line-clamp-2 text-[20px] sm:text-[24px] lg:text-[28px] leading-8 capitalize font-medium'>
                                {productDetail?.name}
                            </h1>
                        </div>
                        <div className="flex flex-wrap items-center justify-start mt-3 gap-4">
                            <div className='flex gap-1 items-center text-[22px]'>5 <FaStar className='text-[#ee4d2d]' /><FaStar className='text-[#ee4d2d]' /><FaStar className='text-[#ee4d2d]' /><FaStar className='text-[#ee4d2d]' /><FaStar className='text-[#ee4d2d]' /></div>
                            <div className="text-[18px] text-[#888]">{comments?.length} đánh giá</div>
                            <div className="text-[18px] text-[#888]">31.2k sold</div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center mt-3 w-full bg-[#fafafa] py-3 px-5 gap-4">
                            <span className="text-[24px] text-[#2f904b]">₫{format(pricePre)}</span>
                            <span className='text-[#929292] line-through text-[18px]'>₫{format(productDetail?.price)}</span>
                            <div className="bg-[#e3ffec] text-[12px] px-1 h-4.5 text-[#2f904b] font-bold rounded-[2px]">{productDetail?.sale}%</div>
                        </div>
                            <div className="w-full mt-10">
                                <h2 className="text-[24px] font-semibold text-[#2f904b] mb-4">Mô tả sản phẩm</h2>
                                     <p className="py-4 text-[16px] leading-8 text-justify">
                                         {productDetail?.description}
                                    </p>
                                     <p className="py-2 text-[16px] leading-8 text-justify">
                                         Số lượng tồn kho: {productDetail?.stock}
                                    </p>
                                    <p className="text-[16px] leading-8 text-justify">
                                             Nơi gửi: <span className=' capitalize text-blue-600'>hải phòng - việt nam</span>
                                     </p>
                                    <p className="text-[16px] leading-8 text-justify">
                                        Danh mục: <span className=' capitalize text-blue-600'>thiết bị điện</span>
                                     </p>
                                </div>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <Button onClick={() => handleAddToCart(productDetail, currentUser?._id)} className="!bg-[#e3ffec] !text-[#2f904b] flex items-center gap-2 border border-[#2f904b]">
                                <PiShoppingCartBold className='text-[20px]' /> thêm vào giỏ hàng
                            </Button>
                            <Button className="border border-transparent">mua ngay</Button>
                            <Button className="border border-transparent flex items-center gap-2">
                                <MdEmail className='text-[20px]' /> gửi mail
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-10">
                    <h2 className="text-[24px] font-semibold text-[#2f904b] mb-4">Đánh giá sản phẩm</h2>
                    {comments && comments.length > 0 ? (
                        <div className="w-full bg-[#e3ffec] border border-[#2f904a34] p-4 rounded-md">
                            <div className="flex items-center mb-4">
                                <span className="text-[32px] font-bold text-[#2f904b]">{averageStar}</span>
                                <span className="text-[16px] ml-2">trên 5</span>
                                <div className="flex ml-4">
                                    {[...Array(5)].map((_, index) => {
                                        const starValue = averageStar - index;
                                        if (starValue >= 1) return <FaStar key={index} className='text-[20px] text-[#2f904b]' />;
                                        else if (starValue > 0) return <FaRegStar key={index} className='text-[20px] text-[#2f904b] opacity-50' />;
                                        else return <FaRegStar key={index} className='text-[20px] text-[#2f904b]' />;
                                    })}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {typeComment.map((item, idx) => (
                                    <Button key={idx} className="!capitalize !py-[5px] font-[400] !bg-transparent border border-[#2f904b] !text-[#2f904b] hover:!bg-[#2f904b] hover:!text-white transition duration-300">
                                        {item.title} ({item.length} đánh giá)
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="w-full py-10 flex items-center justify-center flex-col gap-5">
                            <img src="/img/no-comment.png" alt="" className='w-[200px] h-[200px] opacity-30' />
                            <h3 className='text-[20px] text-gray-400'>Chưa có đánh giá nào</h3>
                        </div>
                    )}

                    <ul className="w-full mt-5">
                        {comments?.map(item => (
                            <li key={item._id} className="flex flex-col sm:flex-row border-b border-b-[#2e2a2a17] py-4">
                                <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                    <img src={item.user_id.avatar} alt="avatar" className="w-full h-full object-cover" />
                                </div>
                                <div className="ml-0 sm:ml-[15px] mt-2 sm:mt-0 w-full">
                                    <h4 className="font-semibold">{item.user_id.account}</h4>
                                    <div className="flex gap-1 mt-1">
                                        {[...Array(5)].map((_, index) => index < item.star ? (
                                            <FaStar key={index} className='text-[13px] text-yellow-500' />
                                        ) : (
                                            <FaRegStar key={index} className='text-[13px] text-yellow-500' />
                                        ))}
                                    </div>
                                    <div className="text-[16px] text-gray-700 mt-1">
                                        <span className='text-gray-400 text-sm'>{item.lastUpdate} | 12:34 | Phân loại: Linh kiện điện</span>
                                        <br />
                                        Chất lượng sản phẩm: {item.quantity}<br />
                                        Đúng với mô tả: {item.isAccurate}
                                    </div>
                                    <p className="my-2 text-[16px] text-gray-800 line-clamp-2">{item.message}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {[1, 2, 3, 4].map(i => (
                                            <img key={i} src="/img/products/1.png" alt="preview" className='w-[100px] h-[100px] border border-[#cbd0dd] rounded-[5px]' />
                                        ))}
                                    </div>
                                    <div className="w-full bg-gray-100 p-2.5 mt-3">
                                        <strong>Phản hồi từ shop:</strong><br />
                                        <span className='text-gray-600 text-sm'>Cảm ơn đã ủng hộ chúng tôi</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex gap-2.5 items-center">
                                            <BiSolidLike className='text-[20px] text-[#2f904b] cursor-pointer' />
                                            <span className='text-[16px]'>29</span>
                                        </div>
                                        <BsThreeDotsVertical className='text-[20px] cursor-pointer' />
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {comments && comments.length > 0 && <PageBar />}
                </div>
            </div>

            <div className="text-center text-[40px] sm:text-[50px] text-[#2f904b] capitalize mt-10 font-impact">
                contact
            </div>
            <div className="w-full px-4 sm:px-[10%]">
                <Form />
            </div>
            <div className="text-center text-[40px] sm:text-[50px] text-[#2f904b] capitalize mt-10 font-impact">
                suggest products
            </div>
            <div className="w-full px-4 sm:px-[10%] pt-5">
                <ProductsAll data={productSuggest} />
            </div>
        </div>
    );
};

export default ProductDetail;