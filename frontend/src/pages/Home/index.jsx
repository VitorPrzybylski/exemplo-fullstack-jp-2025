import { Link } from "react-router-dom"

function Home() {
    return (
        <>
            Outras informações e um
            <Link to='/users'>
                <button>
                    Navegar para API
                </button>
            </Link>
        </>
    )
}

export default Home