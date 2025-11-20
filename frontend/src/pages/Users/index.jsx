import { useEffect, useState } from 'react'
import { deleteUser, getUsers } from '../../api/users'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'
import { toast } from 'react-toastify'

function Users() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    const handleUpdate = async (user) => {
        navigate('/update/user', { state: { user } })
    }

    const handleDelete = async (id) => {
        const response = await deleteUser(id)

        if (response.status !== 204) {
            toast("Erro ao deletar, tente novamente, mais tarde")
            return
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
        <main>
            <div className='user-list'>
                <div>
                    <Link to={'/create/user'}>
                        <button>Criar</button>
                    </Link>
                </div>
                <div className='user header' key='header'>
                    <label>Nome</label>
                    <label>Email</label>
                    <label>Ações</label>
                </div>
                {
                    users.length == 0
                        ? <div className='user'>
                            <label>Não tem ngm</label>
                        </div>
                        : users.map(user =>
                            <div className='user' key={user.id}>
                                <label>{user.nome}</label>
                                <label>{user.email}</label>
                                <div className='actions'>
                                    <button
                                        type='button'
                                        onClick={() => handleUpdate(user)}
                                    >Alterar</button>
                                    <button
                                        type='button'
                                        onClick={() => handleDelete(user.id)}
                                    >Deleta</button>
                                </div>
                            </div>)
                }
            </div>
        </main>
    )
}

export default Users
