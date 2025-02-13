export const PersianDigit = (num: number | string): string => {
  const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return num
    .toString()
    .replace(/\d/g, (digit) => persianNumbers[parseInt(digit, 10)]);
};
console.log(PersianDigit("123456"));
