import './Header.css'
import { useState } from 'react'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const handleSelectOption = () => {
    setIsOpen(false)
  }
    return (
        <header className="header">
          <span className="header-logo">TerraCafe</span>
          <button
            className="header-hamburguer"
            onClick={toggleMenu}
          >
            {isOpen ? '✕' : '☰'}
          </button>

        <nav className={`header-nav ${isOpen ? 'open' : ''}`}>
          <a href="#menu-section" onClick={handleSelectOption}>Cardápio</a>
          <a href="#location-section" onClick={handleSelectOption}>Localização</a>
          <a href="#order-section" onClick={handleSelectOption}>Fazer Encomenda</a>
          <a href="#footer-section" onClick={handleSelectOption}>Fale conosco</a>
        </nav>
        </header>
    )
}

export default Header