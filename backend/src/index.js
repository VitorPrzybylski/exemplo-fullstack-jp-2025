import express from 'express'
import cors from 'cors'
import router from './router/users.js'
import database from './config/database.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use('/api/v1', router)

const port = 3000 //3001 ou 9090 ou 9000

database.db
    .sync({ force: false })
    .then((_) => {
        app.listen(port, () => {
            console.info("Servidor Rodando na porta " + port)
        })

    })
    .catch((e) => {
        console.log("Nao foi possivel conectar com o banco " + e)
    })
