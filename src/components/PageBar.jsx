import icons from '../util/icons';
import PropTypes from 'prop-types';

const { AiOutlineLeft, AiOutlineRight } = icons;

const PageBar = ({ currentPage, totalPage, onPageChange, className }) => {
    const getVisiblePages = () => {
        const maxVisible = 3;
        let startPage = 1;
        let endPage = Math.min(totalPage, maxVisible);

        if (totalPage > maxVisible) {
            const middle = Math.floor(maxVisible / 2);

            if (currentPage <= middle) {
                startPage = 1;
                endPage = maxVisible;
            } else if (currentPage >= totalPage - middle) {
                startPage = totalPage - maxVisible + 1;
                endPage = totalPage;
            } else {
                startPage = currentPage - middle;
                endPage = currentPage + middle;
            }
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const visiblePages = getVisiblePages();
    const safeTotal = Math.max(1, totalPage);

    const pageBtnBase =
        "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#2f904b]/25";
    const pageBtn =
        `${pageBtnBase} border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50`;
    const pageBtnActive = `${pageBtnBase} border-[#2f904b] bg-[#2f904b] text-white hover:border-[#268a42] hover:bg-[#268a42] hover:text-white`;

    return (
        <nav
            className={`mt-10 flex flex-wrap items-center justify-center gap-2 ${className || ''}`}
            aria-label="Phân trang"
        >
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`${pageBtn} disabled:cursor-not-allowed disabled:opacity-40`}
                aria-label="Trang trước"
            >
                <AiOutlineLeft className="text-sm" />
            </button>

            {visiblePages[0] > 1 && (
                <>
                    <button type="button" onClick={() => onPageChange(1)} className={pageBtn}>
                        1
                    </button>
                    {visiblePages[0] > 2 && <span className="px-1 text-slate-400">…</span>}
                </>
            )}

            {visiblePages.map((page) => (
                <button
                    key={page}
                    type="button"
                    onClick={() => onPageChange(page)}
                    className={currentPage === page ? pageBtnActive : pageBtn}
                    aria-current={currentPage === page ? 'page' : undefined}
                >
                    {page}
                </button>
            ))}

            {visiblePages[visiblePages.length - 1] < safeTotal && (
                <>
                    {visiblePages[visiblePages.length - 1] < safeTotal - 1 && (
                        <span className="px-1 text-slate-400">…</span>
                    )}
                    <button type="button" onClick={() => onPageChange(safeTotal)} className={pageBtn}>
                        {safeTotal}
                    </button>
                </>
            )}

            <button
                type="button"
                disabled={currentPage === safeTotal}
                onClick={() => onPageChange(currentPage + 1)}
                className={`${pageBtn} disabled:cursor-not-allowed disabled:opacity-40`}
                aria-label="Trang sau"
            >
                <AiOutlineRight className="text-sm" />
            </button>

            <span className="ml-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600">
                Trang {currentPage} / {safeTotal}
            </span>
        </nav>
    );
};

PageBar.propTypes = {
    className: PropTypes.string,
    currentPage: PropTypes.number.isRequired,
    totalPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PageBar;
