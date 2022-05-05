import Image from 'next/image';

interface IPreviewImage {
  image: string;
  onBlur: () => void;
}

export default function PreviewImage({ image, onBlur }: IPreviewImage) {
  return (
    <div
      className="fixed top-0 left-0 hidden w-full h-full overflow-x-hidden overflow-y-auto outline-none modal fade"
      id="modalPreviewImage"
      tabIndex={-1}
      aria-labelledby="modalPreviewImageLabel"
      aria-hidden="true"
    >
      <div className="relative w-auto pointer-events-none modal-dialog">
        <div className="relative flex flex-col w-full text-current bg-white border-none rounded-md shadow-lg outline-none pointer-events-auto modal-content bg-clip-padding">
          <div className="flex items-center justify-between flex-shrink-0 p-4 border-b border-gray-200 modal-header rounded-t-md">
            <h5
              className="text-xl font-medium leading-normal text-gray-800"
              id="modalPreviewImageLabel"
            >
              Visualizar Imagem
            </h5>
            <button
              type="button"
              className="box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 btn-close focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="relative p-4 modal-body">
            {image ? (
              <Image
                src={image}
                alt="Previsualização de imagem"
                width={1280}
                height={720}
                layout="raw"
              />
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-end flex-shrink-0 p-4 border-t border-gray-200 modal-footer rounded-b-md">
            <button
              type="button"
              className="px-6 py-2.5 bg-indigo-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-indigo-700 hover:shadow-lg focus:bg-indigo-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-indigo-800 active:shadow-lg transition duration-150 ease-in-out"
              data-bs-dismiss="modal"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
