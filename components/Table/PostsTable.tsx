import React from "react";

type PostsType = {
    id: string;
    title: string;
    content: string;
    published: boolean;
    repository: string;
}

interface ICardTableProps {
    title: string;
    haveActionRow?: boolean;
    rows: PostsType[];
}

export default function PostsTable({
    title,
    rows,
    haveActionRow,
}: ICardTableProps) {
    return (
        <div className="flex flex-col w-full min-w-0 mb-6 text-white break-words duration-500 rounded shadow-lg dark:text-black bg-slate-900 dark:bg-white">
            <div className="px-4 py-3 mb-0 border-0 rounded-t">
                <div className="flex flex-wrap items-center">
                    <div className="flex-1 flex-grow w-full max-w-full px-4">
                        <h3 className="text-lg font-semibold text-blueGray-700 ">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>
            <div className="block w-full overflow-x-auto overflow-y-auto max-h-80">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                        <tr>
                            <th
                                className={`
                                        px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                                        bg-blueGray-50 text-blueGray-500 border-blueGray-100
                                    `}
                            >
                                Titulo
                            </th>
                            <th
                                className={`
                                        px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                                        bg-blueGray-50 text-blueGray-500 border-blueGray-100
                                        
                                    `}
                            >
                                Conteúdo
                            </th>
                            <th
                                className={`
                                        px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                                        bg-blueGray-50 text-blueGray-500 border-blueGray-100
                                        
                                    `}
                            >
                                Publicado
                            </th>
                            <th
                                className={`
                                        px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                                        bg-blueGray-50 text-blueGray-500 border-blueGray-100
                                        
                                    `}
                            >
                                Repositório
                            </th>
                            {haveActionRow && (
                                <th
                                    className={`
                                        px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left
                                        bg-blueGray-50 text-blueGray-500 border-blueGray-100
                                        
                                    `}
                                >
                                    Ação
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(content => (
                            <tr key={content.id}>
                                <th className="flex items-center p-4 px-6 text-xs text-left align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                    <span className="ml-3 font-bold text-blueGray-600 ">
                                        {content.title}
                                    </span>
                                </th>
                                <td className="max-w-xs p-4 px-6 text-xs truncate align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                    {content.content}
                                </td>
                                <td className="flex flex-row items-center p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                    <div
                                        className={`
                                            w-3 h-3 mr-2 rounded-full
                                            ${(content.published ? 'bg-green-500' : 'bg-red-500')}
                                        `}
                                    />
                                    {content.published ? 'Sim' : 'Não'}
                                </td>
                                <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                    <a
                                        target='_blank'
                                        rel="noreferrer"
                                        href={content.repository}
                                        className="text-white underline duration-500 dark:text-black"
                                    >
                                        Link
                                    </a>
                                </td>
                                {haveActionRow && (
                                    <td className="p-4 px-6 text-xs align-middle border-t-0 border-l-0 border-r-0 whitespace-nowrap">
                                        <a
                                            href={`/post/edit/${content.id}`}
                                            className="text-white underline duration-500 dark:text-black"
                                        >
                                            Editar
                                        </a>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
