//pages/sitemap.xml.js
const DATA_URL = 'https://devmario.me'

function generateSiteMap(posts) {
    return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the URLs we know already-->
     <url>
       <loc>${DATA_URL}/</loc>
     </url>
     <url>
       <loc>${DATA_URL}/projects</loc>
     </url>

     <!--Automatic set the URLs of projects-->
     ${posts.map(({ id }) => (`
        <url>
           <loc>${`${DATA_URL}/project/${id}`}</loc>
       </url>
    `)).join('')}
   </urlset>
 `
}

export default function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    // We make an API call to gather the URLs for our site
    const request = await fetch(`${DATA_URL}/api/post`);
    const { posts } = await request.json()

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(posts)

    res.setHeader('Content-Type', 'text/xml')
    // we send the XML to the browser
    res.write(sitemap)
    res.end()

    return {
        props: {}
    }
}