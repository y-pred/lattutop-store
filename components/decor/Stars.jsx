import { Star } from "lucide-react";

export default function Stars({ n = 5 }) {
  return (
    <div className="lt-stars">
      {Array.from({ length: n }).map((_, i) => (
        <Star key={i} size={13} fill="#D9A023" stroke="#D9A023" />
      ))}
    </div>
  );
}
