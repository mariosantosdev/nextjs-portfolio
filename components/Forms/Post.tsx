import Image from "next/image";
import { FormEvent, useState, KeyboardEvent } from "react";
import { FaTimes } from 'react-icons/fa';

type PostsData = {
    title: string;
    projectURL: string;
    repoURL: string;
    isVisible: boolean;
    technologies: string[];
    description: string;
}

type PostsUpdateData = {
    title?: string;
    link?: string;
    repository?: string;
    published?: boolean;
    technologies?: string[];
    content?: string;
}

type PostFromDB = {
    id: string;
    title: string;
    content?: string;
    link?: string;
    repository?: string;
    published: boolean,
    cover: string;
    technologies: string[];
}

interface IPostForms {
    onSend?: (post: PostsData, file: File) => Promise<void>;
    onUpdate?: (post: PostsUpdateData, file?: File) => Promise<void>;
    onDelete?: (id: string) => Promise<void>;
    post?: PostFromDB;
}

export default function PostForms(props: IPostForms) {
    const { onSend, onUpdate, onDelete, post } = props;

    const [title, setTitle] = useState(post?.title || '');
    const [projectURL, setProjectURL] = useState(post?.link || '');
    const [repoURL, setRepoURL] = useState(post?.repository || '');
    const [isVisible, setIsVisible] = useState<boolean>(post?.published || true);
    const [file, setFile] = useState<File>();
    const [urlImage, setUrlImage] = useState<string>(post?.cover || null);
    const [technologies, setTechnologies] = useState<string[]>(post?.technologies || []);
    const [description, setDescription] = useState(post?.content || '');

    const handleChangeFile = (files: FileList) => {
        if (files.length <= 0) return;

        setFile(files[0]);
        setUrlImage(null);
    }

    const handleChangeTechnoligies = (rawTechnologies: string) => {
        const rawTechnologiesList = rawTechnologies.split(',');
        const technologiesList = rawTechnologiesList.map(technology => technology.trim());

        setTechnologies(technologiesList);
    }

    const handleKeyDownTechnologies = (e: KeyboardEvent<HTMLInputElement>) => {
        const { key } = e;
        const lastItemTechnologies = technologies[technologies.length - 1];

        if (key === 'Backspace') {
            if (lastItemTechnologies.length >= 1) return;

            e.preventDefault();
            const technologiesCopy = [...technologies];
            technologiesCopy.pop();
            setTechnologies(technologiesCopy);
        }
    }

    function handleCreatePost() {
        if (!title.trim()) return alert('O campo título deve ser preenchido.');
        if (isVisible === undefined) return alert('Informe se o post deve estar vísivel ao público.');
        if (!file) return alert('Selecione uma capa para o post.');
        if (technologies.length <= 0) return alert('Escreva pelo menos uma tecnologia.');

        onSend(
            { title, projectURL, repoURL, isVisible, technologies, description },
            file
        );
    }

    function handleUpdatePost() {
        let data: PostsUpdateData = {};

        if (title !== post.title) data = { ...data, title };
        if (projectURL !== post.link) data = { ...data, link: projectURL };
        if (repoURL !== post.repository) data = { ...data, repository: repoURL };
        if (isVisible !== post.published) data = { ...data, published: isVisible };
        if (technologies !== post.technologies) data = { ...data, technologies };
        if (description !== post.content) data = { ...data, content: description };

        const fileToUpload = (!urlImage && file) && file;

        onUpdate(data, fileToUpload);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (onSend) return handleCreatePost();
        if (onUpdate) return handleUpdatePost();
    }

    return (
        <form className="items-center w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
            {/* TITLE INPUT */}
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 dark:text-white transition-colors duration-500 uppercase after:content-['_*']">
                        Título
                    </label>
                    <input
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Website de ...."
                        type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
            </div>

            {/* URL PROJECT/REPOSITORY */}
            <div className="flex flex-wrap mb-6 -mx-3">
                {/* URL PROJECT */}
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase transition-colors duration-500 dark:text-white">
                        URL do projeto
                    </label>
                    <input
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 transition-colors duration-500 bg-gray-200 border rounded appearance-none dark:text-white focus:outline-none focus:bg-white"
                        placeholder="https://www.projeto.com"
                        type="text"
                        value={projectURL}
                        onChange={e => setProjectURL(e.target.value)}
                    />
                    <p className="text-xs italic text-gray-600 transition-colors duration-500 dark:text-white">URL para ver o projeto na prática.</p>
                </div>
                {/* URL REPOSITORY */}
                <div className="w-full px-3 md:w-1/2">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase transition-colors duration-500 dark:text-white">
                        URL do repositório
                    </label>
                    <input
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 transition-colors duration-500 bg-gray-200 border rounded appearance-none dark:text-white focus:outline-none focus:bg-white"
                        placeholder="https://github.com/..."
                        type="text"
                        value={repoURL}
                        onChange={e => setRepoURL(e.target.value)}
                    />
                    <p className="text-xs italic text-gray-600 transition-colors duration-500 dark:text-white">URL para ver o código do projeto.</p>
                </div>
            </div>

            {/* VISIBLE CHECKBOX/COVER IMAGE */}
            <div className="flex flex-wrap mb-2 -mx-3">
                {/* VISIBLE CHECKBOX */}
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <div className="flex flex-col">
                        <label className="text-xs font-bold tracking-wide text-gray-700 uppercase after:content-['_*'] dark:text-white transition-colors duration-500">
                            Visibilidade
                        </label>
                        <label className="flex items-center mt-3">
                            <input
                                className="mr-2 leading-tight"
                                type="checkbox"
                                checked={isVisible}
                                onChange={e => setIsVisible(e.target.checked)}
                            />
                            <span className="text-xs text-gray-700 transition-colors duration-500 dark:text-white">
                                Deixar público
                            </span>
                        </label>
                    </div>
                </div>

                {/* COVER IMAGE */}
                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase after:content-['_*'] dark:text-white transition-colors duration-500">
                        Capa
                    </label>
                    <div className="relative">
                        <input
                            id="grid-file-input"
                            type="file"
                            accept="image/png, image/jpeg"
                            onChange={e => handleChangeFile(e.target.files)}
                            hidden
                        />
                        <div className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border rounded appearance-none focus:outline-none focus:bg-white">
                            <label htmlFor="grid-file-input" className="italic underline cursor-pointer">
                                Selecionar Capa
                            </label>
                        </div>
                        {urlImage && (
                            <div className="flex items-center justify-between px-2">
                                <div className="flex flex-row items-center w-full">
                                    <Image
                                        src={urlImage}
                                        alt={post.title}
                                        width={32}
                                        height={32}
                                    />
                                    <p className="w-1/2 ml-1 text-xs text-gray-900 truncate transition-colors duration-500 dark:text-white">
                                        Imagem Atual
                                    </p>
                                </div>
                            </div>
                        )}
                        {file && (
                            <div className="flex items-center justify-between px-2">
                                <p className="w-1/2 text-xs text-gray-900 truncate transition-colors duration-500 dark:text-white">{file.name}</p>
                                <button onClick={() => setFile(null)}>
                                    <FaTimes className="text-gray-900 transition-colors duration-500 dark:text-white" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* TECHNOLOGIES */}
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 dark:text-white transition-colors duration-500 uppercase after:content-['_*']">
                        Tecnologias
                    </label>
                    <input
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="ReactJS, ..."
                        value={technologies.join(', ')}
                        onChange={e => handleChangeTechnoligies(e.target.value)}
                        onKeyDown={handleKeyDownTechnologies}
                    />
                    <p className="text-xs italic text-gray-600 transition-colors duration-500 dark:text-white">Separe as tecnologias por uma vírgula</p>
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase transition-colors duration-500 dark:text-white">
                        Descricão
                    </label>
                    <textarea
                        rows={6}
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Website criado para ...."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-end w-full mb-6">
                <button className="p-2 px-8 mx-4 text-center text-white bg-indigo-500 rounded-full hover:bg-indigo-800">
                    {onSend ? 'CRIAR' : 'Atualizar'}
                </button>
                {onUpdate && (
                    <button
                        className="p-2 px-8 text-center text-white bg-red-500 rounded-full hover:bg-red-800"
                        onClick={(e) => { e.preventDefault(); onDelete(post.id); }}
                    >
                        Deletar
                    </button>
                )}
            </div>
        </form>
    )
}