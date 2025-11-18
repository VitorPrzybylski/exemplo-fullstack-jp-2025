import User from '../model/users.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const SALT = 10
const JWD_SEGREDO = "a-string-secret-at-least-256-bits-long"


class ServiceUser {
    async FindAll() {
        return User.findAll()
    }
    async FindOne(id) {
        //verificar se o index é valido .lenfh
        if (!id) {
            throw new Error("Favor informar ID")
        }
        const user = await User.findByPk(id)
        if (!user) {
            throw new Error("Usuario nao encontrado, id: " + id)

        }

        return user
    }
    async Create(nome, senha, email, ativo, permissao) {
        if (!nome || !senha || !email) {
            throw new Error("Favor preencer todods os campos")

        }
        const senhaCriptografada = await bcrypt.hash(String(senha), SALT)
        await User.create({
            nome, senha: senhaCriptografada, email, ativo, permissao
        })
    }
    async Update(id, nome, senha, email, ativo) {
        //verificar se o index e o nome é valido .lenfh
        if (!id) {
            throw new Error("Informar ID")
        }
        const user = await User.findByPk(id)
        if (!user) {
            throw new Error("Usuario nao foi encontrado")
        }

        user.nome = nome
        //troca a senha, e quando recebe ela, criptografa, se já estiver criptografada, colocar a mesma
        user.senha = senha
            ? await bcrypt.hash(String(senha), SALT)
            : user.senha

        user.email = email
        user.ativo = ativo

        await user.save()
    }
    async Delete(id) {
        if (!id) {
            throw new Error("ID nao encontrado")
        }
        const user = await User.findByPk(id)
        if (!user) {
            throw new Error("User nao encontrado")
        }
        user.destroy(id)
    }
    async Login(email, senha) {
        if (!email || !senha) {
            throw new Error("email ou senha invalidos")
        }
        const user = await User.findOne({ where: { email } })
        if (
            !user
            || !(await bcrypt.compare(String(senha), user.senha))
        ) {
            throw new Error("email ou senha invalidos")
        }
        return jwt.sign({ id: user.id, nome: user.nome, permissao: user.permissao }, JWD_SEGREDO, { expiresIn: 60 * 60 })
    }

}
export default new ServiceUser()