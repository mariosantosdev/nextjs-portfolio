import React from "react";

export default function Footer() {
    return (
        <footer className="w-full py-4 bg-transparent">
            <div className="container px-4 mx-auto">
                <hr className="mb-4 border-b-1 border-white-200" />
                <div className="flex justify-center w-full md:justify-between">
                    <div className="flex items-center justify-center w-full py-1 text-sm font-semibold text-center text-white-500 md:text-left">
                        <span className="py-1 text-sm font-semibold text-black duration-500 dark:text-white">
                            {`Copyright © ${new Date().getFullYear()} | Mário Santos`}
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}