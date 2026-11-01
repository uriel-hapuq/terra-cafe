import './Header.css'
import { useState } from 'react'
import { SiCoffeescript } from "react-icons/si";


function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleMenu = () => setIsOpen(!isOpen)
  const handleSelectOption = () => {
    setIsOpen(false)
  }
    return (
        <header className="header">

          <div className="logo-container">
            <SiCoffeescript size={30} color="var(--bg-cream)"/>
            <span className="header-logo">TerraCafe</span>
          </div>
          
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