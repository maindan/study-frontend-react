import React, { useState } from 'react'
import {z} from 'zod'
import {zodResolver} from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/states/AuthState'
import api from '@/core/security/interceptor'
import { useProfileStore } from '@/states/ProfileState'

const registerSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres"),
  name: z.string().min(5, "O nome precisa ter pelo menos 5 caracteres"),
  dailyTimeGoal: z
    .number()
    .min(1, "Informe a meta de estudos diária"),
})

type RegisterSchema = z.infer<typeof registerSchema>
type RegisterProps = {
  openLogin: () => void
}

export function RegisterForm({openLogin}: RegisterProps) {
  const {register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({resolver: zodResolver(registerSchema)});
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:8080/";
  const navigate = useNavigate();
  const saveToken = useAuthStore((state) => state.login);
  const saveProfile = useProfileStore((state) => state.setProfile)

  function handleRegister(data: RegisterSchema) {
    const userData = {
      email: data.email,
      password: data.password
    };

    const profileData = {
      profile: {
        name: data.name
      },
      daily_time_goal: data.dailyTimeGoal
    }

    const fetchUser = async () => {
        setLoading(true);
        try {
            await axios.post(url + "user/create", userData);
            const res = await axios.post(url + "auth", data);
            saveToken(res.data.token);
            const profileRes = await api.post('profile', profileData);
            saveProfile(profileRes.data.profile);
            navigate('/tasks')
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
    <form className='w-full h-90 flex flex-col items-center gap-8 relative' onSubmit={handleSubmit(handleRegister)}>
        <Input placeholder="E-mail" {...register("email")} type="email" className={errors.email?.message? 'border-red-700 border-2':''} />
        {errors.email && <p className='text-red-500 text-sm absolute mt-10 left-0'>{errors.email.message}</p>}
        <Input placeholder="Nome" type="text" {...register("name")} className={errors.name?.message? 'border-red-700 border-2':''} />
        {errors.name && <p className='text-red-500 text-sm absolute mt-26 left-0'>{errors.name.message}</p>}
        <Input placeholder="Meta de estudo diário" type="number" min={1} {...register("dailyTimeGoal", { valueAsNumber: true })} className={errors.dailyTimeGoal?.message? 'border-red-700 border-2':''} />
        {errors.dailyTimeGoal && <p className='text-red-500 text-sm absolute mt-26 left-0'>{errors.dailyTimeGoal.message}</p>}
        <Input placeholder="Senha" type="password" {...register("password")} className={errors.password?.message? 'border-red-700 border-2':''} />
        {errors.password && <p className='text-red-500 text-sm absolute mt-26 left-0'>{errors.password.message}</p>}
        <div className='flex gap-2 w-full'>
            <Button variant="outline" className='cursor-pointer w-1/2 bg-transparent' type="submit" disabled={loading}>Registrar</Button>
            <Button variant="ghost" className='cursor-pointer w-1/2' type="button" onClick={openLogin}>Fazer Login</Button>
        </div>
    </form>
  )
}
