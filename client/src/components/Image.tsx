interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ src, alt, className }: ImageProps) => {
  return <img loading="lazy" src={src} alt={alt} className={`${className} `} />;
};

export default Image;
