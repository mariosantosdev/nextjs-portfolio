import { Fragment } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';

import { PublicFooter } from '../components/Footer';
import ContactForm, { ContactData } from '../components/Forms/Contact';
import Header from '../components/Navbar/PublicHeader';

export default function Home() {
    const router = useRouter();

    async function handleSendEmail({ name, email, description }: ContactData) {
        try {
            const subject = `${name} - contato via portofolio`

            router.push(`mailto:mariodev7@gmail.com?Subject=${encodeURI(subject)}&Body=${encodeURI(description)}`);
        } catch (error: any) {
            if (confirm('Ocorreu um erro ao enviar o e-mail! Você deseja enviar por uma aba externa?')) {
                router.push('mailto:mariodev7@gmail.com');
            }
            console.error(error.response);
        }
    }

    return (
        <Fragment>
            <Head>
                <title>Contato | Mário Santos</title>

                <meta
                    property="og:url"
                    content={`https://yourwebsite.com${router.asPath}`}
                />
                <link
                    rel="canonical"
                    href={`https://yourwebsite.com${router.asPath}`}
                />
            </Head>

            <Header />

            <main className='flex flex-col items-center justify-center p-4 bg-indigo-900'>
                <div className='flex justify-center w-full max-w-5xl md:justify-start'>
                    <h1 className='mb-4 text-2xl text-center text-white md:text-left md:text-6xl'>Contato</h1>
                </div>
                <div className='flex flex-col w-full max-w-5xl min-h-screen'>
                    <div className='flex flex-row justify-center w-full p-4 mt-4 bg-white rounded-lg'>
                        {/* Social Media */}
                        <aside className='flex-col hidden w-3/6 h-full lg:flex'>
                            <h1 className='mb-4 text-xl text-gray-800 md:text-2xl'>Redes Sociais</h1>

                            <ul className='flex flex-col space-y-2'>
                                <a
                                    href="http://instagram.com/mariosantosdev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-gray-700 hover:underline'
                                >
                                    &#8594; Instagram
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/mariosantos-dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-gray-700 hover:underline'
                                >
                                    &#8594; LinkedIn
                                </a>
                                <a
                                    href="https://twitter.com/mariosantosdev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-gray-700 hover:underline'
                                >
                                    &#8594; Twitter
                                </a>
                                <a
                                    href="https://github.com/mariosantosdev"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='text-gray-700 hover:underline'
                                >
                                    &#8594; Github
                                </a>
                            </ul>
                        </aside>

                        {/* Form */}
                        <div className='flex flex-col justify-center w-full h-full'>
                            <h1 className='mb-4 text-xl text-center text-gray-800 md:text-2xl'>Orçamento</h1>

                            <ContactForm onSend={handleSendEmail} />
                        </div>
                    </div>
                </div>

            </main>

            <PublicFooter />
        </Fragment>
    )
}