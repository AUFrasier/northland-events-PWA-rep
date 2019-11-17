import React from "react"
import styled from 'styled-components';
import Logo from '../components/Logo'
import MainMenu from '../components/MainMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook } from "@fortawesome/free-brands-svg-icons"

const HeaderWrapper = styled.div`
    max-width: 100%;
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(https://www.northlandevents.org/wp-content/uploads/2018/01/yelbk.png);
    text-align: center;
`

const FacebookLink = styled.a`
    display:block;
`

var FontAwesomeStyle = {
  fontSize: '45px',
  color: '#3b5998',
  display: 'block',
  margin: '0 auto'
};

const Header = () => (
  <header>
    <HeaderWrapper>
      <Logo />
      <FacebookLink href="https://www.facebook.com/NorthlandEvents.org/" target="_blank"><FontAwesomeIcon style={FontAwesomeStyle} icon={faFacebook} /></FacebookLink>
      <MainMenu />
    </HeaderWrapper>
  </header>
);

export default Header;
