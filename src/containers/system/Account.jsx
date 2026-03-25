import { Route, Routes, useLocation } from "react-router-dom";
import { Profile, Banking, Address, Password, Notification, Order, Voucher } from "./index";

const Account = () => {
    const { pathname } = useLocation();
    const isOrderPage = pathname === "/account/order";

    const accountRoutes = (
        <Routes>
            <Route path="profile" element={<Profile />} />
            <Route path="banking" element={<Banking />} />
            <Route path="address" element={<Address />} />
            <Route path="password" element={<Password />} />
            <Route path="notification" element={<Notification />} />
            <Route path="order" element={<Order />} />
            <Route path="voucher" element={<Voucher />} />
        </Routes>
    );

    return (
        <div className="min-h-screen bg-[#f4f7f5] pb-16 pt-6 md:pt-10">
            <div className="mx-auto max-w-[1200px] px-4 md:px-8">
                <main className="min-w-0">
                    <div
                        className={`min-w-0 rounded-2xl border border-slate-200/90 shadow-[0_16px_48px_rgba(2,6,23,0.06)] ${
                            isOrderPage ? "bg-transparent overflow-visible" : "overflow-hidden bg-white"
                        }`}
                    >
                        {accountRoutes}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Account;
