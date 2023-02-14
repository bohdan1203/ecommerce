export function getNumberFromPriceString(price) {
  if (price) {
    price = price.replace("$", "");

    if (price.includes(",")) {
      price = price.replaceAll(",", "");
    }

    return Number(price);
  }
}
