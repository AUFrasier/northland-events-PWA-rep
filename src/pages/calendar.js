import React from 'react'
import { graphql } from "gatsby"
import EventsCalendar from '../components/EventsCalendar'
import '../styles/styles.scss'
import Layout from '../components/layout'
import styled from 'styled-components'

const PageTitle = styled.h1`
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const EventDataArr = [];
export const query = graphql`
{
    allInternalEvents {
        edges {
            node {
                id
                events {
                    all_day
                    alternative_id
                    author
                    cost
                    slug
                    start_date
                    categories {
                        name
                        slug
                        taxonomy
                        term_group
                        term_taxonomy_id
                        filter
                        description
                        count
                        alternative_parent
                        alternative_id
                    }
                    description
                    date
                    image {
                        url
                    }
                    show_map
                    show_map_link
                    title
                    url
                    website
                    venue {
                        address
                        alternative_id
                        author
                        city
                        country
                        slug
                        url
                        venue
                        website
                    }
                }
            } 
        }
    }
}
`

const CalendarPage = ({ data }) => {
    const eventData = data.allInternalEvents.edges[0].node.events;
    //console.log(EventDataArr.length)
    if (EventDataArr.length == 0) {
        eventData.forEach(function (event) {
            console.log(event)
            EventDataArr.push({
                id: event.alternative_id,
                title: event.title,
                start: event.start_date,
                url: '/' + event.slug
            })
        });
    }

return (
        <Layout>
            <PageTitle>Featured Events</PageTitle>
            <EventsCalendar events={EventDataArr} />
        </Layout>
  );
}

export default CalendarPage

