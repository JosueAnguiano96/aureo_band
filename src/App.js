import React, {useEffect} from "react";
import {Carousel} from 'react-bootstrap'
import todos from './imagenes/todos.jpg';
import todos2 from './imagenes/todos2.jpg';
import todos3 from './imagenes/todos3.jpg';
import './css/home.css';
import styled from 'styled-components';
import Contenedor from './elementos/Contenedor';
import { BotonLinkExterno } from './elementos/Boton';
import {ContenedorBoton} from './elementos/ElementosDeFormulario';
import {ReactComponent as IconoSpotify} from './iconos/spotify.svg';
import Aos from 'aos';
import 'aos/dist/aos.css'

const App = () => {
  useEffect( () => {
    Aos.init({duration:2000});
  }, []); 

  return ( 
    <>
      <Carousel fade controls={false} pause={false} style={{zIndex: "1"}}>
        <Carousel.Item interval={1000}  className="imagenes-carusel">
            <img
              className="d-block w-100 imagen-carusel"
              src={todos}
              alt="Áureo1"              
              />
        </Carousel.Item>
        <Carousel.Item interval={1000} className="imagenes-carusel">
            <img
              className="d-block w-100 imagen-carusel"
              src={todos2}
              alt="Áureo2"            
              />
        </Carousel.Item>
        <Carousel.Item interval={1000} className="imagenes-carusel">
            <img
              className="d-block w-100 imagen-carusel"
              src={todos3}
              alt="Áureo3"             
              />
        </Carousel.Item>
      </Carousel>
        <Titulo data-aos="fade-left">Áureo</Titulo>

      <BannerNuevoSencillo>
          <Contenedor>
              <h1 data-aos="fade-up">¡Nuevo Sencillo!</h1>
              <h1 data-aos="fade-up"> "Te amo” disponible también en Spotify.</h1>
            <ContenedorBoton data-aos="fade-down">
                <BotonLinkExterno as="button" primario="true" conIcono="true">
                  <a 
                    href="https://open.spotify.com/track/1M3TW88gP8FmidrdGvsh4W?si=vhohkTBwQaWPGNyWMiHb9w"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Escúchala ahora! <IconoSpotify />
                  </a>
                </BotonLinkExterno>
            </ContenedorBoton>
          </Contenedor>
      </BannerNuevoSencillo>

      </>
  );
}
  const BannerNuevoSencillo = styled.div`
    width: 100%;
    background-color: #000;
    padding: 100px 30px;
    text-align: center;
    color: #fff;
    margin-top: -300px;
    position: relative;
    z-index: 100;

    @media (max-width: 480px) {
      margin-top: -130px;
      padding: 50px 30px;
    }

    @media (max-width: 768px) { //ver como acomodar todo en moviles
      margin-top: -130px;
    }
  `;

const Titulo = styled.div`
  display: flex;
  position: relative;
  z-index: 99;
  color: #fff;
  padding: 10px 40px;
  top: -60vh;
  width: 100%;
  font-size: 100px;


  @media (max-width: 480px) {
    top:-19vh;
    font-size: 50px;
  }

  @media (max-width: 768px) { //ver como acomodar todo en moviles
    top:-15vh;
    font-size: 50px;

    h1{
      font-size: 6rem;
    }
  }
  
`;

 
export default App;