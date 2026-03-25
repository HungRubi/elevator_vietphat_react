/**
 * Chuẩn hóa thời gian bài viết để sắp xếp mới → cũ.
 * Hỗ trợ: ISO từ API, dateFormat dạng dd/mm/yyyy.
 */
export function getArticleTimestamp(item) {
    if (!item || typeof item !== "object") return 0;
    if (item.createdAt) {
        const t = new Date(item.createdAt).getTime();
        if (!Number.isNaN(t)) return t;
    }
    if (item.updatedAt) {
        const t = new Date(item.updatedAt).getTime();
        if (!Number.isNaN(t)) return t;
    }
    if (item.dateFormat && typeof item.dateFormat === "string") {
        const m = item.dateFormat.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
        if (m) {
            const d = Number(m[1]);
            const mo = Number(m[2]) - 1;
            const y = Number(m[3]);
            const t = new Date(y, mo, d).getTime();
            if (!Number.isNaN(t)) return t;
        }
        const parsed = Date.parse(item.dateFormat);
        if (!Number.isNaN(parsed)) return parsed;
    }
    return 0;
}

export function sortArticlesNewestFirst(list) {
    if (!Array.isArray(list) || list.length === 0) return [];
    return [...list].sort((a, b) => getArticleTimestamp(b) - getArticleTimestamp(a));
}
