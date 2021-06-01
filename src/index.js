import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "animate.css/animate.min.css";
import App from './App';
// import RutaPrivada from './Componentes/RutaPrivada';
import WebFont from 'webfontloader';
import favicon from './iconos/logo.svg';
import {Helmet} from 'react-helmet'
import About from './Componentes/About';
import Contacto from './Componentes/Contacto';
import InicioSesion from './Componentes/InicioSesion';
import Admin from './Componentes/Admin';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Merch from './Componentes/Merch';
//import Contenedor from './elementos/Contenedor';
import EditarPedido from './Componentes/EditarPedido';
import NavBar from './Componentes/NavBar';
import Footer from './Componentes/Footer';
import JsonData from './data/DataPagina.json'
import {CarritoProvider} from './contextos/ContextoCarrito'
import {AuthProvider} from './contextos/AuthContext'


WebFont.load({
  google: {
    //Roboto:wght@400;500;700
    families: ['Roboto:400,500,700', 'sans-serif']
  }
}); 

const Index = () => {
  const [landingPageData, setLandingPageData] = useState({})
  useEffect(() => {
    setLandingPageData(JsonData)
  }, [])


  return (
    <>
      <Helmet>
        <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
        <title>· Áureo ·</title>
      </Helmet> 

      <AuthProvider>
        <CarritoProvider>
          <BrowserRouter>

          <NavBar />
            <Switch>
              <Route 
                exact 
                path="/" 
                render={ () => (
                  <App data={landingPageData.Home}/>
                  )}              
                  />
              <Route 
                exact 
                path="/sobre-aureo" 
                render= { () => (
                  <About data={landingPageData.Integrantes} />
                  )}
                  />
              <Route 
                exact 
                path="/merch" 
                render= { () => (
                  <Merch data={landingPageData.Merch} />
                  )}
              />

              <Route exact path="/contacto" component={Contacto}/>
              <Route exact path="/inicio-sesion" component={InicioSesion}/>
              
              <Route exact path="/adminaureo" component={Admin}/>
              <Route exact path="/editarpedido/:id" component={EditarPedido}/>


                  {/* <RutaPrivada path="/adminaureo">
                    <Admin />
                    </RutaPrivada>
                    
                    <RutaPrivada path="/editarpedido/:id">
                    <EditarPedido />
                  </RutaPrivada> */}

            </Switch>
          <Footer />

          </BrowserRouter>
        </CarritoProvider>
      </AuthProvider>

    </>
   );
}

ReactDOM.render(<Index />,document.getElementById('root'));