import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html>
            <Head>
                <meta name="description" content="Programador há 5 anos, com experiência em diversos projetos, com publicações mobiles nas principais lojas." />
                <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="follow, index" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="Mário Santos" />
                <meta property="og:description" content="Programador há 5 anos, com experiência em diversos projetos, com publicações mobiles nas principais lojas." />
                <meta property="og:title" content="Mário Santos - Desenvolverdo Mobile, Web, Backend" />
                <meta property="og:image" content="/icon.png" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@mariosantosdev" />
                <meta name="twitter:title" content="Mário Santos - Desenvolverdo Mobile, Web, Backend" />
                <meta name="twitter:description" content="Programador há 5 anos, com experiência em diversos projetos, com publicações mobiles nas principais lojas." />
                <meta name="twitter:image" content="/icon.png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}