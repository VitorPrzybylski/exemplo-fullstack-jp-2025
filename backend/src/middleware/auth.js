import jwt from 'jsonwebtoken'
import ServiceUser from '../service/users.js'
const JWD_SEGREDO = "a-string-secret-at-least-256-bits-long"

export default function (roles = []) {
    return async (req, res, next) => {
        try {
            const token = req.headers['authorization']
            if (!token) {
                throw new Error("sem permissao")
            }
            const decoded = jwt.verify(token.split(' ')[1], JWD_SEGREDO)

            const user = await ServiceUser.FindOne(decoded.id)

            if(roles.length && !roles.includes(user.permissao)){
                throw new Error("Voce nao tem permissao para realizar essa açao")
            }

            req.headers.user = user
            next()


        } catch (erro) {
            res.status(403).send({
                data: null,
                msg: erro.message,
                error: true
            })

        }
    }
}
// export default async function authMiddleware(req, res, next) {
//     



//     // //se der certo
//     // //deu errado

// }
