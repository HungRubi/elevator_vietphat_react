export const formatMoney = (money) => {
    return money?.toLocaleString('vi-VN')
}

export const convertToWords = (num) => {
    if (!num || num === 0) return 'không đồng';

    const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
    const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
    const hundreds = ['', 'một trăm', 'hai trăm', 'ba trăm', 'bốn trăm', 'năm trăm', 'sáu trăm', 'bảy trăm', 'tám trăm', 'chín trăm'];

    const convertThreeDigits = (n) => {
        if (n === 0) return '';
        const h = Math.floor(n / 100);
        const t = Math.floor((n % 100) / 10);
        const o = n % 10;
        return `${hundreds[h]} ${tens[t]} ${ones[o]}`.trim();
    };

    let result = '';
    const billion = Math.floor(num / 1000000000);
    const million = Math.floor((num % 1000000000) / 1000000);
    const thousand = Math.floor((num % 1000000) / 1000);
    const rest = num % 1000;

    if (billion > 0) result += `${convertThreeDigits(billion)} tỷ `;
    if (million > 0) result += `${convertThreeDigits(million)} triệu `;
    if (thousand > 0) result += `${convertThreeDigits(thousand)} nghìn `;
    if (rest > 0) result += convertThreeDigits(rest);

    return `${result.trim()} đồng`;
};