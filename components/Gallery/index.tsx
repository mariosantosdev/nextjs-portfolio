import Image from 'next/image';
import { Fragment, useState } from 'react';
import PreviewImage from './PreviewImage';

interface IGallerySection {
  images: string[];
}

export default function GallerySection({ images }: IGallerySection) {
  const [displayImage, setDisplayImage] = useState('');

  return (
    <Fragment>
      <section className="flex justify-center px-4 pb-10 bg-gray-200">
        <div className="flex flex-col w-full max-w-5xl md:max-h-[80vh]">
          <main className="flex flex-col lg:w-full">
            <h1 className="mb-4 text-2xl text-gray-800 md:text-4xl">Imagens</h1>
          </main>

          <div className="grid flex-wrap w-full grid-cols-2 gap-4 md:grid-cols-3">
            {images.length ? (
              images.map((image, index) => (
                <div className="flex flex-wrapbg-red-300" key={index}>
                  <button
                    type="button"
                    className="w-full"
                    data-bs-toggle="modal"
                    data-bs-target="#modalPreviewImage"
                    onClick={() => setDisplayImage(image)}
                  >
                    <Image
                      className="block object-cover object-center w-full h-full rounded-lg"
                      alt={`Imagem ${index + 1}`}
                      src={image}
                      width={300}
                      height={250}
                      layout="responsive"
                      objectFit="cover"
                      priority
                    />
                  </button>
                </div>
              ))
            ) : (
              <p className="italic">
                Não foi adicionado imagens para este projeto!
              </p>
            )}
          </div>
        </div>
      </section>
      <PreviewImage image={displayImage} onBlur={() => setDisplayImage('')} />
    </Fragment>
  );
}
