import { lazy, Suspense } from "react";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
}

const Image = ({ src, alt, className }: ImageProps) => {
  const LazySVG = lazy(() => import(`./${src}`));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazySVG alt={alt} className={className} />
    </Suspense>
  );
};

export default Image;
