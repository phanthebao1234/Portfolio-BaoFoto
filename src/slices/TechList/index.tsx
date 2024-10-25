'use client'
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import React, { useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import {gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger)
/**
 * Props for `TechList`.
 */
export type TechListProps = SliceComponentProps<Content.TechListSlice>;

/**
 * Component for "TechList" Slices.
 */
const TechList = ({ slice }: TechListProps): JSX.Element => {
  const component = useRef(null)
  useEffect(()=> {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          markers: true,
        }
      })
    }, component)
    return ()=> ctx.revert() // Clean up
  })
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="overflow-hidden"
      ref={component}
    >
      <Bounded as='div'>
        <Heading className="mb-8" size="xl" as="h2">{slice.primary.heading}</Heading>
      </Bounded>
      {slice.items.map(({tech_name, tech_color}, index )=> (
        <div key={index} className="tect-row mb-8 flex items-center justify-center gap-5 text-slate-800" aria-label={tech_name || undefined}>
          {Array.from({length: 15}, (_, index) => (
            <React.Fragment key={index}>
              <span className="tech_item text-8xl font-extrabold uppercase tracking-tighter" style={{color: index === 7 && tech_color ? tech_color : 'inherit'}}>
                {tech_name}
              </span>
              <span className="text-3xl">
                <MdCircle />
              </span>
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};

export default TechList;
