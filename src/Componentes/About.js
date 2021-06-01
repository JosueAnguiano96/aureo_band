import React, { useEffect } from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import brayan from './../imagenes/brayan.jpg'
import charlie from './../imagenes/charlie.jpg'
import fredo from './../imagenes/fredo.jpg'
import cuack from './../imagenes/cuack.jpg'
import Spotify from './Spotify';
import TituloDeSeccion from './../elementos/TituloDeSeccion'
import Aos from 'aos';
import 'aos/dist/aos.css'
import imagenStage from './../imagenes/stage.png'


const About = (props) => {
    useEffect( () => {
        Aos.init({duration:2000});
    }, []);

    return (
        <Container>
            <Row>
                <TituloDeSeccion texto="Sobre Áureo"/>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <ContenedorLeyenda data-aos="fade-up">
                            <p>Áureo es una banda de rock alternativo originaria de Saltillo Coahuila en 2018. Con las personas indicadas nos agrupamos como banda, con el fin de hacer que nuestros escuchas disfruten de nuestra música propia y compartir con ellos lo que más amamos.</p>
                        </ContenedorLeyenda>
                    </Col>
            </Row>
            <Row>
                <TituloDeSeccion texto="Integrantes"/>
                {props.data ? props.data.map( (integrante) => {
                    return (
                        <Col lg={6} md={6} sm={12} xs={12} key={integrante.id}>
                            <ContenedorIntegrante data-aos="fade">
                                <ContenedorImagenIntegrante>
                                    <Imagen src={integrante.id==="1" ? brayan : integrante.id==='2' ? charlie : integrante.id==='3' ? fredo : integrante.id ? cuack : 'error al cargar la imagen'} alt={integrante.nombre}></Imagen>
                                </ContenedorImagenIntegrante>
                                <ContenedorNombreIntegrante>
                                    <Nombre>{integrante.nombre}</Nombre>
                                </ContenedorNombreIntegrante>
                                <ContenedorRolIntegrante>
                                    <p>{integrante.rol}</p>
                                </ContenedorRolIntegrante>
                            </ContenedorIntegrante>
                        </Col>
                        );
                    }) : 'Cargando Integrantes...'}
            </Row>
            <Row>
                <TituloDeSeccion texto="Áureo en Spotify"/>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <ContenedorSpotify data-aos="fade-right">
                        <Spotify/>
                    </ContenedorSpotify>  
                </Col>
                <Col lg={6} md={6} sm={12} xs={12}>
                    <ContenedorSpotifyTexto data-aos="fade-right">
                        <h1>¡Escucha todas nuestras canciones y EP´s en Spotify!</h1>
                    </ContenedorSpotifyTexto>
                </Col>
            </Row>
            <Row>
                <TituloDeSeccion texto="Stage Plot"/>
                <ContenedorImagenStage >
                    <ImagenStage src={imagenStage} data-aos="fade-left"></ImagenStage>
                </ContenedorImagenStage>
            </Row>
            <Row style={{paddingBottom:"50px"}}>
                <TituloDeSeccion texto="Back Line"/>
                <Col lg={4} md={4} sm={12} xs={12} >
                    <ContenedorBackLine data-aos="fade-right">
                        <BackLineTitulo >BATERÍA:</BackLineTitulo>
                        <BackLineLista >Bombo 22" o 20". </BackLineLista>
                        <BackLineLista >Toms 3, medidas 12" 13" 16" (tom de piso).</BackLineLista>
                        <BackLineLista >4 atriles. </BackLineLista>
                        <BackLineLista >Atril de Contras. </BackLineLista>
                        <BackLineLista >Base de tarola.</BackLineLista>
                        <BackLineLista >Banco de batería.</BackLineLista>
                    </ContenedorBackLine>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <ContenedorBackLine data-aos="fade-up">
                        <BackLineTitulo >BAJO:</BackLineTitulo>
                        <BackLineLista >Amplificador de 60 watts (Fender o Ibáñez).</BackLineLista>
                    </ContenedorBackLine>
                </Col>
                <Col lg={4} md={4} sm={12} xs={12}>
                    <ContenedorBackLine data-aos="fade-left">
                        <BackLineTitulo >GUITARRAS:</BackLineTitulo>
                        <BackLineLista >2 amplificadores de 45 watts (Marshall, Fender o Ibáñez).</BackLineLista>
                        <BackLineLista >Micrófono para voz gama media alta o alta. </BackLineLista>
                        <BackLineLista >2 monitores. En caso de ser un evento grande micrófonos en cada uno de los amplificadores así como micrófonos de batería. Sonido el cual cumpla con los requerimientos del evento, bajos, medios y altos, así como un ingeniero de sonido que esté a la disposición de la banda para ajustes de voz o instrumentos.</BackLineLista>
                    </ContenedorBackLine>
                </Col>
            </Row>
        </Container>
     );
}

const ContenedorIntegrante = styled.div`
    width: 100%;
    height: 38rem;
    text-align: center;
    display: block;
    margin-top: 20px;
`;

 const ContenedorNombreIntegrante = styled.div`
    width: 100%;
    height: 3rem;
 `;

 const ContenedorImagenIntegrante = styled.div`
    width: 23rem;
    height: 32rem;
    margin-left: auto;
    margin-right: auto;
 `;

 const ContenedorRolIntegrante = styled.div`
    width: 100%;
    height: 3rem;
 `;

 const Imagen = styled.img`
    width:100%;
    height: 100%;
    position: relative;
    z-index: 999;
    box-shadow: 5px 5px 8px #999;



    /* &:hover{
        opacity:0.5;
    } */
 `;
 const Nombre = styled.p`
    padding: 15px 15px;
    font-size: 20px;
 `;


const ContenedorSpotify = styled.div`
    width: 100%;
    margin: auto;
    text-align:center;
    padding: 50px;
`;

const ContenedorSpotifyTexto = styled.div`
width: 100%;
display: flex;
align-items: center;
height: 100%;
text-align:center;


@media (max-width: 767px) {
  padding: 80px;
}
`;

const ImagenStage = styled.img`
    width: 100%;
    max-width: 90%;
    height: 90%;
    background-color: #232323;
    display: block;
    margin: auto;

`;

const ContenedorImagenStage = styled.div`
    width: 100%;
    height: 100%;
`;

const BackLineTitulo = styled.h2`
    padding: 30px;
`;

const BackLineLista = styled.li`
    font-size: 20px;
`;

const ContenedorBackLine = styled.div`
    width: 100%;
    height: 100%;
    box-shadow: 5px 5px 8px #999;
    padding: 20px 30px;
`;

const ContenedorLeyenda = styled.div`
    width: 100%;
    & > p {
        font-size: 30px;
        text-align: justify;

    }
`;



 
export default About;
