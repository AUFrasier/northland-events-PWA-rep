import React from 'react';
import styled from 'styled-components';


const LogoInit = styled.img`
    max-width: 210px;
    margin: 16px;
    te
`
class FooterLogo extends React.Component {
    render () {
        return (
            <LogoInit src="https://www.northlandevents.org/wp-content/uploads/2018/01/rechargelogo.png"/> 
        );
    }
}
export default FooterLogo;