export function inr(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}
