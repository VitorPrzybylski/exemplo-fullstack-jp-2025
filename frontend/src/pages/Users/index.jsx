import { useEffect, useState } from 'react'
import { getUsers } from '../../api/users'
import { Link } from 'react-router-dom'

function Users() {
    const [conteudo, setConteudo] = useState(<>Carregando</>)

    async function TranformaEmLista() {
        const todosUsuarios = await getUsers()
        console.log(todosUsuarios)

        return todosUsuarios.map(user =>
            <div className='user' key={user.id}>
                <label>{user.nome}</label>
                <label>{user.email}</label>

                <div className='actions'>
                    <button>Alterar</button>
                    <button>Deletar</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        async function carregar() {
            setConteudo(
                await TranformaEmLista()
            )
        }
        carregar()
    }, [])

    return (
        // <main>
        //     <div className='lista-principal'>
        //         {conteudo}
        //     </div>
        // </main>
        <main>
            <div className='user-list'>
                <Link to={'/create/user'}>
                
                <button type='button'>Criar</button>
                </Link>
                <div className='user header' key='header'>
                    <label>Nome</label>
                    <label>Email</label>
                    <label>Ações</label>
                </div>
                {conteudo}
            </div>
        </main>
    )
}

export default Users
