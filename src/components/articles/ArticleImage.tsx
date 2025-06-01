// src/components/articles/ArticleImage.tsx
'use client';

import Image from 'next/image';

interface ArticleImageProps {
  image: string;
  title: string;
}

export default function ArticleImage({ image, title }: ArticleImageProps) {
  return (
    <div className="relative h-64 md:h-96 w-full overflow-hidden rounded-lg mb-8">
      <Image
        src={image || 'https://placehold.co/800x400/EBF4FF/7F9CF5?text=No+Image'}
        alt={title}
        fill
        className="object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://placehold.co/800x400/EBF4FF/7F9CF5?text=Img+Error';
        }}
      />
    </div>
  );
}