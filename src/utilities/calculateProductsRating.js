export function calculateProductsRating(ratings) {
  return (
    ratings.reduce((acc, cur) => acc + cur.rating, 0) / ratings.length
  ).toFixed(1);
}
