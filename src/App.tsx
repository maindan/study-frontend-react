// import { Button } from "./components/ui/button"
// import { Input } from "./components/ui/input"
// import {Table, TableBody, TableHead, TableHeader, TableRow, TableCell, TableFooter} from "./components/ui/table"
// import { Search, PlusCircle } from "lucide-react"
// import { DialogComponent } from "./components/shared/Dialog/DialogComponent"
// import { PaginationComponent } from "./components/shared/Dialog/PaginationComponent"
// import { useState } from "react"
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import {Home} from "./pages/Home/Home";
import { About } from "./pages/About/About";
import { Header } from "./components/core/Header/Header";
import {PrivateRouter} from "./components/core/PrivateRouter/PrivateRouter";
import { DrawerComponent } from "./components/shared/DrawerComponent/DrawerComponent";
import { LoginForm } from "./components/core/LoginForm/LoginForm";
import { useState } from "react";
import { Tasks } from "./pages/Tasks/Tasks";


export function App() {

  const [showLogin, setShowLogin] = useState(false);

  return (
    <BrowserRouter>
      <Header openLogin={() => setShowLogin(true)} />
        
      <DrawerComponent title="Entrar" subtitle="Informe seus dados para prosseguir" open={showLogin} onOpenChange={setShowLogin}>
        <LoginForm close={() => setShowLogin(false)} />
      </DrawerComponent>

      <Routes>
        <Route path="/" element={<Home openLogin={() => setShowLogin(true)} />}/>
        <Route path="/sobre" element={<About />} />
        {/* <Route path="/rifa/:id" element={<Riffle />} /> */}
        <Route path="/tasks" element={
          <PrivateRouter>
            <Tasks />
          </PrivateRouter>
          } />
      </Routes>
      
    </BrowserRouter>


    // <div className="p-6 max-w-4xl mx-auto">
    //   <h1 className="text-3xl font-bold mb-2">Produtos</h1>
    //   <div className="flex items-center justify-between mb-2">
    //   <form className="flex items-center gap-2">
    //     <Input name="id" placeholder="ID do pedido" />
    //     <Input name="name" placeholder="Nome do produto" />
    //     <Button type="submit" variant="link" >
    //       <Search/>
    //       Filtrar Resultados
    //       </Button>
    //   </form>
    //   <Button onClick={() => setOpen(true)}>
    //     <PlusCircle/>
    //     Novo Produto
    //   </Button>
    //   <DialogComponent 
    //     title="Adicionar Produtos"
    //     subtitle="Preencha os campos abaixo"
    //     saveBtn={() => {alert("salvando...")}}
    //     open={open}
    //     onOpenChange={setOpen}
    //   >
    //     <p>Dados aqui</p>

    //   </DialogComponent>
    //   </div>

    //   <div className="border rounded-sm p-2">
    //     <Table>
    //       <TableHeader>
    //         <TableHead>ID</TableHead>
    //         <TableHead>Produto</TableHead>
    //         <TableHead>Preço</TableHead>
    //       </TableHeader>
    //       <TableBody>
    //         {Array.from({length: 10}).map((_, i) => {
    //           return(
    //             <TableRow key={i}>
    //               <TableCell>2ef81a</TableCell>
    //               <TableCell>Produto {i}</TableCell>
    //               <TableCell>R$ 298,00</TableCell>
    //             </TableRow>
    //           )
    //         })}
    //       </TableBody>
    //       <TableFooter>
    //       </TableFooter>
    //     </Table>
    //   </div>
    //   <div className="mt-2">
    //     <PaginationComponent />
    //   </div>

    // </div>
  )
}