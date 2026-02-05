
export default function OverviewCard({ title, value, sub, subText, positive, icon }) {


  return (
    <div className="overview-card">
      <div className="card-top">
        <span className="card-title">{title}</span>
        <span className="material-symbols-outlined card-icon">
          {icon}
        </span>
      </div>

      <h3 className={positive ? "positive" : ""}>&#x20b9;{value}</h3>

      <div className="card-sub">
        {sub && (
          <span className={`sub-value ${positive ? "positive" : ""}`}>
            ↑ {sub}
          </span>
        )}
        <span className="sub-text">{subText}</span>
      </div>
    </div>
  );
}