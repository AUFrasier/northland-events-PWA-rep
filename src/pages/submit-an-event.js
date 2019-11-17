import React from "react"
import Layout from "../components/layout"
import '../styles/styles.scss'
import SubmitEventForm from '../components/SubmitEventForm'
import ContactForm from '../components/ContactForm'
 
class SubmitEventPage extends React.Component {

    render() {
        return (
            <Layout>
                <SubmitEventForm />
                <hr></hr>
                <ContactForm />
			</Layout>
		)
	}
}
 
export default SubmitEventPage