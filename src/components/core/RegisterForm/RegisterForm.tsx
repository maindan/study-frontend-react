import React, { useState } from 'react'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import api from '@/core/security/interceptor'
import axios from 'axios'
import { toast } from 'sonner'

const registerSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres")
})

type RegisterSchema = z.infer<typeof registerSchema>
type RegisterProps = {
  openLogin: () => void
}

export function RegisterForm({openLogin}: RegisterProps) {
  const {register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({resolver: zodResolver(registerSchema)});
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:8080/";

  function handleRegister(data: RegisterSchema) {
    const fetchUser = async () => {
        setLoading(true);
        try {
            await axios.post(url + "user/create", data)
            openLogin();
            toast.success("Usuário criado")
        } catch(err) {
            console.log(err);
            toast.error("Erro ao criar usuário")
        } finally {
            setLoading(false);
        }
    }

    fetchUser();
  }

  return (
    <form className='w-full h-60 flex flex-col items-center gap-8 relative' onSubmit={handleSubmit(handleRegister)}>
        <Input placeholder="E-mail" {...register("email")} className={errors.email?.message? 'border-red-700 border-2':''} />
        {errors.email && <p className='text-red-500 text-sm absolute mt-10 left-0'>{errors.email.message}</p>}
        <Input placeholder="Senha" type="password" {...register("password")} className={errors.password?.message? 'border-red-700 border-2':''} />
        {errors.password && <p className='text-red-500 text-sm absolute mt-26 left-0'>{errors.password.message}</p>}
        <div className='flex gap-2 w-full'>
            <Button variant="outline" className='cursor-pointer w-1/2 bg-transparent' type="submit" disabled={loading}>Registrar</Button>
            <Button variant="ghost" className='cursor-pointer w-1/2' type="button" onClick={openLogin}>Fazer Login</Button>
        </div>
    </form>
  )
}
