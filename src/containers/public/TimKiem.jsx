import { useState } from "react";
import { useSelector } from "react-redux";
import { ListArticle, ListVideo, ProductsAll } from "../../components";
const TimKiem = () => {
    const {productSearch, articleSearch, videoSearch} = useSelector(state => state.app)

    const tabs = [
        "Tất cả",
        "Sản phẩm",
        "Bài viết",
        "Video",``
    ]
    const [isTab, setIsTab] = useState(0);
    return (
        <div>
            <div className="w-full px-[10%] my-10">
                <div className="flex h-13 gap-5 items-center border-b border-[#0003]">
                    <h1 className="capitalize h-full text-3xl font-[600] text-gray-800 pr-5 border-r border-[#0002] whitespace-nowrap">
                        kết quả tìm kiếm
                    </h1>
                    <div className="w-full flex gap-10 h-full">
                        {tabs.map((item, index) => (
                            <h5 key={index} onClick={() => setIsTab(index)}
                            className={`text-[16px] leading-11 h-full font-[500] text-gray-600 cursor-pointer hover:text-gray-900 ${index === isTab ? 'border-b-2 border-[#218888]' : 'border-b-2 border-transparent'}`}>
                                {item}
                            </h5>
                        ))}
                    </div>
                </div>
                {isTab === 0 ? (
                    <>
                        <div className="w-full mt-10">
                            <h3 className=" capitalize text-3xl">Sản Phẩm</h3>
                            <ProductsAll data={productSearch}/>
                        </div>
                        <div className="w-full mt-10">
                            <h3 className=" capitalize text-3xl">Bài Viết</h3>
                            <ListArticle currentArticle={articleSearch} className={"!bg-transparent !px-0"} isPageBar={"hidden"}/>
                        </div>
                        <div className="w-full mt-10">
                            <h3 className=" capitalize text-3xl">Video</h3>
                            <ListVideo data={videoSearch} />
                        </div>
                    </>
                ) : ("")}
                {isTab === 1 ? (
                    <div className="w-full mt-10">
                        <h3 className=" capitalize text-3xl">Sản Phẩm</h3>
                        <ProductsAll data={productSearch}/>
                    </div>
                ) : ("")}
                {isTab === 2 ? (
                    <div className="w-full mt-10">
                        <h3 className=" capitalize text-3xl">Bài Viết</h3>
                        <ListArticle currentArticle={articleSearch} className={"!bg-transparent !px-0"} isPageBar={"hidden"}/>
                    </div>
                ) : ("")}
                {isTab === 3 ? (
                    <div className="w-full mt-10">
                        <h3 className=" capitalize text-3xl">Video</h3>
                        <ListVideo data={videoSearch} />
                    </div>
                ) : ("")}
            </div>
        </div>
    );
}

export default TimKiem;