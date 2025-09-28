import { Button } from "@/components/ui/button"
import { NavLink } from "react-router-dom";
import styles from './Header.module.css'
import { Hexagon } from "lucide-react";

type HeaderProps = {
    openLogin?: () => void;
}

export function Header({openLogin}: HeaderProps) {
    return(
        <header className="w-full h-15 flex items-center justify-between px-5 border">
            <div className="w-full flex items-center justify-evenly">
                <div className="flex gap-2 items-center">
                    <Hexagon />
                    <h4 className="text-xl font-bold">Study</h4>
                </div>
                <nav className="flex gap-3">
                    <NavLink to="/" className={({isActive}) => isActive? styles.active : styles.link}>Home</NavLink>
                    <NavLink to="/sobre" className={({isActive}) => isActive? styles.active : styles.link}>Sobre</NavLink>
                    <NavLink to="/contato" className={({isActive}) => isActive? styles.active : styles.link}>Contato</NavLink>
                </nav>
                <Button size="sm" onClick={openLogin} className="w-[80px] cursor-pointer">Login</Button>
            </div>
        </header>
    )
}