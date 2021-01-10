const admin = require('./admin.js')

module.exports = app => {

    app.post('/signup', app.api.users.saveUser)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

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
    app.route('/allteams')
        .get(admin(app.api.teams.getAllTeams))

    app.route('/teams')
        .all(app.configs.passport.authenticate())
        .get(app.api.teams.getTeamsWithoutPlayer)
        .post(app.api.teams.saveTeam)
    
    app.route('/teams/:id')
        .all(app.configs.passport.authenticate())
        .put(app.api.teams.saveTeam)
        .get(app.api.teams.getTeamById)

    app.route('/solicitation')
        .all(app.configs.passport.authenticate())
        .post(app.api.rentSolicitation.makeSolicitation)
        .get(admin(app.api.rentSolicitation.getAllSolicitations))

    app.route('/solicitation/:id')
        .all(app.configs.passport.authenticate())
        .put(app.api.rentSolicitation.aproveSolicitation)
        .delete(app.api.rentSolicitation.cancelSolicitation)
        
}