import { FormEvent, useState } from "react";
import Spinner from "../Spinner";

export type ContactData = {
    name: string;
    email: string;
    description: string;
}

interface IContactForm {
    onSend?: (contact: ContactData) => Promise<void>;
    loading?: boolean;
}

export default function ContactForm(props: IContactForm) {
    const { onSend, loading } = props;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    function handleCreatePost() {
        if (!name.trim()) return alert('O campo nome deve ser preenchido.');
        if (!email.trim()) return alert('O campo email deve ser preenchido.');
        if (!description.trim()) return alert('O campo descrição deve ser preenchido.');
        if (description.trim().split('').length < 20) return alert('O campo descrição deve ter no mínimo 20 caracteres');

        onSend({ name, email, description });
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (onSend) return handleCreatePost();
    }

    return (
        <form className="items-center w-full max-w-lg mx-auto" onSubmit={handleSubmit}>
            {/* NAME INPUT */}
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 dark:text-white transition-colors duration-500 uppercase after:content-['_*']">
                        Nome
                    </label>
                    <input
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Digite aqui seu nome"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
            </div>

            {/* NAME INPUT */}
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 dark:text-white transition-colors duration-500 uppercase after:content-['_*']">
                        E-mail
                    </label>
                    <input
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Digite aqui seu e-mail para contato"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
            </div>

            {/* DESCRIPTION */}
            <div className="flex flex-wrap mb-6 -mx-3">
                <div className="w-full px-3">
                    <span className="flex flex-row justify-between text-gray-700 uppercase transition-colors duration-500 dark:text-white">
                        <label className="block mb-2 text-xs font-bold tracking-wide  after:content-['_*']">
                            Descricão
                        </label>
                        <label>{description.trim().split('').length}</label>
                    </span>
                    <textarea
                        rows={6}
                        className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500"
                        placeholder="Descrição do seu projeto..."
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-end w-full mb-6">
                <button disabled={loading} className="p-2 px-8 mx-4 text-center text-white bg-indigo-500 rounded-full disabled:hover:bg-indigo-300 disabled:cursor-wait disabled:bg-indigo-300 hover:bg-indigo-800">
                    {loading ? (
                        <Spinner />
                    ) : 'Enviar'}
                </button>
            </div>
        </form>
    )
}