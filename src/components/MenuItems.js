import React from 'react';
import {graphql, StaticQuery, Link} from 'gatsby';
import styled from 'styled-components';

const MenuItem = styled(Link)`
    color: #006226;
    font-weight: bold;
    padding: 8px 16px;
    display: inline-block;
    float: none;
`
const MenuItemsWrapper = styled.div`
    max-width: 100%;
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: table;
    text-align: center;
`

const MenuItems = () => (
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
    <MenuItemsWrapper>
        {props.allWordpressWpApiMenusMenusItems.edges[0].node.items.map(item => {
            var page = "/" + item.object_slug;
            if (page == "/home") {
                page = "/";
            }
            if (item.object_slug !== "1920") 
                return  <MenuItem to={page} key={item.title}>
                            {item.title}
                        </MenuItem>
            
        })}
    </MenuItemsWrapper>
)} />
);

export default MenuItems;