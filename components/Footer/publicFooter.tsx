import Image from 'next/image';

export default function PublicFooter() {
  return (
    <footer className="flex justify-center w-full py-4 bg-white">
      <div className="flex flex-col items-center w-full max-w-5xl md:px-4 md:justify-between md:flex-row">
        <p>© Mário Santos. All Rights Reserved.</p>
        <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
          Powered by{' '}
          <span>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </div>
    </footer>
  );
}
