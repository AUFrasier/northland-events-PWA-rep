import React from "react"
import EventList from "../components/EventList"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <EventList />
    
  </Layout>
)

export default IndexPage
