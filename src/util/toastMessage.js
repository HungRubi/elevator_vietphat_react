/**
 * Chuẩn hóa nội dung hiển thị toast từ message Redux (string | object | axios shape).
 */
export function formatReduxMessage(payload) {
    if (payload == null) return '';
    if (typeof payload === 'string') return payload;
    if (typeof payload === 'object') {
        if (typeof payload.message === 'string') return payload.message;
        if (payload.data != null && typeof payload.data === 'object') {
            if (typeof payload.data.message === 'string') return payload.data.message;
        }
    }
    return '';
}

const ERROR_HINT =
    /thất bại|lỗi|không thành công|không thể|sai|fail|error|invalid|unauthor|denied|từ chối|hết hạn/i;

/** Heuristic: một số API chỉ trả message qua Redux `message` mà không set loginError */
export function messageLooksLikeError(text) {
    if (!text || typeof text !== 'string') return false;
    return ERROR_HINT.test(text);
}
