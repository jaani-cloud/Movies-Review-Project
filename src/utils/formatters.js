export function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

export function formatGenres(genres) {
    if (!genres || genres.length === 0) return 'N/A';
    return genres.map(g => g.charAt(0).toUpperCase() + g.slice(1)).join(' • ');
}