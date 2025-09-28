// import { PageContainer } from '@/components/core/PageContainer/PageContainer';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from "./Home.module.css"
import { Hexagon } from 'lucide-react';
import { DrawerComponent } from '@/components/shared/DrawerComponent/DrawerComponent';
import { RegisterForm } from '@/components/core/RegisterForm/RegisterForm';
import { useAuthStore } from '@/states/AuthState';

type HomeProps = {
  openLogin: () => void
}

export function Home({openLogin}: HomeProps) {

  const checkAuth = useAuthStore((state) => state.checkAuth)
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    if(checkAuth()) navigate("/tasks")
  }, [])

  function onOpenLogin(): void {
    setShowRegister(false);
    openLogin();
  }
  

  return (

      <div className={`w-11/12 h-10/12 mx-auto mt-7 border-2 rounded-2xl ${styles.container}`}>
        <DrawerComponent title="Registre-se" subtitle="Informe seus dados para prosseguir" open={showRegister} onOpenChange={setShowRegister}>
          <RegisterForm  openLogin={onOpenLogin} />
        </DrawerComponent>
        <div className={styles.stars}></div>
        <div className="w-full h-full flex flex-col items-center justify-center gap-5 px-4">
          <div className="flex items-center gap-2 text-2xl">
            <h1 className='font-bold'>Study</h1>
            <Hexagon />
          </div>
          <p className='text-3xl text-center sm:text-start'>Organize seu aprendizado, alcance seus objetivos.</p>
          <div className='flex gap-2'>
            <Button variant="default" className='cursor-pointer' onClick={() => setShowRegister(true)}>Criar conta</Button>
            <Button variant="secondary" onClick={() => navigate('/sobre')} className='cursor-pointer'>Saiba mais</Button>
          </div>
        </div>
      </div>
  )
}
