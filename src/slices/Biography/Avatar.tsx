"use client";
import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type AvatarProps = {
  image: ImageField;
  className: string;
  alt: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef(null);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        { opacity: 0, scale: 1.4 },
        { scale: 1, opacity: 1, duration: 1.3, ease: "power3.inOut" }
      );
      window.onmouseover = (e) => {
          
          if (!component.current) {
            console.log("print here");
          return;
        }
        const componentReact = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        console.log(componentReact);
        
        const componentCenterX = componentReact.left + componentReact.width / 2;
        const componentPercent = {
          x: (e.clientX - componentCenterX) / componentReact.width / 2,
        };
        // console.log(componentPercent);
        
        const distFromCenter = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.Out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
            },
            0
          )
          .to(
            ".hightlight",
            {
              opacity: distFromCenter - 0.7,
              x: (-10 + 20) & componentPercent.x,
              duration: 0.5,
            },
            0
          );
      };
    }, component);
  }, []);
  return (
    <div ref={component} className={clsx("relative h-full w-full", className)}>
      <div className="avatar aspect-square overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0">
        <PrismicNextImage
          field={image}
          className="avatar-image h-full w-full object-cover"
          alt=""
          imgixParams={{ q: 90 }}
          priority
        />
        <div className="hightlight absolute inset-0 hidden w-full scale-110 bg-radient-to-fr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
