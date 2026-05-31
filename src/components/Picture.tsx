import type { ProjectImage } from "../data/projects";

interface PictureProps {
  dir: string;
  image: ProjectImage;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}

/** <picture> com AVIF -> WebP -> JPG (fallback). Base path em /projetos. */
export default function Picture({
  dir,
  image,
  className,
  imgClassName,
  loading = "lazy",
}: PictureProps) {
  const base = `/projetos/${dir}/${image.file}`;
  return (
    <picture className={className}>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={`${base}.jpg`}
        alt={image.alt}
        width={image.w}
        height={image.h}
        loading={loading}
        decoding="async"
        className={imgClassName}
      />
    </picture>
  );
}
