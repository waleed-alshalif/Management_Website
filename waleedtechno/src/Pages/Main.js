import "../Styles/Home.css";
export default function Main() {
  return (
    <main className="articles-section">
      <div className="article-content">
        <div className="text-section">
          <h2>Welcome to WaleedTechno Company</h2>
          <p>
            WaleedTechno Company is a forward-thinking technology firm
            specializing in innovative digital solutions and cutting-edge
            software development. We simplify technology for businesses and
            drive growth in the digital age.
          </p>
          {/* <p>
            From web development to AI solutions, we offer reliable services
            with a focus on quality and innovation. Our goal is to empower
            businesses with smart, effective tools.
          </p> */}
          <p>
            Join us as we shape the future through technology, one solution at a
            time.
          </p>
        </div>

        <div className="image-section">
          <img src={require("../img/Home.png")} alt="Techno" />
        </div>
      </div>
    </main>
  );
}
