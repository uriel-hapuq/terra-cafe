import './App.css'
import Header from './components/Header/Header'
import Menu from './components/Menu/Menu'
import Order from './components/Order/Order'
import Location from './components/Location/Location'
import Footer from './components/Footer/Footer'
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
     <Header/>
     <main className='main-grid'>
        <Menu/>
        <Order/>
        <Location/>
        <Footer/>
     </main>
     

     <ToastContainer 
        aria-label="Notificações"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </>

    
  )
}

export default App
