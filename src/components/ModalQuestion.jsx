import { useState, useRef } from 'react';
import { Button, LoveButton } from './index';
import { NavLink, useNavigate } from 'react-router-dom';
import icons from '../util/icons';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const {FaStar, FaRegStar, FaCamera, FaVideo} = icons;

const ModalQuestion = ({products}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user)
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [formData, setFormData] = useState({
        user_id: currentUser?._id,
        product_id: products?.map(product => product._id) || [],
        star: rating,
        img: [],
        quality: '',
        isAccurate: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
        setFormData(prev => ({...prev, star: index + 1}));
    };

    const handleProductSelect = (index) => {
        setSelectedProduct(index);
        setFormData(prev => ({
            ...prev,
            product_id: products[index]._id
        }));
    };

    const getRatingText = () => {
        switch(rating) {
            case 5:
                return 'Tuyệt vời';
            case 4:
                return 'Hài lòng';
            case 3:
                return 'Bình thường';
            case 2:
                return 'Không hài lòng';
            case 1:
                return 'Tệ';
            default:
                return '';
        }
    };

    const fileInputRef = useRef();

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + formData.img.length > 3) {
            toast.warn("Chỉ được tải lên tối đa 3 ảnh!");
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const oversized = files.find(file => file.size > 2 * 1024 * 1024);
        if (oversized) {
            toast.warn("Có ảnh vượt quá 2MB!");
            return;
        }

        const invalid = files.find(file => !allowedTypes.includes(file.type));
        if (invalid) {
            toast.warn("Chỉ hỗ trợ ảnh JPEG hoặc PNG!");
            return;
        }

        // Đọc tất cả ảnh
        const readers = files.map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers).then((base64Images) => {
            setFormData(prev => ({
                ...prev,
                img: [...prev.img, ...base64Images]
            }));
        });
    };


    const handleClickUpload = () => {
        fileInputRef.current.click();
    };
    
    const hanleSubmit = () => {
        dispatch(actions.addComment(formData));
        navigate('/');
    }
    return (
        <>
            <Button type="button" onClick={() => setIsOpen(true)} className={'max-[600px]:!text-sm'}>
                đánh giá
            </Button>
            <div 
                className={`fixed top-0 right-0 left-0 bottom-0 z-100 justify-center items-center bg-black/10  ${isOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsOpen(false)}
            >
                <div className="w-full h-full relative">
                    <div
                        className="w-[45.625rem] flex-none 
                        bg-white rounded-[3px] shadow-md shadow-black/50 flex flex-col 
                        p-7.5 gap-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h5 className="text-[22px] capitalize">
                            đánh giá sản phẩm
                        </h5>
                        <div className="w-full flex flex-col gap-5 mt-5 max-h-[calc(100vh-300px)]
                        overflow-y-scroll [&::-webkit-scrollbar]:hidden">
                            <div className="flex flex-col gap-2">
                                {products?.map((product, index) => (
                                    <div 
                                        key={product._id}
                                        className={`flex cursor-pointer p-2 rounded ${selectedProduct === index ? 'bg-gray-100' : ''}`}
                                        onClick={() => handleProductSelect(index)}
                                    >
                                        <NavLink 
                                            to={`/products/detail/${product.slug}`} 
                                            className="w-20 h-20 border border-gray-300 flex-none">
                                            <img src={product.thumbnail_main} alt="logo" className="w-full h-full object-cover" />
                                        </NavLink>
                                        <div className="ml-2.5 line-clamp-1 text-gray-600">
                                            <div className="flex mb-1">
                                                <LoveButton/> 
                                                <span className="font-[600]">Thang máy Việt Phát</span>
                                            </div>
                                            <span className=" text-gray-600">
                                                {product.name}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center">
                                <span className="text-lg text-gray-600">Chất lượng sản phẩm</span>
                                <div className="flex items-center gap-1 ml-10">
                                    {[...Array(5)].map((_, index) => (
                                        <div 
                                            key={index}
                                            onClick={() => handleStarClick(index)}
                                            className="cursor-pointer"
                                        >
                                            {index < rating ? (
                                                <FaStar className="text-yellow-500 text-3xl" />
                                            ) : (
                                                <FaRegStar className="text-yellow-500 text-3xl" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <span className={`ml-2.5 text-lg ${rating >= 4 ? 'text-yellow-500' : 'text-gray-600'}`}>
                                    {getRatingText()}
                                </span>
                            </div>
                            <div className="px-[1.5625rem] pt-[1.25rem] pb-[.9375rem] bg-[#f5f5f5]">
                                <div className="w-full h-full bg-white rounded-[3px] flex flex-col gap-2 p-2.5">
                                    <h5 className="text-lg">Chất lượng sản phẩm:</h5>
                                    <textarea 
                                        name="quality" 
                                        placeholder='để lại đánh giá của bạn' 
                                        className="w-full resize-none outline-none border-none"
                                        onChange={handleChange}
                                        defaultValue={formData.quality}
                                    />
                                    <h5 className="text-lg">Đúng với mô tả:</h5>
                                    <textarea 
                                        name="isAccurate" 
                                        onChange={handleChange}
                                        placeholder='để lại đánh giá của bạn' 
                                        className="w-full resize-none outline-none border-none"
                                        defaultValue={formData.isAccurate}
                                    />
                                    <div className="w-full h-[1px] bg-gray-300"></div>
                                    <textarea 
                                        name="message" 
                                        placeholder='Hãy chia sẻ những điều bạn thích về sản phẩm này với những người khác nhé' 
                                        rows={8} 
                                        className="mt-2.5 w-full resize-none outline-none border-none"
                                        onChange={handleChange}
                                        defaultValue={formData.message}
                                    />
                                </div>
                                <div className="mt-5 flex items-center gap-5">
                                    <Button 
                                        onClick={handleClickUpload}
                                        className="!capitalize flex items-center gap-2 bg-inherit text-lg !text-[#2f904b] border-2 border-[#2f904b]"
                                    >
                                        <FaCamera className="text-[28px]" />
                                        thêm hình ảnh
                                    </Button>
                                    <Button 
                                        onClick={() => {
                                            toast.warn("Chức năng này đang bảo trì. Vui lòng quay lại sau")
                                        }}
                                        className="!capitalize flex items-center gap-2 bg-inherit text-lg !text-[#2f904b] border-2 border-[#2f904b]"
                                    >
                                        <FaVideo className="text-[28px]" />
                                        thêm video
                                    </Button>
                                </div>
                                <div className="mt-5 text-gray-400">
                                    <div className="flex-none">
                                        <div className="mt-5 text-gray-400 flex gap-2 flex-wrap">
                                            {formData.img.map((image, index) => (
                                                <div key={index} className="relative w-24 h-24">
                                                    <img
                                                        src={image}
                                                        alt={`preview-${index}`}
                                                        className="w-full h-full object-cover rounded border"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                img: prev.img.filter((_, i) => i !== index)
                                                            }));
                                                        }}
                                                        className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded-bl cursor-pointer"
                                                    >
                                                        x
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                        <input 
                                            ref={fileInputRef}
                                            type="file"
                                            name="img"
                                            id="img"
                                            hidden
                                            onChange={handleFileChange}
                                            accept="image/jpeg,image/png"
                                            multiple 
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 text-gray-400">
                                    Thêm 50 ký tự và 1 hình ảnh và 1 video để đánh giá tốt nhất
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-5">
                                <Button
                                    type="button"
                                    className="bg-transparent !text-gray-600"
                                    onClick={() => setIsOpen(false)}
                                >
                                    trở lại
                                </Button>
                                <Button type="button" onClick={hanleSubmit}>
                                    Đánh giá
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

ModalQuestion.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ModalQuestion;
