import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import { Hexagon } from "lucide-react";
import { useAuthStore } from "@/states/AuthState";
import {motion} from 'motion/react'

type HeaderProps = {
    openLogin?: () => void;
}

export function Header({openLogin}: HeaderProps) {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    function signout(): void {
        logout();
        localStorage.clear();
        navigate("/");
    }

    return(
        <header className="w-11/12 sm:w-6/12 border-1 border-white/10 rounded-2xl backdrop-blur-lg bg-white/5 translate-x- h-17 flex items-center justify-between px-4 fixed z-10 top-0 left-1/2 -translate-x-1/2 mt-3 sm:mt-5">
            <div className="w-full mx-auto text-white">
                <div className={`w-full flex items-center ${checkAuth() ? 'justify-between' : 'justify-between'}`}>
                    <div className="flex gap-2 items-center">
                        <Hexagon size={22} />
                        <h4 className="text-xl font-bold">Study</h4>
                    </div>
                    <div className="flex justify-end items-center gap-2">
                        {!checkAuth() &&                 
                            <nav className="flex gap-3">
                                <NavLink to={checkAuth() ? 'tasks' : '/'} className={({isActive}) => isActive? styles.active : styles.link}>Home</NavLink>
                                <NavLink to="/sobre" className={({isActive}) => isActive? styles.active : styles.link}>Sobre</NavLink>
                                {/* <NavLink to="/contato" className={({isActive}) => isActive? styles.active : styles.link}>Contato</NavLink> */}
                            </nav>
                        }
                        <Button size="sm" onClick={checkAuth()? signout : openLogin} className="w-[80px] cursor-pointer">{checkAuth()? 'Sair':'Login'}</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}