import React from 'react';
import styled from 'styled-components';
import MenuItems from '../components/MenuItems'

const MainMenuWrapper = styled.div`
    display: block;
`

const MainMenu = () => (
  <MainMenuWrapper>
    <MenuItems />
  </MainMenuWrapper>
);

export default MainMenu;