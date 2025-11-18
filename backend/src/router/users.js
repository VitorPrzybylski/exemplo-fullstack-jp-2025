import express from 'express'
import ControllerUser from '../controller/users.js'
import authMiddleware from '../middleware/auth.js'

const router =express.Router()

router.post('/login',ControllerUser.Login)
router.get('/users', ControllerUser.FindAll) //pegar todos
router.get('/user/:id',ControllerUser.FindOne)//pegar um
router.post('/user',ControllerUser.Create)//criar um
router.put('/user/:id',ControllerUser.Update)//alterar um
router.delete('/user/:id',ControllerUser.Delete)//deletar um
export default router
