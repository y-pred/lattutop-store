export function inr(n) {
  return "₹" + Number(n || 0).toLocaleString("en-IN");
}

export function formatDate(dateString) {
  if (!dateString) return "";
  return new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
