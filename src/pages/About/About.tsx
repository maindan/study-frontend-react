import Aurora from '@/components/react-bits/Aurora'
import { PageContainer } from '@/components/core/PageContainer/PageContainer'
import RotatingText from '@/components/react-bits/RotatingText'
import ScrollFloat from '@/components/react-bits/ScrollFloat'
import ScrollReveal from '@/components/react-bits/ScrollReveal'
import ScrollVelocity from '@/components/react-bits/ScrollVelocity'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Hexagon } from 'lucide-react'
import React, { useLayoutEffect, useRef } from 'react'

export function About({openLogin}: {openLogin: () => void}) {

  const el = useRef<HTMLDivElement | null>(null)
  const tl = useRef<gsap.core.Timeline | null>(null)

  useLayoutEffect(() => {

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(()=>{
      tl.current = gsap.timeline({
        scrollTrigger: {
          trigger: ".models-items",
          scrub: true,
          start: "top 520px",
          end: "bottom 350px",
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
      <div className="w-full rounded-t-2xl">
        <div className="flex flex-col h-full rounded-t-2xl">
          
          <div className="w-full h-[600px] bg-black flex flex-col items-center justify-center relative rounded-t-2xl">
            <div className="w-full h-full absolute rounded-t-2xl overflow-hidden">
              <Aurora
                colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
                blend={0.5}
                amplitude={1.0}
                speed={0.5}
              />
            </div>
            <div className="flex gap-2 items-center z-10">
              <Hexagon color='white' size={30} />
              <h1 className='text-white font-semibold text-4xl'>Study</h1>
            </div>
            <div className="flex gap-2 items-center mt-3 flex-col sm:flex-row">
              <h2 className="text-white text-3xl sm:text-4xl text-center z-10">Organize seus estudos de forma</h2>
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
          
          <div className="w-full h-40 bg-black px-4 text-center">
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
            <div className="w-1/3 h-40 models-items  p-3 flex items-center" id="model-1">
                <p className='text-white text-2xl font-semibold text-center'>Crie tópicos de estudos</p>
            </div>
            <div className="w-1/3 h-40 models-items p-3 flex items-center" id="model-2">
              <p className='text-white text-2xl font-semibold text-center'>Adicione atividades aos tópicos</p>
            </div>
            <div className="w-1/3 h-40 models-items p-3 flex items-center" id="model-3">
              <p className='text-white text-2xl font-semibold text-center'>Gerêncie seus estudos com método Pomodoro</p>
            </div>
          </div>
          <div className="w-full h-[300px] bg-black rounded-b-2xl flex flex-col items-center justify-start">
            <h3 className='text-white font-bold text-3xl text-center mb-3'>Entre e comece agora a organizar<br/> os seus estudos!</h3>
            <Button variant="secondary" className='cursor-pointer' onClick={openLogin}>Entrar</Button>
          </div>
        </div>
      </div>
    </PageContainer>
  )
}
