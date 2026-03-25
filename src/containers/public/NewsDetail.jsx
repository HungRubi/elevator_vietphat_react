import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as actions from '../../store/actions';
import icons from '../../util/icons';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { PublicDetailSidebar } from '../../components';

const { FaRegCalendarAlt, BsPerson } = icons;

const NewsDetail = () => {
    const dispatch = useDispatch();
    const { articleDetail, articleSuggest, productNewLast } = useSelector((state) => state.app);
    const { slug } = useParams();

    const format = (money) => money?.toLocaleString('vi-VN');

    useEffect(() => {
        if (slug) {
            dispatch(actions.getArticleDetail(slug));
        }
    }, [dispatch, slug]);

    return (
        <>
            <Helmet>
                <title>
                    {articleDetail?.subject
                        ? `${articleDetail.subject} - Thang máy Việt Phát`
                        : 'Thang máy Việt Phát'}
                </title>
                <meta
                    name="description"
                    content={
                        articleDetail?.content
                            ? articleDetail.content.slice(0, 160)
                            : 'Cập nhật bài viết mới nhất về thang máy, công nghệ và dịch vụ tại Thang máy Việt Phát.'
                    }
                />
                <meta
                    name="keywords"
                    content="bài viết thang máy, tin tức thang máy, công nghệ thang máy, Thang máy Việt Phát"
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://vmu.com.vn/news/${articleDetail?.slug || ''}`}
                />
                <meta property="og:title" content={`${articleDetail?.subject} - Thang máy Việt Phát`} />
                <meta property="og:description" content={articleDetail?.content} />
                <meta property="og:type" content="news" />
                <meta
                    property="og:url"
                    content={`https://vmu.com.vn/news/${articleDetail?.slug}`}
                />
                <meta property="og:image" content={articleDetail?.thumbnail} />
            </Helmet>

            <div className="min-h-screen bg-[var(--color-bg)]">
                <header className="border-b border-slate-200/90 bg-[var(--color-surface)]">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-primary)]">
                            Tin tức
                        </p>
                        <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                            {articleDetail?.subject}
                        </h1>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                            <span className="inline-flex items-center gap-2">
                                <BsPerson className="size-4 text-slate-400" aria-hidden />
                                <span className="font-medium text-slate-800">
                                    {articleDetail?.author}
                                </span>
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <FaRegCalendarAlt className="size-4 text-[var(--color-primary)]" aria-hidden />
                                <span>Cập nhật: {articleDetail?.formatedDate}</span>
                            </span>
                        </div>
                    </div>
                </header>

                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:py-10">
                    <article className="min-w-0 flex-1">
                        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] shadow-[0_20px_56px_rgba(2,6,23,0.06)]">
                            <div className="prose prose-slate max-w-none px-5 py-6 sm:px-8 sm:py-8">
                                <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-700">
                                    {articleDetail?.content}
                                </p>
                            </div>
                            {articleDetail?.thumbnail ? (
                                <div className="border-t border-slate-100 bg-slate-50/50 px-5 py-6 sm:px-8">
                                    <img
                                        src={articleDetail.thumbnail}
                                        alt=""
                                        className="mx-auto max-h-[480px] w-full rounded-xl object-contain shadow-sm ring-1 ring-slate-200/80"
                                        data-aos="zoom-in-up"
                                    />
                                </div>
                            ) : null}
                        </div>
                    </article>

                    <PublicDetailSidebar
                        articleSuggest={articleSuggest}
                        productNewLast={productNewLast}
                        formatPrice={format}
                    />
                </div>
            </div>
        </>
    );
};

export default NewsDetail;
