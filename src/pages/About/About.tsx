import { PageContainer } from '@/components/core/PageContainer/PageContainer'
import RotatingText from '@/components/RotatingText'
import ScrollFloat from '@/components/ScrollFloat'
import ScrollReveal from '@/components/ScrollReveal'
import ScrollVelocity from '@/components/ScrollVelocity'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hexagon } from 'lucide-react'
import React, { useLayoutEffect, useRef } from 'react'

export function About() {

  const el = useRef<HTMLDivElement | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(()=>{
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: ".models-items",
          scrub: true,
          markers: true,
          start: "top 600px",
          end: "bottom 450px"
        }
      })
      .fromTo("#model-1", {
        opacity: 0,
        x: -160,
      }, {
        opacity: 1,
        x: 0
      })
      .fromTo("#model-2", {
        opacity: 0,
        y: 160,
      }, {
        opacity: 1,
        y: 0
      })
      .fromTo("#model-3", {
        opacity: 0,
        x: 160,
      }, {
        opacity: 1,
        x: 0
      })
    }, el)

    gsap.killTweensOf("models-items")

  }, [])

  return (
    <PageContainer>
      <div className="w-full relative rounded-t-2xl">
        <div className="flex flex-col h-full">
          
          <div className="w-full h-[600px] bg-black rounded-t-2xl flex flex-col items-center justify-center">
            <div className="flex gap-2 items-center">
              <Hexagon color='white' size={30} />
              <h1 className='text-white font-semibold text-4xl'>Study</h1>
            </div>
            <div className="flex gap-2 items-center mt-3 flex-col sm:flex-row">
              <h2 className="text-white text-3xl sm:text-4xl text-center">Organize seus estudos de forma</h2>
              <RotatingText
                texts={['Simples', 'Produtiva', 'Intuitiva']}
                mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-0.5 sm:py-1 md:py-1 justify-center rounded-md text-3xl font-semibold"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2500}
              />
            </div>
          </div>

          <div className="w-full h-90 bg-black">
            <ScrollVelocity
              texts={['Study', 'Aprenda com qualidade']} 
              velocity={20} 
              className="custom-scroll-text text-white"
            />
          </div>

          <div className="w-full h-[600px] bg-black px-6">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={15}
              blurStrength={10}
              textClassName="text-white px-5 text-xl"
            >
              O Study nasceu para ajudar estudantes e profissionais a focarem no que importa: 
              aprender mais em menos tempo, com organização, clareza e disciplina.
            </ScrollReveal>
          </div>
          
          <div className="w-full h-50 bg-black flex justify-center">
            <ScrollFloat
              animationDuration={1}
              ease='back.inOut(2)'
              scrollStart='center bottom+=50%'
              scrollEnd='bottom bottom-=40%'
              stagger={0.03}
              textClassName='text-white'
            >
              Study
            </ScrollFloat>
          </div>

          <div className="w-full h-[600px] bg-black flex items-center justify-center gap-3 models px-3" ref={el}>
            <div className="w-1/3 h-40 bg-white models-items" id="model-1"></div>
            <div className="w-1/3 h-40 bg-white models-items" id="model-2"></div>
            <div className="w-1/3 h-40 bg-white models-items" id="model-3"></div>
          </div>
          <div className="w-full h-90 bg-black"></div>
          <div className="w-full h-90 bg-black"></div>
        </div>
      </div>
    </PageContainer>
  )
}
