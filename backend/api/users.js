const bcrypt = require('bcrypt-nodejs')

module.exports = app => {

    const { exists, notExists, isEqual } = app.api.validation

    // Método para criptografar a senha dos usuários.
    const encryptPassword = (password) => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    // Método para criar e também atualizar os dados do usuário. 
    const saveUser = async (req, res) => {

        const user = { ...req.body }

        // Verificar se o id veio na requisição.
        // E setando no user.id
        if(req.params.id) user.id = req.params.id

        if(!req.originalUrl.startsWith('/users')) user.admin = false
        if(!req.user || !req.user.admin) user.admin = false

        try {
            // Métodos para validação da requisição.
            exists (user.name, 'Nome não informado.')
            exists (user.email, 'Email não informado.')
            exists (user.password, 'Senha não informada.')
            exists (user.confirmPassword, 'Confirme a senha.')
            isEqual (user.password, user.confirmPassword, 'Senhas não conferem.')
            exists (user.walletAdress, 'Informe a carteira de crypto.')
            exists (user.cell, 'Informe o seu número.')
            exists (user.nickname, 'Informe o seu nick.')

            // Verificando se o email já não consta no banco de dados.
            const userFromDataBase = await app.db('users')
                .where({ email: user.email })
                .first()

            if(!user.id) notExists(userFromDataBase, 'Email de usuário já cadastrado') 
            

        } catch (msg) {
            return res.status(400).send(msg)
        }
        
        user.password = encryptPassword(req.body.password)
        delete user.confirmPassword

        // Aqui caso o id esteja setado, é aonde será diferido o método.
        if (user.id) {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(error => res.status(500).send(error))
        } else {
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(error => res.status(500).send(error))
        }
    }

    const getAllUsers = (req, res) => {
        app.db('users')
            .select('id', 'name', 'nickname', 'email', 'cell', 'walletAdress', 'hasTeam')
            .orderBy('id')
            .then(users => res.json(users))
            .catch(error => res.send(500).send(error))
    }

    const getUserById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'nickname', 'email', 'cell', 'walletAdress', 'hasTeam')
            .where({ id: req.user.id }) // Usando o payload do passport
            .first()
            .then(user => res.json(user))
            .catch(error => res.send(500).send(error))
    }

    return { getAllUsers, saveUser, getUserById }
}