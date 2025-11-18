import ServiceUser from '../service/users.js'
class ControllerUser {
      async FindAll(_, res) {
        try {
            const users = await ServiceUser.FindAll()
            res.status(200).send({ users })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    async FindOne(req, res) {
        try {
            const id = req.params.id
            const user = await ServiceUser.FindOne(id)

            res.send({ user })
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    async Create(req, res) {
        try {
            const { nome, senha, email, ativo } = req.body
            await ServiceUser.Create(nome, senha, email, ativo,1)
            res.status(201).send()
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    async Update(req, res) {
        const id = req.params.id
        const { nome, senha, email, ativo } = req.body
        try {
            await ServiceUser.Update(id, nome, senha, email, ativo)
            res.status(200).send()
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    Delete(req, res) {
        const id = req.params.id
        try {
            ServiceUser.Delete(id)
            res.status(204).send()
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
    async Login(req, res) {
        try {
            const { email, senha } = req.body
            const token = await ServiceUser.Login(email, senha)
            res.send({token:token})
        } catch (error) {
            res.status(500).send({ error: error.message })
        }
    }
}

export default new ControllerUser()