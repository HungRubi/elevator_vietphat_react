/**
 * Tồn kho chuẩn API products: `warehouseStock` (0 nếu chưa có dòng kho), hoặc `warehouse.stock`, legacy `stock`.
 * @returns {number | null} null = không có số liệu trên object (chưa fetch / schema cũ).
 */
export function getWarehouseStockNumber(product) {
    if (!product || typeof product !== "object") return null;
    if (product.warehouseStock != null && product.warehouseStock !== "") {
        const n = Number(product.warehouseStock);
        if (!Number.isNaN(n)) return n;
    }
    if (product.warehouse != null && typeof product.warehouse === "object" && product.warehouse.stock != null) {
        const n = Number(product.warehouse.stock);
        if (!Number.isNaN(n)) return n;
    }
    if (product.stock != null && product.stock !== "") {
        const n = Number(product.stock);
        if (!Number.isNaN(n)) return n;
    }
    return null;
}

export function isProductOutOfStock(product) {
    const n = getWarehouseStockNumber(product);
    return n !== null && n <= 0;
}
