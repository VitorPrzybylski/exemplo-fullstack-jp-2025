import { useState } from "react"
import { updateUser } from "../../api/users";
import { useNavigate, Link } from "react-router-dom";
const INITIAL_STATE = {
    nome: '',
    email: '',
    senha: '',
    ativo: true
}
export default function UpdateUser() {
    const navigate = useNavigate()
    const [user, setUser] = useState(INITIAL_STATE)
    const handleChange = (e) => {
        const { id, value } = e.target;
        setUser({
            ...user,
            [id]: value
        })
    }
    const handleReset = (e) => {
        e.preventDefault()
        setUser(INITIAL_STATE)
    }
    const handleSave = async (e) => {
        e.preventDefault()
        const response = await updateUser(user)
        //validar os dados
        if (response.status === 201) {
            navigate('/users')
        } else {
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
                    <button
                        type="reset"
                        onClick={handleReset}
                    >LIMPAR</button>
                    <button type="submit" onClick={handleSave}>ENVIAR</button>
                </form>
            </main>
            <Link to='/users'>
                <button>
                    Navegar para API
                </button>
            </Link>
        </>
    )
}