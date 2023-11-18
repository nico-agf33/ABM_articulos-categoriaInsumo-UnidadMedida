import {BrowserRouter as Router} from "react-router-dom"
//import AboutUs from "./components/about-us/AboutUs"
//import Carousel_Home from "./components/carousel-home/Carousel_Home"
import Footer from "./components/footer/Footer"
import Header from "./components/header/Header"
import AppRoutes from "./routes/AppRoutes"
import {Container} from "react-bootstrap"
import {Suspense} from "react"
import Loader from "./components/loader/Loader"
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function App(){
  return(
    <>
    <ToastContainer/>
    <Router>
    <Header/>
      <Container style={{minHeight:'100vh',minWidth:'100%',padding:'0'}}>
        <Suspense fallback={<Loader/>}>
          <AppRoutes/>
        </Suspense>
      </Container>
    <Footer/>
    </Router>
    </>
  )
}
export default App
