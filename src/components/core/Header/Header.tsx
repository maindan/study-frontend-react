import { Button } from "@/components/ui/button"
import { NavLink, useNavigate } from "react-router-dom";
import styles from './Header.module.css'
import { Hexagon } from "lucide-react";
import { useAuthStore } from "@/states/AuthState";

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
        <header className="w-full h-15 flex items-center justify-between px-5 border">
            <div className="min-w-4xl mx-auto">
                <div className={`w-full flex items-center ${checkAuth() ? 'justify-between' : 'justify-evenly'}`}>
                    <div className="flex gap-2 items-center">
                        <Hexagon />
                        <h4 className="text-xl font-bold">Study</h4>
                    </div>
                    {!checkAuth() &&                 
                        <nav className="flex gap-3">
                            <NavLink to={checkAuth() ? 'tasks' : '/'} className={({isActive}) => isActive? styles.active : styles.link}>Home</NavLink>
                            <NavLink to="/sobre" className={({isActive}) => isActive? styles.active : styles.link}>Sobre</NavLink>
                            <NavLink to="/contato" className={({isActive}) => isActive? styles.active : styles.link}>Contato</NavLink>
                        </nav>
                    }
                    <Button size="sm" onClick={checkAuth()? signout : openLogin} className="w-[80px] cursor-pointer">{checkAuth()? 'Sair':'Login'}</Button>
                </div>
            </div>
        </header>
    )
}