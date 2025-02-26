export function formatToSpanishDate(isoDate) {
    const date = new Date(isoDate);
    const month = date.toLocaleString('es-ES', { month: 'long' });
    return `${month.charAt(0).toUpperCase() + month.slice(1)} ${date.getDate()}, ${date.getFullYear()}`;
}

export function formatToColombianMoney(input) {
    return '$' + parseInt(input, 10).toLocaleString('es-CO');
}
