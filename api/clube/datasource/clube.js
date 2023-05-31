const { RESTDataSource  } = require('apollo-datasource-rest')

class ClubeAPI extends RESTDataSource {
    constructor() {
        super()
        this.baseURL = 'http://localhost:3000'
        this.customResponse = {
            code: 200,
            message: "Operação efetuada com sucesso"
        }
    }

    async getClubes() {
        const clubes = await this.get('/clubes')
        return clubes.map(async clube => ({
            id: clube.id,
            nome: clube.nome,
            simboloImageURL: clube.simboloImageURL,
            mascoteImageURL: clube.mascoteImageURL,
            ativo: clube.ativo,
            createdAt: clube.createdAt,
            origem: await this.get(`/origens/${clube.origem}`)
        }));
    }

    async getClubeById(id) {
        const clube = await this.get(`/clubes/${id}`)
        clube.origem = await this.get(`/origens/${clube.origem}`)
        return clube
    }

    async addClube(clube) {
        const clubes = await this.get("/clubes")
        
        clube.id = clubes[clubes.length-1].id + 1;
        
        const origem = await this.get(`/origens/?origem=${clube.origem}`)
        
        await this.post('clubes', {...clube, origem: origem[0].id})
        return ({
            ...clube,
            origem: origem[0]
        })
    }

    async updateClube(data) {
        const origem = await this.get(`/origens/?origem=${data.clube.origem}`)

        await this.put(`clubes/${data.id}`, {...data.clube, origem: origem[0].id})
           
        return ({
            ...this.customResponse,
            clube: {
                ...data.clube,
                origem: origem[0]
            }
        })
    }

    async deleteClube(id) {
        await this.delete(`clubes/${id}`)
        return this.customResponse
    }
}

module.exports = ClubeAPI