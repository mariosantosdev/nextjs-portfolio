import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import React, { FormEvent, useState } from "react";

import api from '../services/api';

export default function SignIn() {
    const routes = useRouter();
    const [passwordInput, setPasswordInput] = useState('');

    async function preventSignIn(e: FormEvent, password: string) {
        e.preventDefault();
        await handleSignIn(password);
    }

    async function handleSignIn(password: string) {
        try {
            const { status, data } = await api.post(`/api/auth`, {
                password
            });

            if (status !== 200) return alert(data.message);

            setCookie(undefined, '@marioportfolio:token', data.token);
            routes.push('/admin');
        } catch (error: any) {
            const defaultError = 'Falha na autenticação.'
            alert(error?.response?.data?.message || defaultError);
            console.error(JSON.stringify(error));
        }
    }

    return (
        <div className="flex justify-center items-center bg-indigo-50 h-screen">
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <div className="text-blueGray-400 text-center my-3 font-bold">
                                    <small>Acessar Painel</small>
                                </div>
                                <form onSubmit={(e) => preventSignIn(e, passwordInput)}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Senha de acesso
                                        </label>
                                        <input
                                            type="password"
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Senha"
                                            value={passwordInput}
                                            onChange={e => setPasswordInput(e.target.value)}
                                        />
                                    </div>
                                    <div className="text-center mt-6">
                                        <button
                                            className="bg-indigo-800 text-white active:bg-indigo-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => handleSignIn(passwordInput)}
                                        >
                                            Entrar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { ['@marioportfolio:token']: token } = parseCookies(ctx);

    if (token) {
        return {
            redirect: {
                destination: '/admin',
                permanent: false,
            }
        }
    }

    return {
        props: {}
    }
}