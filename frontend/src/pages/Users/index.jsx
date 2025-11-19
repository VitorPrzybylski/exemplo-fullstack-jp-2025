import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../api/users'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function Users() {
    const [users, setUsers] = useState([])

    const handleDelete = async (id) => {
        const response = await deleteUser(id)
        console.log(id)
        if (response.status !== 204) {
            toast("Erro ao deletar, tente mais tarde")
        }
        setUsers(users => users.filter(user => user.id !== id))
    }


    useEffect(() => {
        async function carregar() {
            const allUsers = await getUsers()
            setUsers(allUsers)
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
                <Link to={'/update/user'}>

                    <button type='button'>Alterar</button>
                </Link>
                <div className='user header' key='header'>
                    <label>Nome</label>
                    <label>Email</label>
                    <label>Ações</label>
                </div>
                {
                    users.length == 0
                        ?<div className='user'>
                        <label>NAO TEM NINGUEM</label>
                        </div>
                        :users.map(user =>
                            <div className='user' key={user.id}>
                                <label>{user.nome}</label>
                                <label>{user.email}</label>

                                <div className='actions'>
                                    <button
                                      type='button'
                                        onClick={() => handleUpdate(user.id)}
                                        >Alterar</button>
                                    <button
                                        type='button'
                                        onClick={() => handleDelete(user.id)}
                                    >Deletar</button>
                                </div>
                            </div>
                        )}
            </div>
        </main>
    )
}

export default Users
