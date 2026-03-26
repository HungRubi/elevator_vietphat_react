import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { FiTruck } from "react-icons/fi";
import { formatMoney, convertToWords } from "../util/formatMoney";
import Button from "./Button";
import ModalQuestion from "./ModalQuestion";
import ModelContact from "./ModelContact";
import { toast } from "react-toastify";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { loadFile } from "../util/loadFile";
import { useSelector } from "react-redux";
import icons from "../util/icons";

const { RiBillLine, FaRegCalendarAlt, FaCaretDown } = icons;

function StatusBadge({ status, compact }) {
    const map = {
        "Đang xử lý": "bg-amber-100 text-amber-900 ring-amber-200",
        "Đang giao hàng": "bg-sky-100 text-sky-900 ring-sky-200",
        "Thành công": "bg-emerald-100 text-emerald-900 ring-emerald-200",
        "Thất bại": "bg-rose-50 text-rose-800 ring-rose-200",
    };
    const cls = map[status] || "bg-slate-100 text-slate-800 ring-slate-200";
    const pad = compact ? "px-2.5 py-1 text-[10px]" : "px-4 py-1.5 text-xs";
    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full font-bold uppercase tracking-wide ring-1 ${pad} ${cls}`}
        >
            <FiTruck className={`shrink-0 opacity-80 ${compact ? "size-3" : "size-3.5"}`} aria-hidden />
            {status}
        </span>
    );
}

StatusBadge.propTypes = {
    status: PropTypes.string,
    compact: PropTypes.bool,
};

function shippingSum(order) {
    return order?.orderDetails?.reduce((acc, d) => acc + (d.product?.shipping_cost || 0), 0) || 0;
}

const ListOrder = ({ orders, hanleCanCelOrder, handleBuyAgain }) => {
    const { currentUser } = useSelector((state) => state.user);

    const buttonContact = () => {
        toast.success("Vui lòng liên hệ qua hotline hoặc trang Liên hệ để được hỗ trợ.");
    };

    const handleExportInvoice = async (item) => {
        try {
            const template = await loadFile("/template_order.docx");
            const zip = new PizZip(template);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });

            const today = new Date();
            const data = {
                order_code: item?.order_code || "",
                name: currentUser?.name || "",
                phone: currentUser?.phone || "",
                address: currentUser?.address || "",
                p: item?.orderDetails?.map((line, index) => {
                    const pr = line?.product;
                    const qty = line?.quantity || 0;
                    const price = Number(pr?.price) || 0;
                    return {
                        no: index + 1,
                        productName: pr?.name || "",
                        unit: pr?.unit || "",
                        quantity: qty,
                        price: formatMoney(price) || "0",
                        purchers: formatMoney(price * qty) || "0",
                        shipping: formatMoney(pr?.shipping_cost) || 0,
                    };
                }),
                shipping:
                    item?.orderDetails?.reduce((acc, line) => acc + (line?.product?.shipping_cost || 0), 0) || 0,
                vat: "10%",
                discount: formatMoney(item?.discount_id?.value_discount) || 0,
                totalPrice: formatMoney(item.total_price) || "0",
                stringPrice: convertToWords(item.total_price) || "không đồng",
                date: today.getDate(),
                month: today.getMonth() + 1,
            };

            doc.render(data);
            const out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            });
            saveAs(out, `HoaDon_${Date.now()}.docx`);
        } catch (error) {
            console.error("Error generating invoice:", error);
            toast.error("Có lỗi khi tạo hóa đơn. Vui lòng thử lại.");
        }
    };

    const btnGhost =
        "!rounded-xl !border !border-slate-200 !bg-white !normal-case !font-bold !text-slate-700 hover:!border-[#2f904b] hover:!text-[#2f904b]";
    const btnPrimary = "!rounded-xl !normal-case !font-bold";

    if (!orders?.length) {
        return (
            <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white py-12 text-center shadow-sm">
                <div className="mx-auto flex size-14 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                    <RiBillLine className="size-8" aria-hidden />
                </div>
                <p className="mt-5 text-base font-bold text-slate-800">Chưa có đơn hàng trong mục này</p>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                    Khi bạn đặt hàng, chi tiết sẽ hiển thị đầy đủ tại đây — thu gọn dạng accordion để danh sách không kéo dài vô tận.
                </p>
                <NavLink to="/products" className="mt-6 inline-block">
                    <Button className={btnPrimary}>Mua sắm ngay</Button>
                </NavLink>
            </div>
        );
    }

    return (
        <div className="mt-4 space-y-4">
            <p className="text-center text-xs text-slate-500 md:text-left">
                <span className="font-semibold text-slate-700">Gợi ý:</span> nhấn vào một hàng để mở bảng chi tiết — có thể mở nhiều đơn cùng lúc.
            </p>
            {orders.map((item) => {
                const lines = item?.orderDetails || [];
                const ship = shippingSum(item);
                const discountVal = item?.discount_id?.value_discount;
                const code = item.order_code || `Đơn #${String(item._id).slice(-8).toUpperCase()}`;
                const previewNames = lines
                    .slice(0, 2)
                    .map((d) => d.product?.name)
                    .filter(Boolean)
                    .join(" · ");
                const more = lines.length > 2 ? ` · +${lines.length - 2} mặt hàng` : "";

                return (
                    <details
                        key={item._id}
                        className="group rounded-lg border border-slate-200/90 bg-white shadow-sm transition open:shadow-md"
                    >
                        <summary className="flex cursor-pointer list-none flex-col gap-3 border-b border-slate-100/80 px-3 py-3 transition [list-style:none] marker:content-none sm:px-4 sm:py-3.5 md:flex-row md:items-center md:justify-between md:gap-5 md:px-4 md:py-4 [&::-webkit-details-marker]:hidden">
                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mã đơn</p>
                                    <StatusBadge status={item.status} compact />
                                </div>
                                <p className="mt-1 font-mono text-base font-extrabold text-slate-900 md:text-lg">{code}</p>
                                <p className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
                                    <FaRegCalendarAlt className="size-3.5 text-[#2f904b]" aria-hidden />
                                    {item.createdAtFormatted || "—"}
                                </p>
                                {lines.length > 0 && (
                                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 md:text-sm">
                                        <span className="font-semibold text-slate-700">{lines.length} mặt hàng:</span> {previewNames}
                                        {more}
                                    </p>
                                )}
                            </div>
                            <div className="flex shrink-0 flex-row items-center justify-between gap-4 md:flex-col md:items-end md:justify-center">
                                <div className="text-left md:text-right">
                                    <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Tổng thanh toán</p>
                                    <p className="text-xl font-black tabular-nums text-[#2f904b] md:text-2xl">
                                        {formatMoney(item.total_price)}đ
                                    </p>
                                </div>
                                <span className="flex items-center gap-1 text-xs font-bold text-slate-500 md:text-sm">
                                    Chi tiết
                                    <FaCaretDown
                                        className="size-4 shrink-0 transition duration-200 group-open:rotate-180"
                                        aria-hidden
                                    />
                                </span>
                            </div>
                        </summary>

                        <div className="border-t border-slate-100 bg-slate-50/40">
                            <div className="overflow-x-auto px-2 py-3 sm:px-3 md:py-4">
                                <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left text-sm">
                                    <thead>
                                        <tr className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                            <th className="bg-slate-100 px-2 py-2.5 pl-3 text-left sm:px-3 sm:py-3 sm:pl-4">Sản phẩm</th>
                                            <th className="bg-slate-100 px-2 py-2.5 text-center sm:px-3 sm:py-3">Đơn giá</th>
                                            <th className="bg-slate-100 px-2 py-2.5 text-center sm:px-3 sm:py-3">SL</th>
                                            <th className="bg-slate-100 px-2 py-2.5 pr-3 text-right sm:px-3 sm:py-3 sm:pr-4">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-800">
                                        {lines.map((row, index) => {
                                            const p = row?.product;
                                            const qty = Number(row?.quantity) || 0;
                                            const price = Number(p?.price) || 0;
                                            const lineTotal = qty * price;
                                            const thumb = p?.thumbnail_main;
                                            const slug = p?.slug;
                                            const name = p?.name || "Sản phẩm (không còn dữ liệu)";
                                            return (
                                                <tr key={p?._id ?? index} className="border-b border-slate-100 last:border-0">
                                                    <td className="px-2 py-3 pl-3 align-middle sm:px-3 sm:py-4 sm:pl-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="size-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                                                                {thumb ? (
                                                                    <img
                                                                        src={thumb}
                                                                        alt=""
                                                                        className="size-full object-cover"
                                                                    />
                                                                ) : (
                                                                    <div className="flex size-full items-center justify-center bg-slate-100 text-[10px] font-medium text-slate-400">
                                                                        —
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                {slug ? (
                                                                    <NavLink
                                                                        to={`/products/detail/${slug}`}
                                                                        className="font-bold text-slate-900 hover:text-[#2f904b]"
                                                                    >
                                                                        {name}
                                                                    </NavLink>
                                                                ) : (
                                                                    <span className="font-bold text-slate-700">{name}</span>
                                                                )}
                                                                {p?.unit ? (
                                                                    <p className="mt-0.5 text-xs text-slate-500">Đơn vị: {p.unit}</p>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-2 py-3 text-center align-middle tabular-nums text-slate-700 sm:px-3 sm:py-4">
                                                        {formatMoney(price)}đ
                                                    </td>
                                                    <td className="px-2 py-3 text-center align-middle font-semibold sm:px-3 sm:py-4">{qty}</td>
                                                    <td className="px-2 py-3 pr-3 text-right align-middle text-base font-extrabold tabular-nums text-[#2f904b] sm:px-3 sm:py-4 sm:pr-4">
                                                        {formatMoney(lineTotal)}đ
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="space-y-1 border-t border-slate-200/80 bg-white px-3 py-3 text-sm sm:px-4">
                                {ship > 0 && (
                                    <div className="flex justify-between text-slate-600">
                                        <span>Phí vận chuyển (ước tính theo dòng hàng)</span>
                                        <span className="font-semibold tabular-nums">{formatMoney(ship)}đ</span>
                                    </div>
                                )}
                                {(discountVal ?? 0) > 0 && (
                                    <div className="flex justify-between text-emerald-800">
                                        <span>Giảm giá / voucher</span>
                                        <span className="font-bold tabular-nums">−{formatMoney(discountVal)}đ</span>
                                    </div>
                                )}
                                <div className="flex justify-between border-t border-dashed border-slate-200 pt-3 text-base font-black text-slate-900">
                                    <span>Tổng cộng</span>
                                    <span className="tabular-nums text-[#2f904b]">{formatMoney(item.total_price)}đ</span>
                                </div>
                            </div>

                            <div className="border-t border-slate-100 bg-gradient-to-b from-emerald-50/30 to-white px-3 py-4 sm:px-4 sm:py-5">
                                <p className="max-w-3xl text-sm leading-relaxed text-slate-600">
                                    Đơn được xử lý theo hàng đợi. Giữ máy khi trạng thái &quot;Đang giao hàng&quot; — bộ phận giao hàng có thể
                                    liên hệ xác nhận.
                                </p>
                                <div className="mt-5 flex flex-wrap gap-2 md:gap-3">
                                    <Button type="button" onClick={buttonContact} className={`${btnPrimary} !px-5`}>
                                        Liên hệ hỗ trợ
                                    </Button>
                                    {item.status === "Đang xử lý" && (
                                        <>
                                            <Button
                                                type="button"
                                                onClick={() => handleExportInvoice(item)}
                                                className={`${btnGhost} !px-5`}
                                            >
                                                Xuất hóa đơn
                                            </Button>
                                            <Button type="button" onClick={hanleCanCelOrder(item._id)} className={`${btnGhost} !px-5`}>
                                                Hủy đơn
                                            </Button>
                                        </>
                                    )}
                                    {item.status === "Thất bại" && (
                                        <Button type="button" onClick={() => handleBuyAgain(item)} className={`${btnPrimary} !px-5`}>
                                            Mua lại
                                        </Button>
                                    )}
                                    {item.status === "Thành công" && (
                                        <>
                                            <Button
                                                type="button"
                                                onClick={() => handleExportInvoice(item)}
                                                className={`${btnGhost} !px-5`}
                                            >
                                                Xuất hóa đơn
                                            </Button>
                                            <ModalQuestion
                                                products={item.orderDetails?.map((d) => d?.product).filter(Boolean)}
                                            />
                                            <ModelContact />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </details>
                );
            })}
        </div>
    );
};

ListOrder.propTypes = {
    orders: PropTypes.array.isRequired,
    hanleCanCelOrder: PropTypes.func.isRequired,
    handleBuyAgain: PropTypes.func.isRequired,
};

export default ListOrder;
