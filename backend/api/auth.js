const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const { ExtractJwt } = require('passport-jwt')

module.exports = app => {
    const signin = async (req, res) => {
        if(!req.body.email || !req.body.password){
            return res.status(400).send('Informe o email e a senha')   
        }
        const user = await app.db('users')
            .where({ email: req.body.email })
            .first()
        
        if(!user) return res.status(400).send('Email não cadastrado no sistema')
    
        const confirmPassword = bcrypt.compareSync(req.body.password, user.password)
    
        if(!confirmPassword) return res.status(401).send('Senha inválida')
    
        const timeNow = Math.floor(Date.now() / 1000) // Data do login em segundos
    
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
            nickname: user.nickname,
            cell: user.cell,
            walletAdress: user.walletAdress,
            hasTeam: user.hasTeam,
            admin: user.admin,
            iat: timeNow,
            exp: timeNow + (60 * 60 * 24) // Token expira em 1 dia
        }
    
        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })
    }

    const validateToken = async (req, res) => {

        if (!req.headers.authorization) return res.send({valid: false})

        const token = req.headers.authorization.split(' ')[1]

        try {
            if(token) {
                const payload = jwt.decode(token, authSecret)
                if(new Date(payload.exp * 1000) > new Date()) {
                    return res.send({valid: true})
                }
            }
        } catch (error) {
            // Algum problema com o token(expirado, etc...)
        }

        res.send({valid: false})
    }

    return { signin, validateToken }

}