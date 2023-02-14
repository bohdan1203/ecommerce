export function getPriceStringFromNumber(price) {
  if (price) {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
}
