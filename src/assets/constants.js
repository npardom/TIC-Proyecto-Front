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
