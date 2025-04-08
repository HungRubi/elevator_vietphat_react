import { Button } from '../../components'
import { useNavigate } from 'react-router-dom'
import path from '../../util/path'
const Page404 = () => {
    const navigate = useNavigate()
    return (
        <div className="w-full flex items-center justify-center py-10 bg-white">
            <div className="w-full flex items-center justify-center flex-col gap-5 mt-10">
                <img src="/gif/404.gif" alt="404" className='w-[400px] h-[400px]' />
                <h5 className='text-[30px] font-bold text-[#000000be]'>
                    Bạn chưa đăng nhập
                </h5>
                <p className='text-[#000000be]'>
                    Hãy đăng nhập để truy cập vào trang của bạn
                </p>
                <Button onClick={() => navigate(path.LOGIN)} className='rounded-3xl !px-6'>
                    Đăng nhập
                </Button>
            </div>
        </div>
    )
}

export default Page404