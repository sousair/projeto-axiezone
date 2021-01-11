const axios = require('axios')

const apiUrl = 'https://axieinfinity.com/api/v2'

module.exports = app => {
    const getAxiesTeam = async (team, ethAdress) => {

        // Documentação da API encontrada em https://pacxiu.github.io/AxieInfinityAPI/
        const requesUrl = `${apiUrl}/addresses/${ethAdress}/axies`
    
        try {
            await axios.get(requesUrl)
                .then(resp => team.axies = resp.data.axies)
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error) 
        }
    
        // Nem toda informação obtida dos axies é relevante, por isso o filter é importante
        const axiesArr = team.axies.map((axie) => {
            return {
                id: axie.id,
                name: axie.name,
                class: axie.class,
                // Mesma coisa se aplica as partes, a fim de indentificar a imagem de um banco de dados,
                // o necessário vai ser somente o tipo e o nome da parte
                parts: axie.parts.map((part) => { 
                    return {
                        name: part.name,
                        type : part.type
                    }

                }),
                image: axie.image,
                stats: axie.stats
            }
        })

        return {
            ...team,
            axies: axiesArr
        }
    }

    return { getAxiesTeam }
}