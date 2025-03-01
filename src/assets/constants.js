export function formatToSpanishDate(isoDate) {
    const date = new Date(isoDate);
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatToColombianMoney(input,noSign=false) {
    if (input === '') return input;
    if (noSign) return parseInt(input, 10).toLocaleString('es-CO');
    else return '$' + parseInt(input, 10).toLocaleString('es-CO');
}

export function formatExpirationDate(dateString) {
    return dateString.slice(0, 2) + "/" + dateString.slice(2);
}

export function formatCreditCardNumber(cardNumber) {
    return cardNumber.replace(/(\d{4})(?=\d)/g, "$1 ");
}