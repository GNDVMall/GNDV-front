export const formatKoreanCurrency = (number) => {
  if (typeof number !== 'number') {
      number = parseInt(number, 10);
  }
  return number.toLocaleString('ko-KR');
}
