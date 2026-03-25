import { NavLink } from 'react-router-dom';
import { Button, PageBar } from './index';
import PropTypes from 'prop-types';
import icons from '../util/icons';

const { FaRegCalendarAlt, BsPerson } = icons;

const ListArticle = ({
    current,
    totalPage,
    setCurrent,
    currentArticle,
    className = '',
    isPageBar,
}) => {
    const hideBar = isPageBar === 'hidden';

    return (
        <div className={`${className}`}>
            {currentArticle?.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {currentArticle.map((article) => (
                        <li key={article._id} data-aos="fade-up">
                            <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition hover:border-[var(--color-primary)]/25 hover:shadow-md">
                                <NavLink
                                    to={`/news/detail/${article.slug}`}
                                    className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100"
                                >
                                    <img
                                        src={article.thumbnail}
                                        alt=""
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 transition group-hover:opacity-100" />
                                </NavLink>
                                <div className="flex flex-1 flex-col p-4 sm:p-5">
                                    <NavLink
                                        to={`/news/detail/${article.slug}`}
                                        className="line-clamp-2 text-base font-bold leading-snug text-slate-900 transition group-hover:text-[var(--color-primary)] sm:text-lg"
                                    >
                                        {article.subject}
                                    </NavLink>
                                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                                        <span className="inline-flex items-center gap-1">
                                            <BsPerson className="size-3.5" aria-hidden />
                                            {article.author}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <FaRegCalendarAlt className="size-3.5" aria-hidden />
                                            {article.dateFormat}
                                        </span>
                                    </div>
                                    <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-600">
                                        {article.content}
                                    </p>
                                    <div className="mt-4">
                                        <NavLink to={`/news/detail/${article.slug}`}>
                                            <Button
                                                type="button"
                                                className="!rounded-xl !border !border-[var(--color-primary)]/40 !bg-[var(--color-primary)]/5 !px-4 !py-2 !text-xs !font-bold !normal-case !text-[var(--color-primary)] hover:!bg-[var(--color-primary)]/10"
                                            >
                                                Đọc thêm
                                            </Button>
                                        </NavLink>
                                    </div>
                                </div>
                            </article>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 py-16">
                    <img src="/img/empty_article.png" alt="" className="w-48 opacity-60" />
                    <p className="text-sm font-medium text-slate-500">Chưa có bài viết phù hợp</p>
                </div>
            )}
            {!hideBar && setCurrent && totalPage ? (
                <PageBar
                    className={isPageBar || ''}
                    currentPage={current}
                    totalPage={totalPage}
                    onPageChange={setCurrent}
                />
            ) : null}
        </div>
    );
};

ListArticle.propTypes = {
    isPageBar: PropTypes.string,
    current: PropTypes.number,
    className: PropTypes.string,
    totalPage: PropTypes.number,
    setCurrent: PropTypes.func,
    currentArticle: PropTypes.array,
};

export default ListArticle;
