import Image from 'next/image';
import { Fragment, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';

interface IUploadImage {
  images: any[];
  onChange: (files: any[]) => void;
  onDelete: (index: number) => void;
  onClear: () => void;
}

export default function UploadImage({
  images,
  onChange,
  onDelete,
  onClear,
}: IUploadImage) {
  const inputRef = useRef(null);

  return (
    <Fragment>
      <input
        ref={inputRef}
        id="image-file-input"
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files as unknown as File[])}
        multiple
        hidden
      />
      <div className="flex flex-col w-full min-h-[150px] px-4 py-3 mb-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-white focus:border-gray-500">
        <main className="grid flex-1 grid-cols-4 gap-4 p-2 bg-gray-300 rounded">
          {images?.length
            ? images.map((file, index) => {
                if (!file) return;

                const alreadyUpload = typeof file === 'string';
                const fileName = alreadyUpload
                  ? `Imagem ${index + 1}`
                  : file?.name || '';
                const fileURL = alreadyUpload
                  ? file
                  : URL.createObjectURL(file);

                return (
                  <div
                    className="relative flex flex-col items-center justify-center gap-2"
                    key={index}
                  >
                    <button
                      type="button"
                      className="absolute top-0 right-0 z-20 text-red-500 transition-colors hover:text-red-700 md:top-2 md:right-2"
                      onClick={() => onDelete(index)}
                    >
                      <FaTimes />
                    </button>

                    <div className="relative w-9 h-9 md:w-12 md:h-12">
                      <Image src={fileURL} alt={fileName} layout="fill" />
                    </div>

                    <p className="max-w-full truncate">{fileName}</p>
                  </div>
                );
              })
            : null}
        </main>
        <footer className="flex flex-col justify-center w-full gap-2 mt-4 md:flex-row">
          <div
            className="p-2 text-center text-white bg-indigo-700 rounded-full cursor-pointer"
            onClick={() => inputRef.current.click()}
          >
            Adicionar Imagem
          </div>
          <div
            className="p-2 text-center text-white bg-red-500 rounded-full cursor-pointer"
            onClick={onClear}
          >
            Limpar Imagens
          </div>
        </footer>
      </div>
    </Fragment>
  );
}
