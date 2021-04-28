import numberHelpers from "./number_helpers";

export default {
  getTime(timestamp: number) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return numberHelpers.padNumber(hours, 2) + ":" + numberHelpers.padNumber(minutes, 2);
  }
}


