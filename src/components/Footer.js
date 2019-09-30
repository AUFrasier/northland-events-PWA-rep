import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';
import styled from 'styled-components';
import SiteInfo from './SiteInfo'
import FooterLogo from '../components/FooterLogo'

const FooterMainMenuWrapper = styled.div`
    display: flex;
    background-image: url(https://www.northlandevents.org/wp-content/uploads/2018/01/yelbk.png);
`

const FooterMenuItem = styled(Link)`
    color: #006226;
    font-weight: bold;
    display: block;
    padding: 8px 16px;
`

const FooterMainMenuInner = styled.div`
    max-width: 960px;
    margin: 0 auto;
    display: flex;
    width: 960px;
    height: 100%;
`

const Footer = () => (
    <StaticQuery query={graphql`
    {
        allWordpressWpApiMenusMenusItems(filter: {
          name: {
            eq: "Main Menu"
          }
        }){
          edges{
            node{
              name
              items{
                title
                object_slug
              }
            }
          }
        }
        
      }
`} render={props => (
    <FooterMainMenuWrapper>
        <FooterMainMenuInner>
        <FooterLogo />
        {props.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(item => {
            var page = "/" + item.object_slug;
            if (page == "/home") {
              page = "/";
            }
            if (item.object_slug !== "1920") 
                return  <FooterMenuItem to={page} key={item.title}>
                            {item.title}
                        </FooterMenuItem>
            
        })}
        </FooterMainMenuInner>
    </FooterMainMenuWrapper>
)} />
);

export default Footer;