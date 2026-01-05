export function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((sum, review) => {
        return sum + review.rating;
    }, 0);

    return (totalRating / reviews.length).toFixed(1);
}

export function calculateRatingPercentages(reviews) {
    if (!reviews || reviews.length === 0) {
        return { skip: 0, timePass: 0, goForIt: 0 };
    }

    const skip = reviews.filter(r => r.type === "Skip").length;
    const timePass = reviews.filter(r => r.type === "Time Pass").length;
    const goForIt = reviews.filter(r => r.type === "Go For It").length;

    const total = reviews.length;

    return {
        skip: ((skip / total) * 100).toFixed(1),
        timePass: ((timePass / total) * 100).toFixed(1),
        goForIt: ((goForIt / total) * 100).toFixed(1)
    };
}