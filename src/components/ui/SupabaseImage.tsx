"use client";

import Image, { ImageProps } from "next/image";

type SupabaseImageProps = Omit<ImageProps, "unoptimized"> & {
  src: string;
};

export default function SupabaseImage({ src, alt, ...props }: SupabaseImageProps) {
  const isPlaceholder = !src || src.startsWith("data:");

  if (isPlaceholder) {
    if (props.fill) {
      return (
        <div className="absolute inset-0 bg-warm-gray flex items-center justify-center">
          <span className="text-[10px] text-muted-light tracking-[0.2em] uppercase">
            Image
          </span>
        </div>
      );
    }
    return (
      <div
        className="bg-warm-gray flex items-center justify-center rounded"
        style={{
          width: typeof props.width === "number" ? props.width : "100%",
          height: typeof props.height === "number" ? props.height : "auto",
          aspectRatio: props.width && props.height ? `${props.width}/${props.height}` : "1/1",
        }}
      >
        <span className="text-[8px] text-muted-light">IMG</span>
      </div>
    );
  }

  return <Image src={src} alt={alt} {...props} />;
}
