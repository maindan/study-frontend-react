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
import {motion} from "motion/react"

export function About({openLogin}: {openLogin: () => void}) {
  
  return (
    <div className={`w-12/12 h-full relative text-white scroll-gutter`}>
      <div className="absolute w-full h-full -z-10 overflow-hidden bg-black">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="w-full h-full flex flex-col sm:flex-row items-center justify-center max-w-6xl mx-auto px-5 md:px-8 py-10 gap-2">
        <motion.div 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{
            duration: 0.5,
            delay: 0.4,
            ease: 'easeIn'
          }}
          className="flex flex-col items-center sm:items-start justify-center w-full sm:w-1/2 text-left"
        >
          <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
            Study - transforme seus estudos em progresso real!
          </h2>
          <p className="mt-4 text-base sm:text-md leading-relaxed text-gray-300">
            O <strong>Study</strong> nasceu do desejo de tornar o aprendizado mais leve, eficiente e prazeroso.  
            Mais do que um simples organizador de tarefas, ele é o seu companheiro de jornada para turbinar o foco e a produtividade.  
          </p>
        </motion.div>
        <div className="w-full sm:w-1/2 flex flex-col items-center justify-center gap-2 sm:mt-0">
          {/* <motion.div 
            initial={{x: -20, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{
              duration: 0.5,
              delay: 0.4,
              ease: 'easeIn'
            }}
            className="w-60 h-15 backdrop-blur-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-3xl border border-white/10 flex items-center justify-center">
            <span className="text">Crie tópicos</span>
          </motion.div>
          <motion.div 
            initial={{x: -30, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{
              duration: 0.5,
              delay: 0.8,
              ease: 'easeIn'
            }}
            className="w-60 h-15 ml-10 backdrop-blur-lg bg-gradient-to-br from-green-100/20 to-lime-400/20 rounded-3xl border border-white/10 flex items-center justify-center">
            <span className="">Adicione atividades</span>
          </motion.div>
          <motion.div 
            initial={{x: -40, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{
              duration: 0.5,
              delay: 1.2,
              ease: 'easeIn'
            }}
            className="w-60 h-15 ml-20 backdrop-blur-lg bg-gradient-to-br from-green-100/20 to-lime-400/20 rounded-3xl border border-white/10 flex items-center justify-center">
            <span className="">Gerencie seus estudos</span>
          </motion.div> */}
        </div>
      </div>
      <div className="w-full h-screen bg-black z-10"></div>


        {/* <div className="flex w-full h-full z-0 flex-col sm:flex-row">

          <h2 className="text-4xl text-white">Study, o seu gerenciador de estudos!</h2>
        </div>

        <div className="h-screen bg-white">
          <h2>Oláaaaaaaaaaaaa</h2>
        </div> */}
        
        {/* <div className="w-full bg-black flex flex-col items-center justify-center relative">
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
        </div> */}

        {/* <div className="w-full h-90 bg-black">
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
        </div> */}
    </div>
  )
}
