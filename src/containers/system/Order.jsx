import {LoveButton, Button, SearchProperty} from '../../components';
import icons from '../../util/icons';
import { useState } from 'react';
const {FiTruck} = icons;
const Order = () => {
    const [active, setActive] = useState(0);
    const tab = [
        {
            title: 'Tất cả',
        },
        {
            title: 'Đang giao hàng',
        },
        {
            title: 'Đã giao hàng',
        },
        {
            title: 'Đã hủy',
        },
        {
            title: 'Trả hàng',
        },
    ]

    return (
        <div className="ml-8 flex-1">
            <div className="flex items-center justify-between bg-white w-full">
                {tab.map((item, index) => (
                    <div key={index} 
                    className={`text-center py-2.5 px-[25px] border-b-[2px] border-transparent cursor-pointer hover:border-[#2f904b] transition duration-300 ease-linear ${active === index ? "!border-b-[#2f904b] text-[#2f904b]" : "text-[#888]"}`}
                    onClick={() => setActive(index)}>
                        {item.title}
                    </div>
                ))}
            </div>
            <SearchProperty>search</SearchProperty>
            {active === 0 ? (
                <>
                    <ul className="w-full mt-5">
                        <li className="w-full mb-5">
                            <div className="bg-white w-full px-5">
                                <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <LoveButton/>
                                        <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                            Thang máy Việt Phát
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <FiTruck className='text-[20px] text-[#26aa99]'/>
                                        <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                            Đang vận chuyển
                                        </span>
                                        <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                            chờ giao hàng
                                        </h5>
                                    </div>
                                    
                                </div>
                                <ul className="w-full">
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                        
                                    </li>
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between ">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                <div className="pt-5 px-5 pb-3 text-right">
                                    <h5 className='text-[15px]'>
                                        Tổng tiền: <span className='text-[25px] text-[#2f904b]'>3.240.000đ</span>
                                    </h5>
                                </div>
                                <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                    <div className="w-1/2 ">
                                        <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                            Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                            Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                        </p>                            
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end gap-2.5">
                                        <Button>
                                            liên hệ ngay
                                        </Button>
                                        <Button
                                        className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                            hủy đơn
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </>
            ): (
                <></>
            )}
            {active === 1 ? (
                <>
                    <ul className="w-full mt-5">
                        <li className="w-full mb-5">
                            <div className="bg-white w-full px-5">
                                <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <LoveButton/>
                                        <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                            Thang máy Việt Phát
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <FiTruck className='text-[20px] text-[#26aa99]'/>
                                        <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                            Đang vận chuyển
                                        </span>
                                        <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                            chờ giao hàng
                                        </h5>
                                    </div>
                                    
                                </div>
                                <ul className="w-full">
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                        
                                    </li>
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between ">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                <div className="pt-5 px-5 pb-3 text-right">
                                    <h5 className='text-[15px]'>
                                        Tổng tiền: <span className='text-[25px] text-[#2f904b]'>3.240.000đ</span>
                                    </h5>
                                </div>
                                <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                    <div className="w-1/2 ">
                                        <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                            Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                            Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                        </p>                            
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end gap-2.5">
                                        <Button>
                                            liên hệ ngay
                                        </Button>
                                        <Button
                                        className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                            hủy đơn
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul className="w-full mt-5">
                        <li className="w-full mb-5">
                            <div className="bg-white w-full px-5">
                                <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <LoveButton/>
                                        <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                            Thang máy Việt Phát
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <FiTruck className='text-[20px] text-[#26aa99]'/>
                                        <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                            Đang vận chuyển
                                        </span>
                                        <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                            chờ giao hàng
                                        </h5>
                                    </div>
                                    
                                </div>
                                <ul className="w-full">
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                        
                                    </li>
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between ">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                <div className="pt-5 px-5 pb-3 text-right">
                                    <h5 className='text-[15px]'>
                                        Tổng tiền: <span className='text-[25px] text-[#2f904b]'>3.240.000đ</span>
                                    </h5>
                                </div>
                                <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                    <div className="w-1/2 ">
                                        <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                            Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                            Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                        </p>                            
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end gap-2.5">
                                        <Button>
                                            liên hệ ngay
                                        </Button>
                                        <Button
                                        className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                            hủy đơn
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </>
            ): (
                <></>
            )}
            {active === 2 ? (
                <>
                    <ul className="w-full mt-5">
                        <li className="w-full mb-5">
                            <div className="bg-white w-full px-5">
                                <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <LoveButton/>
                                        <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                            Thang máy Việt Phát
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <FiTruck className='text-[20px] text-[#26aa99]'/>
                                        <span className="text-[#26aa99] border-r border-[#cbd0dd] pr-4">
                                            Giao hàng thành công
                                        </span>
                                        <h5 className="mr-4 text-[#2f904b] font-[500] uppercase text-[20px]">
                                            hoàn thành
                                        </h5>
                                    </div>
                                    
                                </div>
                                <ul className="w-full">
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                        
                                    </li>
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between ">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                <div className="pt-5 px-5 pb-3 text-right">
                                    <h5 className='text-[15px]'>
                                        Tổng tiền: <span className='text-[25px] text-[#2f904b]'>3.240.000đ</span>
                                    </h5>
                                </div>
                                <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                    <div className="w-1/2 ">
                                        <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                            Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                            Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                        </p>                            
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end gap-2.5">
                                        <Button>
                                            đánh giá
                                        </Button>
                                        <Button>
                                            liên hệ ngay
                                        </Button>
                                        <Button
                                        className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                            hủy đơn
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </>
            ): (
                <></>
            )}
            {active === 3 ? (
                <>
                    <ul className="w-full mt-5">
                        <li className="w-full mb-5">
                            <div className="bg-white w-full px-5">
                                <div className="py-5 border-b border-b-[#cbd0dd] flex items-center justify-between">
                                    <div className="flex items-center gap-1.5">
                                        <LoveButton/>
                                        <h5 className="text-[14px] font-[600] leading-8 line-clamp-1">
                                            Thang máy Việt Phát
                                        </h5>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <h5 className="text-[#2f904b] font-[500] uppercase text-[20px]">
                                            đã hủy
                                        </h5>
                                    </div>
                                    
                                </div>
                                <ul className="w-full">
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                        
                                    </li>
                                    <li className="w-full order_items border-b border-[#cbd0dd] py-5">
                                        <div className="w-full flex items-center justify-between ">
                                            <div className="flex gap-2.5 w-[70%]">
                                                <div className="w-[100px] h-[100px] border border-[#cbd0dd]">
                                                    <img src="/img/products/1.png" alt="ảnh sản phẩm"
                                                    className='w-full object-cover' />
                                                </div>
                                                <div className="max-w-[70%]">
                                                    <h5 className="text-[17px] line-clamp-1">
                                                        Hệ thống mở cửa tự động ADA dành cho thang máy, cửa kính
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Đơn giá: 3.600.000đ
                                                    </h5>
                                                    <h5 className="text-[15px] line-clamp-1">
                                                        Số lượng: x1
                                                    </h5>
                                                </div>
                                            </div>
                                            <div className="flex-1 flex justify-end items-center gap-2.5">
                                                <h6 className='line-through text-[17px] text-[#888]'>
                                                    3.600.000đ
                                                </h6>
                                                <h6 className='text-[25px] text-[#2f904b]'>
                                                    3.240.000đ
                                                </h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full bg-[rgba(192,247,195,0.445)]">
                                <div className="pt-5 px-5 pb-3 text-right">
                                    <h5 className='text-[15px]'>
                                        Tổng tiền: <span className='text-[25px] text-[#2f904b]'>3.240.000đ</span>
                                    </h5>
                                </div>
                                <div className="flex items-center gap-10 pt-3 px-6 pb-6">
                                    <div className="w-1/2 ">
                                        <p className='text-justify line-clamp-3 leading-[1.5] text-[#888] text-[14px]'>
                                            Đơn hàng sẽ giao cho bạn trong vòng 5 ngày kể từ khi đặt hàng. 
                                            Vui lòng chú ý điện thoại để nhận hàng từ người giao
                                        </p>                            
                                    </div>
                                    <div className="w-1/2 flex items-center justify-end gap-2.5">
                                        <Button>
                                            mua lại
                                        </Button>
                                        <Button>
                                            liên hệ ngay
                                        </Button>
                                        <Button
                                        className={"bg-[rgba(255,255,255,0.925)] !text-[#888] border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                                            xem chi tiết
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </>
            ): (
                <></>
            )}
            {active === 4 ? (
                <>
                    <div 
                    className="w-full bg-white p-[10%] flex flex-col justify-center items-center mt-5 gap-5"
                    style={{boxShadow : '0 1px 1px 0 rgba(0, 0, 0, 0.05)'}}>
                        <img src="/img/orderEmpty.png" alt="" 
                        className='object-cover'/>
                        <h5 className='text-[20px] text-[#888] text-center mt-5 line-clamp-1'>
                            Bạn hiện đang không có yêu cầu trả hàng nào
                        </h5>
                    </div>
                </>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Order;