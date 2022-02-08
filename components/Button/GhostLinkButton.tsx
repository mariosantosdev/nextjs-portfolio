import Link from "next/link"
import { AnchorHTMLAttributes, DetailedHTMLProps } from "react"

interface IGhostButtonProps extends DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement> {
    targetBlank?: boolean;
    text: string;
    href: string;
}

export default function GhostLinkButton({ text, targetBlank, href, ...rest }: IGhostButtonProps) {
    return (
        <Link href={href}>
            <a
                target={targetBlank ? '_blank' : ''}
                rel="noopener noreferrer"
                className='p-4 px-8 text-white transition-colors delay-150 border hover:bg-white hover:text-black'
                {...rest}
            >
                {text}
            </a>
        </Link>
    )
}