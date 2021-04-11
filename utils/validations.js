export function lowerCase(text) {
    return text.replaceAll('Ğ', 'G')
        .replaceAll('Ü', 'I')
        .replaceAll('Ş', 's')
        .replaceAll('İ', 'i')
        .replaceAll('Ö', 'o')
        .replaceAll('Ç', 'c')
        .replaceAll('ğ', 'g')
        .replaceAll('ü', 'u')
        .replaceAll('ş', 's')
        .replaceAll('ı', 'i')
        .replaceAll('ö', 'o')
        .replaceAll('ç', 'c')
        .toLowerCase();
}