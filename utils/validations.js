export function lowerCase(text) {
    return text
        .replaceAll('Ç', 'c')
        .replaceAll('ç', 'c')
        .replaceAll('ğ', 'g')
        .replaceAll('Ğ', 'G')
        .replaceAll('İ', 'i')
        .replaceAll('ı', 'i')
        .replaceAll('ö', 'o')
        .replaceAll('Ö', 'o')
        .replaceAll('Ş', 's')
        .replaceAll('ş', 's')
        .replaceAll('Ü', 'U')
        .replaceAll('ü', 'u')
        .toLowerCase();
}