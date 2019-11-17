import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'

const EventWrapper = styled.div`
    margin-top: 30px !important;
    margin: 0 auto;
    display: block;
    width: 80%;
`
const EventTitle = styled.h1`
    text-align: center;
    margin-bottom: 30px;
`
const EventImageWrapper = styled.div`
    text-align: center;
`
const EventImage = styled.img`
    max-width: 100%;
`
export default ({pageContext}) => (
    <Layout>
        <EventWrapper>
            <EventTitle dangerouslySetInnerHTML={{__html: pageContext.title}} />
            <EventImageWrapper>
                <EventImage src={pageContext.image.url} alt="Event Image" />
            </EventImageWrapper>
            <div dangerouslySetInnerHTML={{__html: pageContext.description}} />
        </EventWrapper>
    </Layout>

);