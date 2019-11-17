import React from 'react';
import styled from 'styled-components';
import FooterLogo from '../components/FooterLogo'
import MainMenu from '../components/MainMenu'

const FooterWrapper = styled.div`
    max-width: 100%;
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(https://www.northlandevents.org/wp-content/uploads/2018/01/yelbk.png);
    text-align: center;
`

const Footer = () => (
  <footer>
    <FooterWrapper>
      <FooterLogo />
      <MainMenu />
    </FooterWrapper>
  </footer>
);

export default Footer;