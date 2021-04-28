export default {

  padNumber(number: number, width: number) {
    const numberString = number + '';
    return numberString.length >= width ? numberString : new Array(width - numberString.length + 1).join("0") + numberString;
  }

}