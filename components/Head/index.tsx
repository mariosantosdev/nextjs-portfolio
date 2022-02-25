import NHead from "next/head";

interface ISEOProps {
    title: string;
    path: string;
}

export default function Head({ title, path }: ISEOProps) {
    const DOMAIN = 'devmario.me';

    return (
        <NHead>
            <title>{title}</title>

            {/* Facebook Meta tags */}
            <meta property="og:title" content={title} key="og:title" />
            <meta property="og:url" content={`https://${DOMAIN}${path}`} key="og:url" />

        </NHead>
    )
}