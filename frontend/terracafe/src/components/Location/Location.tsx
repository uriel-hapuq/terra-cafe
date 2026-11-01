import "./Location.css";

function Location() {
  return (
    <section id="location-section" className="location-section">
      <h2>Onde estamos?</h2>
      <div className="location-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3857.497736397557!2d-39.170965900000006!3d-14.797297499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x739a81973d288af%3A0xf7d03a1faf9750ae!2zVGVjbm9KciAtIEFzc29jaWHDp8OjbyBFbXByZXNhIErDum5pb3IgZGUgQ29tcHV0YcOnw6Nv!5e0!3m2!1spt-BR!2sbr!4v1793292027538!5m2!1spt-BR!2sbr"
          width="600"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
}

export default Location;
