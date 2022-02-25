import { useRouter } from 'next/router';
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiFillLinkedin,
  AiFillGithub,
} from 'react-icons/ai';

import { PublicFooter } from '../Footer';
import ContactForm, { ContactData } from '../Forms/Contact';

export default function ContactSession() {
  const router = useRouter();

  async function handleSendEmail({ name, description }: ContactData) {
    try {
      const subject = `${name} - contato via portofolio`;

      router.push(
        `mailto:mariodev7@gmail.com?Subject=${encodeURI(
          subject
        )}&Body=${encodeURI(description)}`
      );
    } catch (error: any) {
      if (
        confirm(
          'Ocorreu um erro ao enviar o e-mail! Você deseja enviar por uma aba externa?'
        )
      ) {
        router.push('mailto:mariodev7@gmail.com');
      }
      console.error(error.response);
    }
  }

  return (
    <section
      id="contact"
      className="flex flex-col items-center h-screen bg-gray-200 snap-start"
    >
      <div className="flex flex-col w-full h-full max-w-5xl px-2 py-2 md:px-4">
        <div className="flex flex-col justify-center w-full md:justify-start">
          <h1 className="w-full my-2 text-2xl text-center text-gray-800 md:text-4xl">
            Contato
          </h1>
        </div>

        <div className="flex flex-col-reverse justify-center w-full p-4 mt-4 bg-gray-100 rounded-lg md:flex-row">
          {/* Social Media */}
          <aside className="flex flex-col h-full lg:w-3/6">
            <h1 className="hidden mb-4 text-xl text-gray-800 md:block md:text-2xl">
              Redes Sociais
            </h1>

            <ul className="flex flex-row justify-center space-x-4 md:space-x-0 md:space-y-2 md:flex-col">
              <a
                href="http://instagram.com/mariosantosdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center space-x-1 text-gray-700 hover:underline"
              >
                <AiFillInstagram className="text-2xl transition-all duration-300 md:text-xl hover:text-indigo-500" />
                <p className="hidden md:block">Instagram</p>
              </a>
              <a
                href="https://www.linkedin.com/in/mariosantos-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center space-x-1 text-gray-700 hover:underline"
              >
                <AiFillLinkedin className="text-2xl transition-all duration-300 md:text-xl hover:text-indigo-500" />
                <p className="hidden md:block">LinkedIn</p>
              </a>
              <a
                href="https://twitter.com/mariosantosdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center space-x-1 text-gray-700 hover:underline"
              >
                <AiOutlineTwitter className="text-2xl transition-all duration-300 md:text-xl hover:text-indigo-500" />
                <p className="hidden md:block">Twitter</p>
              </a>
              <a
                href="https://github.com/mariosantosdev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-row items-center space-x-1 text-gray-700 hover:underline"
              >
                <AiFillGithub className="text-2xl transition-all duration-300 md:text-xl hover:text-indigo-500" />
                <p className="hidden md:block">Github</p>
              </a>
            </ul>
          </aside>

          {/* Form */}
          <div className="flex flex-col justify-center w-full h-full">
            <h1 className="mb-4 text-xl text-center text-gray-800 md:text-2xl">
              Faça um Orçamento
            </h1>

            <ContactForm onSend={handleSendEmail} />
          </div>
        </div>
      </div>
      <PublicFooter />
    </section>
  );
}
