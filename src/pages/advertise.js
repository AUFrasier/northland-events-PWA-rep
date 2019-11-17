import React from "react"
import Layout from "../components/layout"
import '../styles/styles.scss'
import styled from 'styled-components'
import AdvertiseForm from '../components/AdvertiseForm'
import ContactUsForm from '../components/ContactForm'

const AdvertisePageTitleText = styled.h2`
    margin-top: 30px;
    text-align: center;
    font-size: 28px;
`
const AdvertisePageText = styled.p`
    display: block;
    margin: 0 auto;
    width: 80%;
`
 
class AdvertisePage extends React.Component {

    render() {
        return (
            <Layout>
                <img src="https://www.northlandevents.org/wp-content/uploads/2019/10/Advertise-your-business-with-Northland-Events.jpg"/>
                <AdvertisePageTitleText>
                    Thank you for your interest in advertising with the Northland Events Calendar.
                </AdvertisePageTitleText>
                <br></br>
                <AdvertisePageText>
                    The Northland Events Calendar is where the community gathers to be informed and spread the word about upcoming area activities.  Advertising on this platform offers a wide range of visitor reach and exposure opportunity.
                </AdvertisePageText>
                <br></br>
                <AdvertisePageText>
                    There are a number of ad placement options available!           
                </AdvertisePageText>
                <br></br>
                <AdvertisePageText>
                Please fill out the following form to request information on advertising with us.           
                </AdvertisePageText>
                <AdvertiseForm />
                <ContactUsForm />
            </Layout>
		)
	}
}
 
export default AdvertisePage