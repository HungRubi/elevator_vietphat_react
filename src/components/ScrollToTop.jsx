import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Đổi trang (pathname/query): cuộn mượt lên đầu.
 * Có hash trỏ tới id (sau khi DOM trang mới có): cuộn mượt tới phần tử đó.
 */
const ScrollToTop = () => {
    const { pathname, search, hash } = useLocation();

    useLayoutEffect(() => {
        if (hash) {
            const id = hash.replace(/^#/, "");
            const el = id ? document.getElementById(id) : null;
            if (el) {
                requestAnimationFrame(() => {
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                });
                return;
            }
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [pathname, search, hash]);

    return null;
};

export default ScrollToTop;
