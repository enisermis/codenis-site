// App.js - EmailJS ile tam çalışır hal + Oyun Resimleri
import { useEffect, useState } from "react";
import emailjs from '@emailjs/browser';
import "./App.css";

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  // Oyun verileri - resimler ve isimler (emoji yok, gradient sınıfları)
  const games = [
    { name: "Bouncy Soccer", image: "/gameImages/soccer.png" },
    { name: "Car Chase", image: "/gameImages/chase.png" },
    { name: "Space War.io", image: "/gameImages/space.png" },
    { name: "Kim milyoner olmak ister?", image: "/gameImages/milyoner.png" },
    { name: "Wild West Duel", image: "/gameImages/west.png" },
    { name: "Dungeon Jump", image: "/gameImages/dungeon.png" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccess(false);
    setError(false);

    try {
      await emailjs.send(
        "service_sk27bif",
        "template_n696d3u", 
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          reply_to: formData.email
        },
        "BC_pyS1c64lrCclmr"
      );

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error("Gönderme hatası:", error);
      setError(true);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="App">
      {/* Ana Başlık */}
      <header className={`hero ${scrolled ? "scrolled" : ""}`}>
        <h1>CODENIS</h1>
      </header>

      {/* İstatistikler */}
      <section className="stats">
        <div className="stat-card">
          <h2>7K+</h2>
          <p>Aktif Oyuncu</p>
        </div>
        <div className="stat-card">
          <h2>6</h2>
          <p>Yayınlanan Oyun</p>
        </div>
        <div className="stat-card">
          <h2>20K+</h2>
          <p>Toplam İndirme</p>
        </div>
      </section>

      {/* Yıldız Değerlendirme Paneli */}
      <section className="rating-panel">
        <div className="rating-content">
          <div className="rating-stars">
            <div className="star-container">
              <div className="star-background">★</div>
              <div className="star-filled">★</div>
            </div>
            <div className="star-container">
              <div className="star-background">★</div>
              <div className="star-filled">★</div>
            </div>
            <div className="star-container">
              <div className="star-background">★</div>
              <div className="star-filled">★</div>
            </div>
            <div className="star-container">
              <div className="star-background">★</div>
              <div className="star-filled">★</div>
            </div>
            <div className="star-container">
              <div className="star-background">★</div>
              <div className="star-filled">★</div>
            </div>
          </div>
          <div className="rating-info">
            <h3>4.1/5.0</h3>
            <p>Google Play Store Değerlendirmesi</p>
          </div>
          <div className="rating-badge">
            <span>MÜKEMMEL</span>
          </div>
        </div>
      </section>

      {/* Oyunlar Başlığı */}
      <section className="games-section">
        <h2>Oyunlarımız</h2>
      </section>

      {/* Oyun Kutuları - BÜYÜK RESİMLİ ve DİKEY */}
      <section className="games">
        {games.map((game, index) => (
          <div key={index} className="game-card">
            <div className="game-image-container">
              <img 
                src={game.image} 
                alt={game.name}
                className="game-image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDMwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjMUExQjJDIi8+CjxwYXRoIGQ9Ik0xNTAgODBDMTMyLjg3OSA4MCAxMTkgOTMuODc4OCAxMTkgMTExQzExOSAxMjguMTIxIDEzMi44NzkgMTQyIDE1MCAxNDJDMTY3LjEyMSAxNDIgMTgxIDEyOC4xMjEgMTgxIDExMUMxODEgOTMuODc4OCAxNjcuMTIxIDgwIDE1MCA4MFoiIGZpbGw9IiM1OGE2ZmYiLz4KPHBhdGggZD0iTTE4MSAxNjBIMTlDMTcuODk1NCAxNjAgMTcgMTYwLjg5NSAxNyAxNjJWMTgyQzE3IDE4My4xMDUgMTcuODk1NCAxODQgMTkgMTg0SDE4MUMyMDIgMTg0IDE4MyAxODMuMTA1IDE4MyAxODJWMTYyQzE4MyAxNjAuODk1IDE4Mi4xMDUgMTYwIDE4MSAxNjBaIiBmaWxsPSIjNThhNmZmIi8+Cjwvc3ZnPg==';
                }}
              />
            </div>
            <div className="game-content">
              <div className="game-name">{game.name}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Sosyal Medya Bölümü */}
      <section className="social-media">
        <h2>Bizi Takip Edin</h2>
        <div className="social-links">
          <a 
            href="https://instagram.com/enisermiss" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link instagram"
          >
            <img src="/images/instagram.png" alt="Instagram" className="social-logo" />
            <span>Instagram</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/muhammed-enis-ermi%C5%9F-54530b246/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link linkedin"
          >
            <img src="/images/linkedin.png" alt="LinkedIn" className="social-logo" />
            <span>LinkedIn</span>
          </a>
          <a 
            href="https://play.google.com/store/apps/developer?id=CODENIS" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="social-link playstore"
          >
            <img src="/images/google.png" alt="Google Play Store" className="social-logo" />
            <span>Play Store</span>
          </a>
        </div>
      </section>

      {/* İletişim Formu */}
      <section className="contact-section">
        <h2>İletişim</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Adınız</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSending}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">E-posta</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              disabled={isSending}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mesajınız</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              disabled={isSending}
            />
          </div>
          
          <button 
            type="submit" 
            className={`submit-btn ${success ? 'success' : ''} ${error ? 'error' : ''}`}
            disabled={isSending}
          >
            {success 
              ? '✓ Mesajınız gönderildi!' 
              : error 
              ? '✗ Gönderilemedi, tekrar deneyin' 
              : isSending 
              ? 'Gönderiliyor...' 
              : 'Gönder'}
          </button>
        </form>
      </section>

      {/* Yukarı Çık Butonu */}
      <button 
        className={`scroll-to-top ${scrolled ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        ↑
      </button>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 CODENIS STUDIOS. Tüm hakları saklıdır.</p>
      </footer>
    </div>
  );
}

export default App;