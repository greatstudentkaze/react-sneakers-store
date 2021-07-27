export const formatRuPrice = (price: number): string =>
  price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ').concat(' руб.');
