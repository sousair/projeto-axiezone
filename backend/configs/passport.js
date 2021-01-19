const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt

module.exports = app => {
    const params = {
        secretOrKey: authSecret,    
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? user = {
                id: user.id,
                name: user.name,
                email: user.email,
                nickname: user.nickname,
                cell: user.cell,
                walletAdress: user.walletAdress,
                hasTeam: user.hasTeam,
                admin: user.admin
            } : false)) // Mudando para retornar um usuário e ter acesso nas req.user
            .catch(error => done(error, false ))
    })

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}
