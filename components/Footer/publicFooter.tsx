import Image from "next/image";

export default function PublicFooter() {
    return (
        <footer className='flex flex-col items-center py-4 md:justify-around md:flex-row'>
            <p>
                © Mário Santos. All Rights Reserved.
            </p>
            <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                Powered by{' '}
                <span>
                    <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
                </span>
            </a>
        </footer>
    )
}