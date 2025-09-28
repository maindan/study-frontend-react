import React, { useState } from 'react'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useAuthStore } from '@/states/AuthState'
import { Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres")
})

type LoginSchema = z.infer<typeof loginSchema>
type LoginProps = {
  close: () => void
}

export function LoginForm({close}: LoginProps) {
  const {register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({resolver: zodResolver(loginSchema)});
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:8080/";
  const navigate = useNavigate();
  const saveToken = useAuthStore((state) => state.login)

  function handleLogin(data: LoginSchema) {
    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await axios.post(url + "auth", data);
            close();
            saveToken(res.data.token);
            navigate("/tasks");
        } catch(err) {
            console.log(err);
            toast.error("E-mail ou senha inválidos")
        } finally {
            setLoading(false);
        }
    }

    fetchUser();
  }

  return (
    <form className='w-full h-60 flex flex-col items-center gap-8 relative' onSubmit={handleSubmit(handleLogin)}>
        <Input placeholder="E-mail" {...register("email")} className={errors.email?.message? 'border-red-700 border-2':''} />
        {errors.email && <p className='text-red-500 text-sm absolute mt-10 left-0'>{errors.email.message}</p>}
        <Input placeholder="Senha" type="password" {...register("password")} className={errors.password?.message? 'border-red-700 border-2':''} />
        {errors.password && <p className='text-red-500 text-sm absolute mt-26 left-0'>{errors.password.message}</p>}
        <div className='flex gap-2 w-full'>
            <Button variant="secondary" className='cursor-pointer w-full' type="submit" disabled={loading}>Entrar</Button>
        </div>
    </form>
  )
}
