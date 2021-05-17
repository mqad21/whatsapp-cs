export default {

  padNumber(number: number, width: number) {
    const numberString = number + '';
    return numberString.length >= width ? numberString : new Array(width - numberString.length + 1).join("0") + numberString;
  },

  toRupiah(number: number) {
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    });
    return formatter.format(number);
  }

}