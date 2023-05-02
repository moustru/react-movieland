export const getRatingClass = (rating: number) => {
  if (rating >= 7) return "rating--good";
  else if (rating >= 5 && rating < 7) return "rating--normal";
  else return "rating--bad";
};
