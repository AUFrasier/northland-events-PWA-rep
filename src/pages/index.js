import React from "react"
import EventList from "../components/EventList"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from 'styled-components';

const PageTitle = styled.h1`
    text-align: center;
    margin-top: 45px;
    margin-bottom: 30px;
`
const IndexPage = () => (
  <Layout>
    <SEO title="Home"/>
    <PageTitle>All Events</PageTitle>
    <EventList />
  </Layout>
)

export default IndexPage
