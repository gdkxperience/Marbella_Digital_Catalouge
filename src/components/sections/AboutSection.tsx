"use client";

import React from "react";
import { getImageUrl } from "@/lib/supabase";
import SupabaseImage from "@/components/ui/SupabaseImage";

const aboutText = [
  "Marbella е български бутиков бранд за луксозни мраморни и гранитни маси, основан от дизайнер с дълбока и дългогодишна връзка с естествения камък. Брандът се ражда в семейната работилница, където занаятът се предава през поколенията. От първоначалната концепция и дизайн, през техническия чертеж до финалната изработка - всяко изделие се създава в нашия собствен цех.",
  "Marbella е специализирана в изцяло custom изработка на маси от естествен камък - от скулптурни трапезни модели до изискани холни, помощни маси и други изделия, създадени да допълват дизайнерски интериори. Работим с внимателно подбрани мрамори и гранити от различни държави, съчетани с прецизна обработка.",
  "Вярваме, че както в природата няма два еднакви камъка, така не съществуват и два еднакви проекта. Естествената шарка, структура и характер на всяка плоча гарантират че всяка маса е уникален акцент в пространството. Дизайнерският подход, личната комуникация, гъвкавостта в размерите и срокът на производство ни позволяват да работим ефективно с интериорни дизайнери и архитекти.",
];

const whyReasons: React.ReactNode[] = [
  <>Създадени <span className="font-semibold">от дизайнер за дизайнери</span></>,
  <>Срок на производство: <span className="font-semibold">15 - 20 работни дни</span></>,
  <><span className="font-semibold">Лично отношение</span> към всяка поръчка</>,
  <><span className="font-semibold">Директна комуникация</span> с производителя</>,
  <>Работа с <span className="font-semibold">подбрани мрамори и гранити</span> от различни държави</>,
  <>Производство в <span className="font-semibold">собствен семеен цех</span></>,
  <>Възможност за <span className="font-semibold">мостри</span> на камък</>,
  <><span className="font-semibold">Гъвкавост</span> при размери и детайли</>,
  <>Малки серии и <span className="font-semibold">бутиков подход</span></>,
  <><span className="font-semibold">Всяко изделие е уникално</span> - заради естествения характер на камъка</>,
];

export default function AboutSection() {
  return (
    <section id="about" className="overflow-hidden">
      {/* Full-bleed editorial spread */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[50vh] md:min-h-[70vh]">
        {/* Left — full bleed image */}
        <div className="relative min-h-[40vh] lg:min-h-full img-zoom">
          <SupabaseImage
            src={getImageUrl("about_us_cover.jpg")}
            alt="Marbella workshop"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent lg:hidden" />
        </div>

        {/* Right — text column */}
        <div className="bg-white flex flex-col justify-center px-6 py-12 md:px-10 lg:px-14 xl:px-20">
          {/* Section title — right-aligned */}
          <div className="flex justify-end mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight tracking-[0.15em] uppercase text-foreground leading-none select-none">
              ЗА НАС
            </h2>
          </div>

          <div className="w-12 h-px bg-foreground/20 mb-8" />

          <div className="space-y-4 text-xs text-foreground/90 leading-[2]">
            {aboutText.map((p, i) => (
              <p key={i}>
                {i === 0 ? (
                  <>
                    <span className="text-foreground font-medium">Marbella</span>{" "}
                    {p.replace("Marbella ", "")}
                  </>
                ) : (
                  p
                )}
              </p>
            ))}
          </div>

          {/* Why Choose Marbella */}
          <div className="mt-10">
            <h3 className="text-xs md:text-sm tracking-[0.25em] uppercase font-normal text-foreground mb-6 text-center">
              ЗАЩО ДА ИЗБЕРЕТЕ <span className="font-bold">MARBELLA</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5">
              {whyReasons.map((reason, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <span className="text-[8px] text-foreground/70 mt-[5px] flex-shrink-0">◆</span>
                  <p className="text-xs text-foreground/85 leading-[1.8] tracking-wide">
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
