export default function AboutSession() {
  return (
    <section
      id="about"
      className="flex flex-col items-center h-screen bg-gray-200 snap-start"
    >
      <div className="flex flex-col w-full h-full max-w-5xl px-2 py-2 md:px-4">
        <h1 className="my-2 text-2xl text-center text-gray-800 md:text-4xl">
          Sobre
        </h1>

        <span className="flex flex-col justify-center h-full space-y-8 text-center text-md md:text-2xl">
          <p>
            Sou um desenvolvedor full-stack, isso quer dizer que desenvolvo
            aplicativos móveis, websites e sistemas back-end (servidores)!
            <br />O meu objetivo é poder entregar para as pessoas a praticidade
            através da tecnologia.
          </p>

          <p>
            Estou na área da programação desde 2016 (aproximadamente{' '}
            {new Date().getFullYear() - 2016} anos). E tive passagens rápidas
            por diversas linguagens de programação por exemplo PHP, C#, .LUA e
            Python e desde 2018 utilizo o JavaScript através do NodeJS, para
            realizar meus trabalhos.
          </p>

          <p>
            Atualmente trabalho com diversas tecnólogias modernas e busco sempre
            me manter o mais atualizado possível, dentre essas diversas
            técnologias estão algumas como: React, NextJS, Redux, Saas,
            TailwindCSS, Styled Components, React-Native, Node.JS, Typescript,
            Express, Jest, Mongoose, Prisma.io, MongoDB, Postgres, Axios,
            Graphql, Docker, Git, Github.
          </p>
        </span>
      </div>
    </section>
  );
}
