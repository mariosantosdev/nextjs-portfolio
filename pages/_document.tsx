import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang='pt_BR' className="scroll-smooth">
            <Head>
                <meta name="description" content="Sou programador há 5 anos, com experiência em diversos projetos." />
                <link rel="icon" href="/favicon.ico" />
                <meta name="robots" content="follow, index" />
                <meta name="keywords" content="dev, programação, backend, nodejs, react, nextjs, typescript, javascript, portfólio, Mário Santos, Mario Technologies"/>

                {/* Facebook Meta Tags */}
                <meta property="og:type" content="website" key="og:type" />
                <meta property='og:locale' content='pt_BR' key='og:locale' />
                <meta property="og:description" content="Sou programador há 5 anos, com experiência em diversos projetos web e mobile." key="og_description" />
                <meta property="og:site_name" content="Mário Santos" key="og:site_name" />
                <meta property="og:image" content="https://github.com/mariosantosdev.png" key="og:image" />

                {/* Twitter Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
                <meta name="twitter:site" content="@mariosantosdev" key="twitter:site" />
                <meta name="twitter:title" content="Mário Santos - Desenvolvedor Mobile, Web, Backend" key="twitter:title" />
                <meta name="twitter:description" content="Sou programador há 5 anos, com experiência em diversos projetos." key="twitter:description" />
                <meta name="twitter:image" content="https://github.com/mariosantosdev.png" key="twitter:image" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}