const admin = require('./admin.js')

module.exports = app => {

    app.post('/signup', app.api.users.saveUser)
    app.post('/signin', app.api.auth.signin)
    app.get('/validateToken', app.api.auth.validateToken)

    app.route('/users')
        .all(app.configs.passport.authenticate())
        .get(admin(app.api.users.getAllUsers))
        .post(admin(app.api.users.saveUser))

    app.route('/users/:id')
        .all(app.configs.passport.authenticate())
        .put(app.api.users.saveUser)
        .get(app.api.users.getUserById)

    // Modo para um Administrador pegar todos os times,
    // independente de que já tenha player ou não
    app.route('/allTeams')
        .all(app.configs.passport.authenticate())
        .get(admin(app.api.teams.getAllTeams))

    app.route('/teams')
        .get(app.api.teams.getTeamsWithoutPlayer)
        .all(app.configs.passport.authenticate())
        .post(app.api.teams.saveTeam)

    app.route('/teams/byOwner/:id')
        .all(app.configs.passport.authenticate())
        .get(app.api.teams.getTeamsByOwnerId)
    
    app.route('/teams/:id')
        .get(app.api.teams.getTeamById)
        .all(app.configs.passport.authenticate())
        .put(app.api.teams.saveTeam)

    app.route('/solicitation')
        .all(app.configs.passport.authenticate())
        .post(app.api.rents.makeSolicitation)
        .get(admin(app.api.rents.getAllSolicitations))

    app.route('/solicitation/:id')
        .all(app.configs.passport.authenticate())
        .put(app.api.rents.aproveSolicitation)
        .delete(app.api.rents.cancelSolicitation)

    app.route('/rent')
        .all(app.configs.passport.authenticate())
        .get(admin(app.api.rents.getAllApprovedRents))
    
    app.route('/rent/:id')
        .all(app.configs.passport.authenticate())
        .delete(app.api.rents.cancelRent)

    app.route('/cards')
        .all(app.configs.passport.authenticate())
        .post(app.api.cards.saveCards)
    
    app.route('/cards/:name/:type')
        .all(app.configs.passport.authenticate())
        .post(app.api.cards.saveCard)

}