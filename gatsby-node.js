/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slash = require(`slash`)
 
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
// Will create pages for WordPress pages (route : /{slug})
// Will create pages for WordPress posts (route : /post/{slug})
exports.createPages = ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions
  //createRedirect({ fromPath: '/', toPath: '/home', redirectInBrowser:true, isPermanent: true })
  return new Promise((resolve, reject) => {
    // The “graphql” function allows us to run arbitrary
    // queries against the local WordPress graphql schema. Think of
    // it like the site has a built-in database constructed
    // from the fetched data that you can run queries against.

    // ==== EVENTS ====
    graphql(
      `
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
    )
      .then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }
 
        // Create Page pages.
        const eventTemplate = path.resolve("./src/templates/event.js")
        // We want to create a detailed page for each
        // page node. We'll just use the WordPress Slug for the slug.
				// The Page ID is prefixed with 'PAGE_'
				//console.log(result.data.allInternalEvents.edges[0].node)
				//console.log(result.data.allInternalEvents.edges[0].node.events)
        _.each(result.data.allInternalEvents.edges[0].node.events, event => {
          // Gatsby uses Redux to manage its internal state.
          // Plugins and sites can use functions like "createPage"
          // to interact with Gatsby.
          console.log('-----------------');
          console.log(event);
          console.log('-----------------');
          createPage({
            // Each page is required to have a `path` as well
            // as a template component. The `context` is
            // optional but is often necessary so the template
            // can query data specific to each page.
            path: `/${event.slug}/`,
            component: slash(eventTemplate),
            context: event,
          })
        })
      }) // EVENTS END
    resolve()
  })
}


