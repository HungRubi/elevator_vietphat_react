import { useState, useRef, useEffect } from 'react';
import { Button, LoveButton } from './index';
import { NavLink, useNavigate } from 'react-router-dom';
import icons from '../util/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from "../store/slices/commentSlice";
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const { FaStar, FaRegStar, FaCamera, FaVideo, IoCloseSharp } = icons;

const LABEL = 'Đánh giá đơn hàng';

const ModalQuestion = ({ products }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    const [isOpen, setIsOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [formData, setFormData] = useState({
        user_id: currentUser?._id,
        product_id: products?.map((product) => product._id) || [],
        star: 5,
        img: [],
        quality: '',
        isAccurate: '',
        message: '',
    });
    const modalRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        const onDown = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', onDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('mousedown', onDown);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStarClick = (index) => {
        setRating(index + 1);
        setFormData((prev) => ({ ...prev, star: index + 1 }));
    };

    const handleProductSelect = (index) => {
        setSelectedProduct(index);
        setFormData((prev) => ({
            ...prev,
            product_id: products[index]._id,
        }));
    };

    const getRatingText = () => {
        switch (rating) {
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

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length + formData.img.length > 3) {
            toast.warn('Chỉ được tải lên tối đa 3 ảnh!');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const oversized = files.find((file) => file.size > 2 * 1024 * 1024);
        if (oversized) {
            toast.warn('Có ảnh vượt quá 2MB!');
            return;
        }

        const invalid = files.find((file) => !allowedTypes.includes(file.type));
        if (invalid) {
            toast.warn('Chỉ hỗ trợ ảnh JPEG hoặc PNG!');
            return;
        }

        const readers = files.map(
            (file) =>
                new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.readAsDataURL(file);
                })
        );

        Promise.all(readers).then((base64Images) => {
            setFormData((prev) => ({
                ...prev,
                img: [...prev.img, ...base64Images],
            }));
        });
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = () => {
        // đảm bảo payload đúng spec: user_id khớp user đang login, product_id là mảng
        const productIds = Array.isArray(formData.product_id)
            ? formData.product_id
            : formData.product_id
                ? [formData.product_id]
                : [];
        dispatch(
            addComment({
                ...formData,
                user_id: currentUser?._id,
                product_id: productIds,
            })
        );
        navigate('/');
    };

    const selected = products?.[selectedProduct];
    const inputArea =
        'mt-2 w-full resize-y rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20';

    return (
        <>
            <Button
                type="button"
                onClick={() => setIsOpen(true)}
                className="!rounded-xl !border !border-[var(--color-primary)]/35 !bg-[var(--color-primary)]/5 !normal-case !font-semibold !text-[var(--color-primary)] hover:!bg-[var(--color-primary)]/10 max-[600px]:!text-sm"
            >
                {LABEL}
            </Button>

            {isOpen ? (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-[2px]"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-review-title"
                >
                    <div
                        ref={modalRef}
                        className="flex max-h-[min(92vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-[var(--color-surface)] shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 sm:px-6">
                            <div>
                                <h2
                                    id="modal-review-title"
                                    className="text-lg font-bold text-slate-900 sm:text-xl"
                                >
                                    {LABEL}
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    Chọn sản phẩm trong đơn và chia sẻ trải nghiệm của bạn.
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                                aria-label="Đóng"
                            >
                                <IoCloseSharp className="text-xl" />
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
                            <div className="space-y-5">
                                <div className="space-y-2">
                                    {products?.map((product, index) => (
                                        <button
                                            key={product._id}
                                            type="button"
                                            onClick={() => handleProductSelect(index)}
                                            className={`flex w-full cursor-pointer gap-3 rounded-xl border-2 p-3 text-left transition sm:p-4 ${
                                                selectedProduct === index
                                                    ? 'border-[var(--color-primary)] bg-emerald-50/50'
                                                    : 'border-slate-200 hover:border-slate-300'
                                            }`}
                                        >
                                            <NavLink
                                                to={`/products/detail/${product.slug}`}
                                                onClick={(e) => e.stopPropagation()}
                                                className="h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-slate-200"
                                            >
                                                <img
                                                    src={product.thumbnail_main}
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </NavLink>
                                            <div className="min-w-0 flex-1">
                                                <div className="mb-1 flex items-center gap-2">
                                                    <LoveButton
                                                        productId={product._id}
                                                        tone="plain"
                                                        size="sm"
                                                    />
                                                    <span className="text-xs font-semibold text-slate-500">
                                                        Việt Phát
                                                    </span>
                                                </div>
                                                <p className="line-clamp-2 text-sm font-semibold text-slate-900">
                                                    {product.name}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-4 sm:flex-row sm:items-center sm:justify-between">
                                    <span className="text-sm font-semibold text-slate-700">
                                        Chất lượng sản phẩm
                                    </span>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, index) => (
                                                <button
                                                    key={index}
                                                    type="button"
                                                    onClick={() => handleStarClick(index)}
                                                    className="p-0.5"
                                                >
                                                    {index < rating ? (
                                                        <FaStar className="text-2xl text-amber-400" />
                                                    ) : (
                                                        <FaRegStar className="text-2xl text-amber-300" />
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                        <span
                                            className={`text-sm font-bold ${rating >= 4 ? 'text-amber-600' : 'text-slate-500'}`}
                                        >
                                            {getRatingText()}
                                        </span>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                                    <label className="text-sm font-bold text-slate-800">
                                        Chất lượng sản phẩm
                                    </label>
                                    <textarea
                                        name="quality"
                                        placeholder="Chia sẻ về chất lượng nhận được"
                                        className={inputArea}
                                        rows={2}
                                        onChange={handleChange}
                                        defaultValue={formData.quality}
                                    />
                                    <label className="mt-3 block text-sm font-bold text-slate-800">
                                        Đúng với mô tả
                                    </label>
                                    <textarea
                                        name="isAccurate"
                                        onChange={handleChange}
                                        placeholder="Sản phẩm có khớp mô tả không?"
                                        className={inputArea}
                                        rows={2}
                                        defaultValue={formData.isAccurate}
                                    />
                                    <div className="my-4 h-px bg-slate-100" />
                                    <textarea
                                        name="message"
                                        placeholder="Điều bạn thích nhất về sản phẩm này…"
                                        rows={5}
                                        className={inputArea}
                                        onChange={handleChange}
                                        defaultValue={formData.message}
                                    />

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            onClick={handleClickUpload}
                                            className="!inline-flex !items-center !gap-2 !rounded-xl !border-2 !border-[var(--color-primary)] !bg-transparent !normal-case !text-sm !font-semibold !text-[var(--color-primary)]"
                                        >
                                            <FaCamera className="text-lg" />
                                            Thêm ảnh
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                toast.warn(
                                                    'Chức năng đang bảo trì. Vui lòng quay lại sau.'
                                                )
                                            }
                                            className="!inline-flex !items-center !gap-2 !rounded-xl !border-2 !border-slate-200 !bg-transparent !normal-case !text-sm !font-semibold !text-slate-600"
                                        >
                                            <FaVideo className="text-lg" />
                                            Thêm video
                                        </Button>
                                    </div>

                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {formData.img.map((image, index) => (
                                            <div key={index} className="relative h-20 w-20">
                                                <img
                                                    src={image}
                                                    alt=""
                                                    className="h-full w-full rounded-lg border border-slate-200 object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setFormData((prev) => ({
                                                            ...prev,
                                                            img: prev.img.filter((_, i) => i !== index),
                                                        }));
                                                    }}
                                                    className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs font-bold text-white shadow"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        name="img"
                                        hidden
                                        onChange={handleFileChange}
                                        accept="image/jpeg,image/png"
                                        multiple
                                    />
                                    <p className="mt-3 text-xs text-slate-400">
                                        Gợi ý: thêm mô tả chi tiết và ảnh thực tế giúp đánh giá hữu ích hơn.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-3 border-t border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
                            <Button
                                type="button"
                                className="!border !border-slate-300 !bg-white !normal-case !font-semibold !text-slate-700 hover:!bg-slate-50"
                                onClick={() => setIsOpen(false)}
                            >
                                Trở lại
                            </Button>
                            <Button
                                type="button"
                                onClick={handleSubmit}
                                className="!normal-case !font-semibold"
                                disabled={!selected}
                            >
                                Gửi đánh giá
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

ModalQuestion.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ModalQuestion;
