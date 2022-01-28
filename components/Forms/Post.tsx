import { FormEvent, useEffect, useState } from "react";
import { FaTimes } from 'react-icons/fa';

type PostsData = {
    title: string;
    projectURL: string;
    repoURL: string;
    isVisible: boolean;
    file: File;
    technologies: string[];
    description: string;
}


interface IPostForms {
    onSend: (post: PostsData) => Promise<void>;
}

export default function PostForms(props: IPostForms) {
    const { onSend } = props;

    const [title, setTitle] = useState('');
    const [projectURL, setProjectURL] = useState('');
    const [repoURL, setRepoURL] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [file, setFile] = useState<File>();
    const [technologies, setTechnologies] = useState<string[]>([]);
    const [description, setDescription] = useState('');

    useEffect(() => console.log(technologies), [technologies]);

    const handleChangeFile = (files: FileList) => {
        if (files.length <= 0) return;

        setFile(files[0]);
    }

    const handleChangeTechnoligies = (rawTechnologies: string) => {
        const rawTechnologiesList = rawTechnologies.split(',');
        const technologiesList = rawTechnologiesList.map(technology => technology.trim());

        setTechnologies(technologiesList);
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!title.trim()) return alert('O campo título deve ser preenchido.');
        if (isVisible === undefined) return alert('Informe se o post deve estar vísivel ao público.');
        if (!file) return alert('Selecione uma capa para o post.');
        if (technologies.length <= 0) return alert('Escreva pelo menos uma tecnologia.');

        onSend({ title, projectURL, repoURL, isVisible, file, technologies, description });
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
                <button className="p-2 px-8 text-center text-white bg-indigo-500 rounded-full hover:bg-indigo-800">
                    CRIAR
                </button>
            </div>
        </form>
    )
}