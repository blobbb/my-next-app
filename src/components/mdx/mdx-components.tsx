import clsx from "clsx";
import type { AnchorHTMLAttributes, HTMLAttributes, ImgHTMLAttributes } from "react";
import type { MDXComponents } from "mdx/types";
import Image, { type ImageProps } from "next/image";

function H2(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      className={clsx(
        "mt-12 text-3xl font-semibold text-white",
        "after:mt-3 after:block after:h-px after:w-16 after:bg-gradient-to-r",
        "after:from-cyan-400/70 after:to-transparent",
        props.className
      )}
    />
  );
}

function H3(props: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={clsx(
        "mt-8 text-2xl font-semibold text-white",
        props.className
      )}
    />
  );
}

function Paragraph(props: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={clsx("mt-4 text-base leading-relaxed text-slate-200", props.className)}
    />
  );
}

function Anchor(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={clsx(
        "text-cyan-200 underline decoration-dotted underline-offset-4 transition hover:text-white",
        props.className
      )}
    />
  );
}

function Pre(props: HTMLAttributes<HTMLPreElement>) {
  return (
    <pre
      {...props}
      className={clsx(
        "relative mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-night-800/80 p-5 font-mono text-sm text-slate-100",
        props.className
      )}
    />
  );
}

function Code(props: HTMLAttributes<HTMLElement>) {
  return (
    <code
      {...props}
      className={clsx(
        "rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-cyan-200",
        props.className
      )}
    />
  );
}

function Figure(props: HTMLAttributes<HTMLElement>) {
  return (
    <figure
      {...props}
      className={clsx(
        "my-6 overflow-hidden rounded-3xl border border-white/10 bg-white/5",
        props.className
      )}
    />
  );
}

function Figcaption(props: HTMLAttributes<HTMLElement>) {
  return (
    <figcaption
      {...props}
      className={clsx(
        "px-4 py-3 text-center text-sm text-slate-300",
        props.className
      )}
    />
  );
}

function toNumber(value?: string | number) {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : undefined;
  }
  return undefined;
}

function MDXImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { alt = "", src, width, height, className, style, title } = props;

  if (!src) {
    return null;
  }

  const imageProps: ImageProps = {
    alt,
    src,
    width: toNumber(width) ?? 1280,
    height: toNumber(height) ?? 720,
    className: clsx("h-auto w-full rounded-[28px] object-cover", className),
    style: style ?? {},
    priority: false,
  };

  return (
    <figure className="my-6 overflow-hidden rounded-[32px] border border-white/10 bg-white/5">
      <Image
        {...imageProps}
        alt={imageProps.alt}
        sizes="(max-width: 768px) 100vw, 768px"
        loading="lazy"
      />
      {title ? (
        <figcaption className="px-4 py-3 text-center text-sm text-slate-300">
          {title}
        </figcaption>
      ) : null}
    </figure>
  );
}

export const mdxComponents: MDXComponents = {
  h2: H2,
  h3: H3,
  p: Paragraph,
  a: Anchor,
  pre: Pre,
  code: Code,
  figure: Figure,
  figcaption: Figcaption,
  img: (props) => <MDXImage {...props} />,
};
