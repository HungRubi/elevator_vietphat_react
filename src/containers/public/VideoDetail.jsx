import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import * as actions from '../../store/actions';
import { useParams } from 'react-router-dom';
import { ListVideo, PublicDetailSidebar } from '../../components';
import { Helmet } from 'react-helmet';

const VideoDetail = () => {
    const dispatch = useDispatch();
    const { slug } = useParams();
    const { videoDetail, listVideo, articleSuggest, productNewLast } = useSelector(
        (state) => state.app
    );

    const format = (money) => money?.toLocaleString('vi-VN');

    useEffect(() => {
        if (slug) {
            dispatch(actions.getVideoDetail(slug));
        }
    }, [dispatch, slug]);

    return (
        <>
            <Helmet>
                <title>
                    {videoDetail?.name
                        ? `${videoDetail.name} - Thang máy Việt Phát`
                        : 'Thang máy Việt Phát'}
                </title>
                <meta
                    name="description"
                    content={
                        videoDetail?.subject
                            ? videoDetail.subject.slice(0, 160)
                            : 'Video giới thiệu sản phẩm và dịch vụ Thang máy Việt Phát.'
                    }
                />
                <meta
                    name="keywords"
                    content="video thang máy, hướng dẫn thang máy, Thang máy Việt Phát"
                />
                <meta name="robots" content="index, follow" />
                <link
                    rel="canonical"
                    href={`https://vmu.com.vn/video/${videoDetail?.slug || ''}`}
                />
                <meta property="og:title" content={videoDetail?.name || 'Video - Việt Phát'} />
                <meta property="og:type" content="video.other" />
                <meta
                    property="og:url"
                    content={`https://vmu.com.vn/video/${videoDetail?.slug}`}
                />
                <meta property="og:image" content={videoDetail?.thumbnail} />
            </Helmet>

            <div className="min-h-screen bg-[var(--color-bg)]">
                <header className="border-b border-slate-200/90 bg-gradient-to-r from-slate-900 via-[#0f172a] to-[#0c1f18]">
                    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300/90">
                            Video
                        </p>
                        <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                            {videoDetail?.name}
                        </h1>
                        {videoDetail?.subject ? (
                            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-400">
                                {videoDetail.subject}
                            </p>
                        ) : null}
                    </div>
                </header>

                <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6 lg:flex-row lg:gap-10 lg:py-10">
                    <div className="min-w-0 flex-1 space-y-8">
                        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-black shadow-[0_24px_64px_rgba(2,6,23,0.12)] ring-1 ring-slate-900/20">
                            <div className="aspect-video w-full bg-slate-950">
                                {videoDetail?.video_url ? (
                                    <iframe
                                        className="h-full w-full"
                                        src={videoDetail.video_url}
                                        title={videoDetail?.name}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : null}
                            </div>
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-900 sm:text-xl">
                                Video khác
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">Khám phá thêm nội dung liên quan</p>
                            <ListVideo data={listVideo} />
                        </div>
                    </div>

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

export default VideoDetail;
