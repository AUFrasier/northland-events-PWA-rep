/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import Footer from './Footer'
import Header from './header'
import "./layout.css"
import {createGlobalStyle} from 'styled-components';
import styled from 'styled-components';
import {Helmet} from "react-helmet";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i&display=swap');
  body {
    font-family: 'Open Sans', sans-serif !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`

const LayoutWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
`

const Layout = ({ children }) => (
  <div>
    <Helmet>
    <script src="https://unpkg.com/react/umd/react.production.min.js" crossorigin />
    <script
      src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
      crossorigin
    />
    <script
      src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
      crossorigin
    />
      <link rel="shortcut icon" href="https://www.northlandevents.org/wp-content/uploads/2018/03/favicon.ico" />
      <title>Northland Events</title>
    </Helmet>
    <GlobalStyles />
    <Header />
    <LayoutWrapper>
      {children}
    </LayoutWrapper>
    <Footer />
    
  </div>
);

export default Layout