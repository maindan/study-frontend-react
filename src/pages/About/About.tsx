import Aurora from '@/components/react-bits/Aurora'
import { PageContainer } from '@/components/core/PageContainer/PageContainer'
import RotatingText from '@/components/react-bits/RotatingText'
import ScrollFloat from '@/components/react-bits/ScrollFloat'
import ScrollReveal from '@/components/react-bits/ScrollReveal'
import ScrollVelocity from '@/components/react-bits/ScrollVelocity'
import { Button } from '@/components/ui/button'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AlarmClockCheck, CircleCheckBig, Hexagon, PackagePlus } from 'lucide-react'
import React, { useEffect, useLayoutEffect, useRef } from 'react'
import {motion, useScroll} from "motion/react"

export function About({openLogin}: {openLogin: () => void}) {

  const containerRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const box = boxRef.current;

    if (!container || !box) return;

    gsap.fromTo(
      box,
      { width: "10rem", height: "12rem" },
      {
        width: "100%",
        height: "100%",
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "-=300",
          end: "+=500",
          scrub: true,
        },
      }
    );

  }, []);

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
            delay: 0.2,
            ease: 'easeIn'
          }}
          className="flex flex-col items-center sm:items-start justify-center w-full sm:w-1/2 text-left sticky"
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
        
        </div>
      </div>

      <div className="w-full h-[120vh] bg-black relative border-0 sm:border-b-1 border-[#9b23ea] flex items-center justify-center" ref={containerRef}>
        <div 
          ref={boxRef}
          className="w-40 h-50 bg-gradient-to-b from-[#5f72bd] to-[#9b23ea] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        ></div>
        <span 
          className="text-4xl sm:text-5xl md:text-4xl font-bold italic z-10 uppercase text-center max-w-4xl px-4 poppins"
        >
          TRANSFORME O FOCO EM RESULTADO.
          <br className="hidden sm:block" />
          COMECE SEU PROGRESSO.
        </span>
      </div>
      <div className="w-full h-[300vh] bg-gradient-to-b from-[#9b23ea] to-[#5f72bd] relative px-5">
        <div className="w-full h-1/3 flex flex-col sm:flex-row">
            <div className="w-full relative text-center py-35">
              <motion.div 
              initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 0.4}}
              className="sticky flex items-center flex-col top-35 font-normal text-3xl sm:text-4xl">
                <PackagePlus size={80} />
                <span className="poppins">Gerenciamento por tópicos</span>
              </motion.div>
            </div>
            <div className="w-full h-full p-5 flex items-center">
              <motion.span initial={{opacity: 0}} whileInView={{opacity: 1}} className="text-lg sm:text-2xl">
                No Study, a sua jornada de aprendizado é estruturada através de um sistema intuitivo de Gerenciamento por Tópicos. 
                Crie Tópicos específicos para qualquer tema, desde "Cálculo II" até "História Moderna", e desdobre-os em Atividades e tarefas detalhadas. 
                Com o acompanhamento de progresso em tempo real, você visualiza instantaneamente o percentual de conclusão das atividades e o quanto falta para dominar cada assunto. 
                Transforme grandes metas em etapas gerenciáveis e mantenha a motivação alta ao ver seu avanço.
              </motion.span>
            </div>
        </div>
        <div className="w-full h-1/3 flex flex-col sm:flex-row">
            <div className="w-full relative text-center py-35">
              <motion.div 
              initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 0.4}}
              className="sticky flex items-center flex-col top-35 font-normal text-3xl sm:text-4xl">
                <CircleCheckBig size={80} />
                <span className="poppins">Gerenciamento por tópicos</span>
              </motion.div>
            </div>
            <div className="w-full h-full p-5 flex items-center">
              <motion.span initial={{opacity: 0}} whileInView={{opacity: 1}} className="text-lg sm:text-2xl">
                Dentro de cada Tópico principal, o Study permite que você adicione Atividades, transformando-as em subitens essenciais para desmembrar as informações. 
                Essas Atividades funcionam como etapas micro-focadas: seja "Revisar Equações de 2º Grau", "Fazer Exercícios da Página 45" ou "Assistir à Aula 
                sobre Revolução Francesa". Essa granularidade permite que você destrinche o tema principal em passos práticos, garantindo que nenhum detalhe seja 
                negligenciado no seu plano de estudos. Cada atividade concluída alimenta diretamente a barra de progresso do Tópico, fornecendo uma visão clara do domínio do conteúdo.
               </motion.span>
            </div>
        </div>
        <div className="w-full h-1/3 flex flex-col sm:flex-row">
            <div className="w-full relative text-center py-35">
              <motion.div 
              initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{delay: 0.4}}
              className="sticky flex items-center flex-col top-35 font-normal text-3xl sm:text-4xl gap-5">
                <AlarmClockCheck size={80} />
                <span className="poppins">Gerenciamento por tópicos</span>
              </motion.div>
            </div>
            <div className="w-full h-full p-5 flex items-center">
              <motion.span initial={{opacity: 0}} whileInView={{opacity: 1}} className="text-lg sm:text-2xl">
                O Study potencializa sua produtividade ao aplicar o renomado Método Pomodoro diretamente em suas Atividades. Para cada subitem do seu Tópico, 
                você pode iniciar um ciclo de concentração cronometrado, garantindo que o tempo dedicado seja de alta qualidade e livre de distrações. 
                Nosso sistema de Pomodoro não apenas gerencia seus blocos de estudo e pausas curtas, mas também registra o tempo real gasto em cada atividade. 
                Assim, você não só melhora o foco, como também adquire dados valiosos para otimizar seu planejamento e entender exatamente onde seu tempo de estudo está sendo investido.
              </motion.span>
            </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b to-[#9b23ea] from-[#5f72bd] px-10">
          <span className="text-2xl poppins font-normal text-center">Inicie agora sua jornada até o sucesso!</span>
          <Button className='mt-3 cursor-pointer' onClick={openLogin}>Entrar</Button>
      </div>
    </div>
  )
}
