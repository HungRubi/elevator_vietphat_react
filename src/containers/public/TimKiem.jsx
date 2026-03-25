import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { ListArticle, ListVideo, ProductsAll } from '../../components';
import icons from '../../util/icons';

const { FiSearch } = icons;

const TABS = ['Tất cả', 'Sản phẩm', 'Bài viết', 'Video'];

function SectionCard({ title, subtitle, children }) {
    return (
        <section className="rounded-2xl border border-slate-200/90 bg-[var(--color-surface)] p-5 shadow-[0_16px_48px_rgba(2,6,23,0.05)] sm:p-6">
            <div className="mb-5 flex flex-col gap-1 border-b border-slate-100 pb-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                        {title}
                    </h2>
                    {subtitle ? (
                        <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>
                    ) : null}
                </div>
            </div>
            {children}
        </section>
    );
}

const TimKiem = () => {
    const { productSearch, articleSearch, videoSearch } = useSelector((state) => state.app);
    const [tab, setTab] = useState(0);

    return (
        <>
            <Helmet>
                <title>Kết quả tìm kiếm - Thang máy Việt Phát</title>
                <meta name="robots" content="noindex, follow" />
            </Helmet>

            <div className="min-h-screen bg-[var(--color-bg)]">
                <header className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#0c1f18]">
                    <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-[var(--color-primary)]/20 blur-3xl" />
                    <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
                        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300/90">
                            <FiSearch className="size-4" aria-hidden />
                            Tìm kiếm
                        </p>
                        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Kết quả cho bạn
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
                            Lọc theo loại nội dung — sản phẩm, bài viết hoặc video — để tìm đúng điều bạn cần.
                        </p>

                        <div
                            className="mt-8 flex flex-wrap gap-2"
                            role="tablist"
                            aria-label="Lọc kết quả"
                        >
                            {TABS.map((label, i) => (
                                <button
                                    key={label}
                                    type="button"
                                    role="tab"
                                    aria-selected={tab === i}
                                    onClick={() => setTab(i)}
                                    className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                                        tab === i
                                            ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-emerald-900/30'
                                            : 'border border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
                                    }`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 sm:py-12">
                    {tab === 0 && (
                        <>
                            <SectionCard
                                title="Sản phẩm"
                                subtitle="Gợi ý mua sắm khớp từ khóa"
                            >
                                <ProductsAll data={productSearch} />
                            </SectionCard>
                            <SectionCard
                                title="Bài viết"
                                subtitle="Tin tức và kiến thức thang máy"
                            >
                                <ListArticle
                                    currentArticle={articleSearch}
                                    className="!bg-transparent !p-0"
                                    isPageBar="hidden"
                                />
                            </SectionCard>
                            <SectionCard title="Video" subtitle="Hướng dẫn và giới thiệu">
                                <ListVideo data={videoSearch} />
                            </SectionCard>
                        </>
                    )}
                    {tab === 1 && (
                        <SectionCard title="Sản phẩm" subtitle="Danh sách sản phẩm tìm được">
                            <ProductsAll data={productSearch} />
                        </SectionCard>
                    )}
                    {tab === 2 && (
                        <SectionCard title="Bài viết" subtitle="Bài viết liên quan">
                            <ListArticle
                                currentArticle={articleSearch}
                                className="!bg-transparent !p-0"
                                isPageBar="hidden"
                            />
                        </SectionCard>
                    )}
                    {tab === 3 && (
                        <SectionCard title="Video" subtitle="Video liên quan">
                            <ListVideo data={videoSearch} />
                        </SectionCard>
                    )}
                </div>
            </div>
        </>
    );
};

export default TimKiem;
