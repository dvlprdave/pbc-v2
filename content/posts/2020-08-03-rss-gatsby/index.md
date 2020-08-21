---
title: Dynamically loaded content with RSS and Gatsby
author: David Quick
date: 2019-11-14
excerpt: In this guide, we'll utilize gatsby-plugin-feed to generate an RSS feed that contains blog posts from a Gatsby site.
---

In this guide, we'll utilize `gatsby-plugin-feed` to generate an RSS feed that contains blog posts from a Gatsby site. We'll then use the RSS feed to display that data dynamically onto a different site using an NPM package called [**rss-parser**](https://www.npmjs.com/package/rss-parser).

> **Note:** 
Following this guide holds the assumption that you already have a blog built with Gatsby or some base knowledge of Gatsby.

If you don't have a blog with Gatsby, don't worry about it. You could follow this [**article**](https://daveceddia.com/start-blog-gatsby-netlify/) and build one. 

# Installing the plugin
Open your Gatsby blog in whatever editor you'd like. I'll be using VS Code in specific. 

Once you're all set, head to your terminal and enter in the following command: 

```shell
yarn add gatsby-plugin-feed
```

> If your blog is using MDX for blog posts instead of MD, then you can use the `gatsby-plugin-feed-mdx` plugin instead. 

This will add the necessary plugin to our project as a dependency. 

We can check that the plugin was installed successfully by opening up our `package.json` and looking under "dependencies" for `gatsby-plugin-feed`.

## Using and understanding the plugin 
In order to get the plugin to do what we want, we need to install it and make some changes within its configuration.

Head into your `gatsby-config.js` file and insert the following into the plugins array:

> Navigating the plugins array can be tricky. What you need to keep in mind, is that each plugin is an object within an array. As we know, arrays are comma-separated. Each plugin will come after the other by adding a comma, followed by the new plugin and its configuration options (if there are any). 

```js
 {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.edges.map(edge => {
                return Object.assign({}, edge.node.frontmatter, {
                  description: edge.node.excerpt,
                  date: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.fields.slug,
                  custom_elements: [{ "content:encoded": edge.node.html }],
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  limit: 3,
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields { slug }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `RSS feed name`,
          },
        ],
      }
    }
```
There's a lot to take in, but we'll walk through it together. 

The `gatsby-feed-plugin` options are doing several things for us: 

- Query our sites metadata
- Creating a `feeds` array to construct the RSS skeleton
- Using `allMarkdownRemark` for any related files and fields
- Gives fields for RSS file name and title  

What we want to focus on are the `output` and `title` fields. The `output` field will be the path in our URL and the `title` field will be the name of your RSS feed. 

You can configure your field options like so: 

```js
output: `/rss.xml`,
title: `Your RSS feed name here`,
```
Once you've done that, you're all set with adding and configuring the plugin!

> I mentioned before that if you're using MDX, you'll have to use a different plugin. Along with the alternate plugin, there are a few configuration changes that need to be made. You can follow [this video](https://www.youtube.com/watch?v=Pzx2F_6U1dw) for said changes.

## Viewing Our Feed

The RSS feed can only be viewed for production builds, so we'll need to build our Gatsby site and then serve it using a local server.

You can go ahead and open your terminal and type in the following:

```shell
gatsby build && gatsby serve
```

Once Gatsby has done its thing, you should see the following in your terminal: 

```shell
gatsby serve running at: http://localhost:9000/
```

Open the link and add your RSS path to the end of the URL like so:

```shell
http://localhost:9000/rss.xml
```

You should now see your blog posts in XML format. Your RSS feed is officially set! Now, let's take our newly created feed and do something with it. 

## Using our RSS feed

We'll be moving away from our Gatsby site and using our feed by injecting it into another. 

I wanted to display my most recent blog posts on my portfolio to show more of my work, so I'll be using a component in my portfolio as an example. 

I implemented the [rss-parser](https://www.npmjs.com/package/rss-parser) library to grab my RSS feed and parse it so that I could use the data returned to display my posts. Here's the main working piece behind displaying the RSS feed: 

```js
  const rssData = async () => {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    let parser = new RSSParser();
    
    try {
      const feed = await parser.parseURL(`${CORS_PROXY}https://papabearcodes.com/rss.xml`)
      setFeed(feed)
    } catch (error) {
      console.log(error)
    }
  }
```

In the snippet above, I created an asynchronous function `rssData` that grabs my RSS feed and parses it into a JavaScript object. If you're wondering what the `CORS_PROXY` variable is, it contains a URL to an API that allows cross-origin requests anywhere. This is needed because some RSS feeds will not load due to CORS security. 

If you're unfamiliar with async await and prefer callbacks or promises, rss-parser uses a callback in their documentation example: 

```js
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
 
let parser = new RSSParser();
parser.parseURL(CORS_PROXY + 'https://www.reddit.com/.rss', function(err, feed) {
  if (err) throw err;
  console.log(feed.title);
  feed.items.forEach(function(entry) {
    console.log(entry.title + ':' + entry.link);
  })
})
```

That's pretty much it. Once you've created an RSS feed, using rss-parser makes your feed a portable asset.

Here is my full component for displaying content from my RSS feed: 

```jsx
import React, {useState, useEffect} from 'react'
import RSSParser from 'rss-parser'

const RssFeed = () => {
  const [feed, setFeed] = useState({ title: '', items: [] })

  const rssData = async () => {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"
    let parser = new RSSParser();
    
    try {
      const feed = await parser.parseURL(`${CORS_PROXY}https://papabearcodes.com/rss.xml`)
      setFeed(feed)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    rssData()
  }, [])

    return (
    <div>
      <h1>Blog Posts</h1>
      <p>{feed.title}</p>
      {feed.items.slice(0, 3).map((item, i) => (
          <div key={i}>
              <h1>{item.title}</h1>
              <p>{item.content}</p>
              <p>{item.pubDate}</p>
          </div>
      ))}
    </div>
    );
  }

export default RssFeed
```