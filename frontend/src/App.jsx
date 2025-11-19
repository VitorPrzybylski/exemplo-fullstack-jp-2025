import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import Users from './pages/Users'
import CreateUser from './pages/Users/create'
import UpdateUser from './pages/Users/update'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/users' element={<Users/>} />
        <Route path='/create/user' element={<CreateUser/>} />
        <Route path='/update/user' element={<UpdateUser/>} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
