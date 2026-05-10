// src/components/TrustBadges.jsx — v4 vrais PNG officiels
// Uploadez les 5 fichiers dans public/ sur GitHub :
// stripe.png, paypal.png, applepay.png, visa.png, mastercard.png

export default function TrustBadges({ variant = "full", className = "" }) {

  const badges = [
    { id: "stripe",     src: "/stripe.png",     alt: "Stripe",     h: 24 },
    { id: "paypal",     src: "/paypal.png",     alt: "PayPal",     h: 24 },
    { id: "applepay",   src: "/applepay.png",   alt: "Apple Pay",  h: 28 },
    { id: "visa",       src: "/visa.png",       alt: "Visa",       h: 22 },
    { id: "mastercard", src: "/mastercard.png", alt: "Mastercard", h: 32 },
  ];

  const pill = {
    display: "flex", alignItems: "center", justifyContent: "center",
    padding: "8px 16px", background: "#fff",
    border: "1px solid #e5e7eb", borderRadius: 10,
    boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
    minWidth: 72, height: 48,
  };

  if (variant === "minimal") {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", justifyContent:"center", alignItems:"center" }}>
          {badges.map(b => (
            <div key={b.id} style={{ ...pill, padding:"6px 12px", height:38, minWidth:56 }}>
              <img src={b.src} alt={b.alt} style={{ height: b.h * 0.75, objectFit:"contain", display:"block" }} />
            </div>
          ))}
        </div>
        <p style={{ fontSize:11, color:"#9ca3af", margin:0 }}>
          🔒 Paiements cryptés SSL 256-bit
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>

      {/* Bannière sécurité */}
      <div style={{
        display:"flex", alignItems:"center", gap:8,
        background:"#f0fdf4", border:"1px solid #bbf7d0",
        borderRadius:12, padding:"10px 18px",
        color:"#15803d", fontSize:13, fontWeight:500,
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          <polyline points="9 12 11 14 15 10"/>
        </svg>
        Paiement 100% sécurisé · Cryptage SSL 256-bit
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <rect x="3" y="11" width="18" height="11" rx="2"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
        </svg>
      </div>

      {/* Logos */}
      <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", justifyContent:"center" }}>
        {badges.map((b, i) => (
          <div key={b.id} style={{ display:"flex", alignItems:"center", gap:8 }}>
            {/* Séparateur avant cartes bancaires */}
            {b.id === "visa" && (
              <div style={{ width:1, height:28, background:"#e5e7eb" }} />
            )}
            <div style={pill}>
              <img
                src={b.src}
                alt={b.alt}
                style={{ height: b.h, objectFit:"contain", display:"block" }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Garanties */}
      <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", justifyContent:"center", fontSize:12, color:"#6b7280" }}>
        <span>🔒 Données protégées</span>
        <span style={{ color:"#d1d5db" }}>·</span>
        <span>↩️ Résiliation à tout moment</span>
        <span style={{ color:"#d1d5db" }}>·</span>
        <span>🛡️ Certifié PCI DSS</span>
      </div>

    </div>
  );
}
