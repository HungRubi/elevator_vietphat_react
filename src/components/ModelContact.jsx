import { Button, Form } from './index';
import { useState, useRef, useEffect } from "react";
const ModelContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const modelRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modelRef.current && !modelRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);
    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className={"bg-[rgba(255,255,255,0.925)] !text-[#888] max-[600px]:!text-sm border border-[#cbd0dd] hover:bg-[#2f904b] hover:!text-white hover:border-transparent transition duration-500 ease-linear"}>
                Trả hàng
            </Button>
            <div className={`fixed flex top-0 right-0 left-0 bottom-0 z-100  bg-black/10 ${isOpen ? "" : "hidden"}`}>
                <div className="w-full flex items-center justify-center h-full">
                    <div className="w-140" ref={modelRef}>
                        <Form/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModelContact