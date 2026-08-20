import { FileText } from "lucide-react";
import PaintStroke from "@/components/decor/PaintStroke";
import { SchoolScene, OfficeScene, RestaurantScene } from "@/components/decor/SceneSvgs";
import B2BForm from "@/components/B2BForm";

export const metadata = { title: "Bulk & B2B — lattuTop" };

export default function B2BPage() {
  return (
    <section className="lt-section">
      <p className="lt-eyebrow">Bulk & B2B</p>
      <h2 className="lt-section-title">Hand-painted, at scale — for schools, offices and restaurants.</h2>
      <PaintStroke color="#2C3A5C" />
      <p className="lt-lede">
        We supply bulk orders of Kids Dolls and Collectibles for classrooms, corporate gifting, hotel and
        restaurant decor, and festival hampers — with volume pricing and custom finishing on request.
      </p>

      <div className="lt-scene-grid">
        <div className="lt-scene-card">
          <SchoolScene />
          <h4>Schools</h4>
          <p>Kids Dolls and story cards for classrooms and preschools — a hands-on way to teach culture alongside the curriculum.</p>
        </div>
        <div className="lt-scene-card">
          <OfficeScene />
          <h4>Offices</h4>
          <p>
            Channapatna-style collectibles for clients and dignitaries — a keepsake that makes you memorable —
            plus branded swag and giveaways for conferences and events.
          </p>
          <a
            href="/downloads/lattutop-corporate-pitch.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="lt-scene-link"
          >
            <FileText size={14} /> View our corporate catalog (PDF)
          </a>
        </div>
        <div className="lt-scene-card">
          <RestaurantScene />
          <h4>Restaurants</h4>
          <p>
            Not off a shelf — a character designed for your restaurant, built around your design, region and
            cuisine. Placed at the host stand or entrance, it sets the tone before a guest sees the menu.
          </p>
          <a
            href="/downloads/lattutop-restaurant-lookbook.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="lt-scene-link"
          >
            <FileText size={14} /> View our restaurant lookbook (PDF)
          </a>
        </div>
      </div>

      <div className="lt-b2b-grid">
        <div className="lt-b2b-info">
          <div className="lt-info-card">
            <h4>Volume pricing</h4>
            <p>Tiered discounts starting at 25 units, with deeper pricing above 100 and 500 units.</p>
          </div>
          <div className="lt-info-card">
            <h4>Customisation</h4>
            <p>Logo tags, custom colourways, or a themed set built around your brand or curriculum.</p>
          </div>
          <div className="lt-info-card">
            <h4>Who we work with</h4>
            <p>Schools & preschools, corporate gifting teams, restaurants & hospitality decor, event organisers.</p>
          </div>
          <div className="lt-info-card">
            <h4>Response time</h4>
            <p>Our team replies within 2 business days with a quote and sample options.</p>
          </div>
        </div>

        <div className="lt-b2b-form-wrap">
          <B2BForm />
        </div>
      </div>
    </section>
  );
}
