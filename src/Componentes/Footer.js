import React from 'react';
import { BotonLinkExterno } from './../elementos/Boton';
import {ReactComponent as Instagram} from './../iconos/instagram.svg'
import {ReactComponent as Facebook} from './../iconos/facebook.svg'
import {ReactComponent as Youtube} from './../iconos/youtube.svg'
import {ReactComponent as Spotify} from './../iconos/spotify.svg'
import AureoLogo from './../imagenes/aureonegro.png'
import {Container, Col, Row} from 'react-bootstrap'
import Divider from './../elementos/Divider';
import styled from 'styled-components';



const Footer = () => {
    return (
        <Pie>
            <Container>
                <Row>
                    <Col lg="auto" md="auto" sm="auto">
                        <img src={AureoLogo} style={{width:"200px",height:"60px"}} alt="logo Áureo"/>
                    </Col>
                    <Col lg="auto" md="auto" sm="auto"></Col>
                    <Col lg="auto" md="auto" sm="auto">
                        <p>Nuestras redes sociales</p>
                        <BotonLinkExterno soloIcono="true" >
                            <a
                                href="https://www.instagram.com/aureoband"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Instagram />
                            </a>
                        </BotonLinkExterno>
                        <BotonLinkExterno soloIcono="true">
                            <a
                                href="https://www.facebook.com/aureoband"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Facebook />    
                            </a>
                        </BotonLinkExterno>
                        <BotonLinkExterno soloIcono="true">
                            <a
                                href="https://www.youtube.com/channel/UCcJDDzoOOHDOgOxauZcnWBg"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Youtube />
                            </a>
                        </BotonLinkExterno>
                        <BotonLinkExterno soloIcono="true">
                            <a
                                href="https://open.spotify.com/artist/0rkZmIiGZ5kG1L0VT8gFZ3?si=iVBXeihISkib3Lx4Lgh9WQ"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <Spotify />
                            </a>
                        </BotonLinkExterno>
                    </Col>
                    <Divider/>
                </Row>
            <p>&copy; Todos los derechos reservados. Áureo</p>
            </Container>
        </Pie>
    );
}

const Pie = styled.footer`
    background-color: rgb(96,96,96);
    padding: 30px;
`;
 
export default Footer;