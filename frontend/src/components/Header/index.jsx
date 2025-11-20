import { Link } from 'react-router-dom'
import './style.css'
import { useContext } from 'react'
import { authContext } from '../../assets/auth/Context'

export default function Header() {
    //pegar o token
    const { token } = useContext(authContext)

    return (
        <header>
            <h1>Minha API</h1>
            <nav>
                <Link to='/'>
                    <button>
                        Inicio
                    </button>
                </Link>
                {
                    !token
                        ? null
                        : <Link to='/users'>
                            <button>
                                Usuários
                            </button>
                        </Link>
                }
                <Link to='/login'>
                    <button>
                        Login
                    </button>
                </Link>
            </nav>
        </header>
    )
}