import { useState } from "react"
import { Link } from "react-router-dom"
import { createUser } from "../../api/users";
import { useNavigate } from "react-router-dom";
export default function CreateUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        nome: '',
        email: '',
        senha: '',
        ativo: true
    })
    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser({
            ...user,
            [id]: value
        })
    }

    const handleSave = async(e) => {
        e.preventDefault()
        const response = await createUser(user)
        //validar os dados
        if(response.status===201){
            navigate('/users')
        }else{
            console.log(response)    
        }
    }


    return (
        <>
            <main>
                <form>
                    <div>
                        <label>Nome: </label>
                        <input type="text" name="nome" id="nome" value={user.nome} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Email: </label>
                        <input type="text" name="email" id="email" value={user.email} onChange={handleChange} />
                    </div>
                    <div>
                        <label>Senha: </label>
                        <input type="password" name="senha" id="senha" value={user.senha} onChange={handleChange} />
                    </div>
                    <button type="reset">LIMPAR</button>
                    <button type="submit" onClick={handleSave}>ENVIAR</button>
                </form>
            </main>

        </>
    )
}