import { NavLink, useNavigate } from "react-router-dom";
import { menuBar } from "../util/menu";
import { CircleButton, Notification, Search, Button } from "./index";
import icons from "../util/icons";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
import { IoChevronForward } from "react-icons/io5";

const {
    FaRegBell,
    RiMenuFill,
    PiShoppingCartBold,
    IoCloseSharp,
    FiSearch,
    FaArrowRightFromBracket,
    BsPerson,
    FiTruck,
    BsTag,
    FaCaretDown,
    FaGem,
    FaRegStar,
    FaHeart,
    IoShieldCheckmarkOutline,
    FaRegNewspaper,
    FaCirclePlay,
    HiUserGroup,
} = icons;

const NAV_LABEL_VI = {
    home: "Trang chủ",
    products: "Sản phẩm",
    news: "Tin tức",
    "about us": "Giới thiệu",
    contact: "Liên hệ",
};

const MEGA_COPY = {
    products: {
        kicker: "Danh mục",
        title: "Sản phẩm & phụ kiện",
        hint: "Thiết bị thang máy — chọn nhóm để xem nhanh",
    },
    news: {
        kicker: "Nội dung",
        title: "Tin tức & đa phương tiện",
        hint: "Bài viết, video và tuyển dụng",
    },
};

function navTo(path) {
    if (path === "" || path === "/") return "/";
    const p = String(path).replace(/^\//, "");
    return `/${p}`;
}

function productSubIcon(text) {
    const t = (text || "").toLowerCase();
    if (t.includes("cop") || t.includes("lop")) return FaGem;
    if (t.includes("điện")) return FaRegStar;
    if (t.includes("tay") || t.includes("vịn")) return FaHeart;
    if (t.includes("inox")) return IoShieldCheckmarkOutline;
    if (t.includes("thép")) return FiTruck;
    return BsTag;
}

function newsSubIcon(text) {
    const t = (text || "").toLowerCase();
    if (t.includes("video")) return FaCirclePlay;
    if (t.includes("tuyển")) return HiUserGroup;
    return FaRegNewspaper;
}

function NavMegaDropdown({ menuKey, subMenu }) {
    const copy = MEGA_COPY[menuKey];
    if (!copy || !subMenu?.length) return null;

    return (
        <div className="vp-header-dropdown pointer-events-auto absolute left-1/2 top-full z-[120] w-[min(calc(100vw-1.5rem),400px)] -translate-x-1/2 pt-2">
            <div className="overflow-hidden rounded-2xl border border-slate-200/95 bg-white shadow-[0_24px_56px_rgba(15,23,42,0.14)]">
                <div className="border-b border-slate-200/90 bg-gradient-to-b from-emerald-50 to-white px-4 py-3.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2f904b]">{copy.kicker}</p>
                    <p className="mt-1 text-base font-extrabold tracking-tight text-slate-900">{copy.title}</p>
                    <p className="mt-1 text-xs font-medium text-slate-600">{copy.hint}</p>
                </div>
                <div className="max-h-[min(70vh,340px)] overflow-y-auto overscroll-contain bg-white p-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300">
                    <div className="grid grid-cols-1 gap-0.5">
                        {subMenu.map((subItem) => {
                            const Icon =
                                menuKey === "products" ? productSubIcon(subItem.text) : newsSubIcon(subItem.text);
                            return (
                                <NavLink
                                    key={subItem.path}
                                    to={subItem.path}
                                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/35 focus-visible:ring-offset-1"
                                >
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-[#2f904b] transition group-hover:bg-[#2f904b] group-hover:text-white">
                                        <Icon className="size-[18px]" aria-hidden />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-sm font-semibold capitalize leading-snug text-slate-900">
                                            {subItem.text}
                                        </span>
                                        <span className="text-[11px] font-medium text-slate-600 group-hover:text-[#2f904b]">
                                            Mở danh mục
                                        </span>
                                    </span>
                                    <IoChevronForward className="size-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-[#2f904b]" aria-hidden />
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
                <div className="border-t border-slate-200 bg-slate-50 px-3 py-2.5">
                    <NavLink
                        to={menuKey === "products" ? "/products" : "/news"}
                        className="flex items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-xs font-bold uppercase tracking-wide text-[#2f904b] shadow-sm ring-1 ring-slate-200/80 transition hover:bg-emerald-50 hover:ring-emerald-200"
                    >
                        Xem toàn bộ
                        <span aria-hidden>→</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

const HeaderBar = () => {
    const { currentUser, productCart, myNotifi } = useSelector((state) => state.user);
    const filterNotifi = myNotifi?.filter((item) => item.isRead === false);
    const [openMenu, setOpenMenu] = useState(null);
    const [hoveredMenu, setHoveredMenu] = useState(null);
    const timeoutRef = useRef(null);

    const handleToggleMenu = (menu) => {
        setOpenMenu((prev) => (prev === menu ? null : menu));
    };

    const handleMenuHover = (menu) => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setHoveredMenu(menu);
    };

    const handleMenuLeave = () => {
        timeoutRef.current = setTimeout(() => setHoveredMenu(null), 160);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenu === "notification" && !event.target.closest(".notification-menu")) {
                setOpenMenu(null);
            }
            if (openMenu === "account" && !event.target.closest(".account-menu")) {
                setOpenMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [openMenu]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const hanleLogout = () => {
        dispatch(actions.logout());
        navigate("/");
        setOpenMenu(null);
    };

    const { menu_mobie } = useSelector((state) => state.app);
    const clickMenuMobie = () => {
        dispatch(actions.toggleMenuMobie(!menu_mobie));
    };
    const [isSearchMobie, setIsSearchMobie] = useState(false);

    const avatarSrc = currentUser
        ? currentUser?.avatar?.startsWith("/uploads")
            ? `${import.meta.env.VITE_SERVER_URL}${currentUser?.avatar}`
            : currentUser?.avatar
        : "/img/default.png";

    const headerShell =
        "bg-white/75 backdrop-blur-xl border-b border-white/80 shadow-[0_12px_40px_rgba(2,6,23,0.07)]";

    const navPill =
        "inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/30";

    return (
        <div className={`relative w-full ${headerShell}`} data-aos="fade-down" data-aos-anchor-placement="top-bottom">
            <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 px-4 py-3 md:px-8">
                <NavLink
                    to="/"
                    className="inline-flex shrink-0 items-center gap-3 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/25"
                >
                    <img src="/img/logo.png" alt="Thang máy Việt Phát" className="h-10 w-auto" />
                </NavLink>

                <nav className="hidden items-center gap-0.5 lg:flex">
                    {menuBar.map((item) => {
                        const hasSub = Array.isArray(item.subMenu) && item.subMenu.length > 0;
                        const label = NAV_LABEL_VI[item.text] || item.text;
                        const megaKey = item.text === "products" ? "products" : item.text === "news" ? "news" : null;

                        return (
                            <div
                                key={item.text}
                                className="relative"
                                onMouseEnter={() => handleMenuHover(item.text)}
                                onMouseLeave={handleMenuLeave}
                            >
                                <NavLink
                                    to={navTo(item.path)}
                                    className={({ isActive }) =>
                                        `${navPill} ${
                                            isActive
                                                ? "bg-gradient-to-r from-emerald-600 to-[#2f904b] text-white shadow-[0_8px_24px_rgba(47,144,75,0.35)]"
                                                : "text-slate-700 hover:bg-white/90 hover:text-slate-900"
                                        }`
                                    }
                                >
                                    <span>{label}</span>
                                    {hasSub ? (
                                        <FaCaretDown
                                            className={`size-3.5 opacity-80 transition ${hoveredMenu === item.text ? "rotate-180" : ""}`}
                                        />
                                    ) : null}
                                </NavLink>

                                {hasSub && megaKey && hoveredMenu === item.text ? (
                                    <NavMegaDropdown menuKey={megaKey} subMenu={item.subMenu} />
                                ) : null}
                            </div>
                        );
                    })}
                </nav>

                <div className="flex items-center justify-end gap-2 sm:gap-2.5">
                    <div className="hidden sm:block">
                        <Search />
                    </div>
                    <CircleButton onClick={() => setIsSearchMobie(true)} className={"sm:!hidden !flex"}>
                        <FiSearch className="size-[20px] text-slate-700" />
                    </CircleButton>

                    <div className="notification-menu relative hidden sm:block">
                        <button
                            type="button"
                            className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/25 ${
                                openMenu === "notification"
                                    ? "border-[#2f904b]/40 bg-emerald-50 text-[#2f904b] shadow-inner"
                                    : "border-white/70 bg-white/80 text-slate-700 shadow-sm hover:bg-white hover:shadow-md"
                            }`}
                            onClick={() => handleToggleMenu("notification")}
                            aria-expanded={openMenu === "notification"}
                            aria-label="Thông báo"
                        >
                            <FaRegBell className="size-[20px]" />
                            <span
                                className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-red-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white ${
                                    filterNotifi?.length ? "" : "hidden"
                                }`}
                            >
                                {filterNotifi?.length > 9 ? "9+" : filterNotifi?.length}
                            </span>
                        </button>
                        {openMenu === "notification" ? (
                            <div className="absolute right-0 top-[calc(100%+10px)] z-[1300] w-[min(calc(100vw-1.5rem),440px)]">
                                <Notification onNavigate={() => setOpenMenu(null)} />
                            </div>
                        ) : null}
                    </div>

                    <NavLink
                        to="/cart"
                        className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-700 shadow-sm transition hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/25 sm:inline-flex"
                        aria-label="Giỏ hàng"
                    >
                        <PiShoppingCartBold className="size-[20px]" />
                        <span
                            className={`absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#2f904b] to-emerald-700 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white ${
                                productCart?.length > 0 ? "" : "hidden"
                            }`}
                        >
                            {productCart?.length > 99 ? "99+" : productCart?.length || 0}
                        </span>
                    </NavLink>

                    <div className="account-menu relative h-10 w-10 shrink-0">
                        <button
                            type="button"
                            onClick={() => handleToggleMenu("account")}
                            aria-expanded={openMenu === "account"}
                            aria-label="Tài khoản"
                            className={`relative h-10 w-10 overflow-hidden rounded-full border-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/25 ${
                                openMenu === "account"
                                    ? "border-[#2f904b] shadow-[0_0_0_3px_rgba(47,144,75,0.2)]"
                                    : "border-white/80 shadow-sm hover:border-emerald-200/80"
                            }`}
                        >
                            <img src={avatarSrc} alt="" className="h-full w-full object-cover" />
                        </button>
                        {openMenu === "account" ? (
                            <div className="vp-header-dropdown absolute right-0 top-[calc(100%+10px)] z-[1300] w-[min(calc(100vw-1.5rem),320px)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_64px_rgba(15,23,42,0.18)]">
                                {currentUser ? (
                                    <>
                                        <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-4">
                                            <img
                                                src={
                                                    currentUser?.avatar?.startsWith("/uploads")
                                                        ? `${import.meta.env.VITE_SERVER_URL}${currentUser.avatar}`
                                                        : currentUser.avatar
                                                }
                                                alt=""
                                                className="size-12 shrink-0 rounded-full object-cover ring-2 ring-white shadow-md ring-offset-2 ring-offset-slate-50"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-[15px] font-bold text-slate-900">{currentUser?.name}</p>
                                                <p className="mt-1 inline-flex items-center rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#1b5e35]">
                                                    Thành viên
                                                </p>
                                            </div>
                                        </div>
                                        <nav className="bg-white px-2 py-2">
                                            <p className="px-2 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Quản lý
                                            </p>
                                            <ul className="space-y-0.5">
                                                <li>
                                                    <NavLink
                                                        to="/account/profile"
                                                        onClick={() => setOpenMenu(null)}
                                                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/30"
                                                    >
                                                        <span className="flex items-center gap-3">
                                                            <span className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                                                <BsPerson className="size-[18px]" aria-hidden />
                                                            </span>
                                                            Hồ sơ cá nhân
                                                        </span>
                                                        <IoChevronForward className="size-4 text-slate-300" aria-hidden />
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/account/order"
                                                        onClick={() => setOpenMenu(null)}
                                                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/30"
                                                    >
                                                        <span className="flex items-center gap-3">
                                                            <span className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                                                <FiTruck className="size-[18px]" aria-hidden />
                                                            </span>
                                                            Đơn hàng
                                                        </span>
                                                        <IoChevronForward className="size-4 text-slate-300" aria-hidden />
                                                    </NavLink>
                                                </li>
                                                <li>
                                                    <NavLink
                                                        to="/account/voucher"
                                                        onClick={() => setOpenMenu(null)}
                                                        className="flex items-center justify-between gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/30"
                                                    >
                                                        <span className="flex items-center gap-3">
                                                            <span className="flex size-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                                                <BsTag className="size-[18px]" aria-hidden />
                                                            </span>
                                                            Voucher
                                                        </span>
                                                        <IoChevronForward className="size-4 text-slate-300" aria-hidden />
                                                    </NavLink>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div className="border-t border-slate-200 bg-slate-50/80 px-3 py-3">
                                            <button
                                                type="button"
                                                onClick={hanleLogout}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
                                            >
                                                <FaArrowRightFromBracket className="size-4" aria-hidden />
                                                Đăng xuất
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="bg-white p-5">
                                        <div className="text-center">
                                            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-slate-100 text-[#2f904b] ring-1 ring-slate-200/80">
                                                <BsPerson className="size-7" aria-hidden />
                                            </div>
                                            <h3 className="mt-4 text-lg font-extrabold tracking-tight text-slate-900">Tài khoản</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                                Đăng nhập để xem đơn hàng, voucher và ưu đãi dành cho bạn.
                                            </p>
                                        </div>
                                        <div className="mt-5 space-y-2.5">
                                            <NavLink
                                                to="/login"
                                                onClick={() => setOpenMenu(null)}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f904b] py-3 text-sm font-bold text-white shadow-[0_8px_24px_rgba(47,144,75,0.35)] transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/40"
                                            >
                                                Đăng nhập
                                            </NavLink>
                                            <NavLink
                                                to="/register"
                                                onClick={() => setOpenMenu(null)}
                                                className="flex w-full items-center justify-center rounded-xl border-2 border-slate-200 bg-white py-2.5 text-sm font-bold text-slate-800 transition hover:border-[#2f904b] hover:bg-emerald-50/50 hover:text-[#2f904b] focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
                                            >
                                                Đăng ký tài khoản
                                            </NavLink>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>

                    <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-slate-700 shadow-sm transition hover:bg-white hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2f904b]/25 lg:hidden"
                        onClick={clickMenuMobie}
                        aria-label="Mở menu"
                    >
                        <RiMenuFill className="size-[20px]" />
                    </button>
                </div>
            </div>

            <div
                className={`absolute inset-x-0 top-0 z-[200] flex min-h-[3.5rem] items-center justify-center bg-slate-950/96 px-4 backdrop-blur-md transition-transform duration-300 ease-out sm:min-h-[4rem] ${
                    isSearchMobie ? "translate-y-0" : "-translate-y-full pointer-events-none"
                }`}
            >
                <div className="relative w-full max-w-2xl">
                    <Search className={"w-full"} />
                </div>
                <Button
                    className={"!absolute !right-2 !top-1/2 !-translate-y-1/2 !bg-transparent !px-2 !py-1 sm:!right-4"}
                    onClick={() => setIsSearchMobie(false)}
                >
                    <IoCloseSharp className="size-7 text-white sm:size-8" />
                </Button>
            </div>
        </div>
    );
};

export default HeaderBar;
