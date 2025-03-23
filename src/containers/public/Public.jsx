import {Footer, HeaderBar} from '../../components/index'
import { Outlet } from "react-router-dom"
import { useLocation } from 'react-router-dom';

const Public = () => {
    const location = useLocation();
    return (
        <div className="w-full">
            <div className={` top-0 left-0 right-0 z-[1000] ${location.pathname !== '/' ? "relative" : "absolute"}`}>
                <HeaderBar />
            </div>
            <div className="w-full relative">
                <Outlet />
            </div>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    )
}
export default Public