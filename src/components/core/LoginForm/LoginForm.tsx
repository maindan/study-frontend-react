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
import { useProfileStore } from '@/states/ProfileState'
import { useStudyStore } from '@/states/StudyState'
import api from '@/core/security/interceptor'

const loginSchema = z.object({
  email: z.email("E-mail inválido"),
  password: z.string().min(8, "A senha precisa ter pelo menos 8 caracteres")
})

type LoginSchema = z.infer<typeof loginSchema>
type LoginProps = {
  close: () => void
}

export function LoginForm({close}: LoginProps) {
  const url = "http://159.112.180.77:8080/";
  const {register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({resolver: zodResolver(loginSchema)});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const saveToken = useAuthStore((state) => state.login);
  const saveProfile = useProfileStore((state) => state.setProfile);
  const saveStudyState = useStudyStore((state) => state.setStudy);

  function handleLogin(data: LoginSchema) {
    const fetchUser = async () => {
        setLoading(true);
        try {
            const res = await axios.post(url + "auth", data);
            close();
            saveToken(res.data.token);
            const profileRes = await api.get(url + "profile");
            saveProfile(profileRes.data)
            const studyRes = await api.get(url + "study_state");
            saveStudyState(studyRes.data);
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
