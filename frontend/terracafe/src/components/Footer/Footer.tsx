import { FaWhatsapp, FaInstagram, FaRegEnvelope } from 'react-icons/fa6'
import './Footer.css'

function Footer() {
  return (
    <footer id="footer-section" className="footer-section">
      <div className="footer-container">
        <h3>Contatos</h3>
        
        <div className="contact-list">
          <a 
            href="https://wa.me/5573982385493" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-card"
          >
            <div className="icon whatsapp">
              <FaWhatsapp />
            </div>
            <div className="contact-info">
              <strong>(73) 9 8238-5493</strong>
              <span>WhatsApp</span>
            </div>
          </a>

          <a 
            href="https://www.instagram.com/urielhapuq/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-card"
          >
            <div className="icon instagram">
              <FaInstagram />
            </div>
            <div className="contact-info">
              <strong>@terracafe</strong>
              <span>Instagram</span>
            </div>
          </a>

          <a 
            href="mailto:urihapuque11@gmail.com" 
            className="contact-card"
          >
            <div className="icon email">
              <FaRegEnvelope />
            </div>
            <div className="contact-info">
              <strong>contato@terracafe.com.br</strong>
              <span>Atendimento Geral</span>
            </div>
          </a>
        </div>
      </div>

      <hr className="footer-divider" />

      <div className="schedule-section">
        <h3>Horário de Funcionamento</h3>
        
        <ul className="schedule-list">
          <li className="schedule-item">
            <span>Segunda - Sexta</span>
            <span className="time open">8:00 - 17:00</span>
          </li>
          <li className="schedule-item">
            <span>Sábado</span>
            <span className="time open">8:00 - 12:00</span>
          </li>
          <li className="schedule-item">
            <span>Domingo</span>
            <span className="time closed">Fechado</span>
          </li>
        </ul>
      </div>

    </footer>
  )
}

export default Footer