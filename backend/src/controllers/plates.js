import PlatesDataAccess from "../dataAccess/plates.js"
import { ok, serverError, badRequest, notFound } from "../helpers/httpResponses.js"
import { ObjectId } from 'mongodb'

export default class PlatesControllers {
    constructor() {
        this.dataAccess = new PlatesDataAccess()
    }

    async getPlates() {
        try {
            const plates = await this.dataAccess.getPlates()
            return ok(plates)
        } catch (error) {
            return serverError(error)
        }
    }

    async getPlateById(plateId) {
        // Validação inicial do ID (boa prática)
        if (!plateId) {
            return badRequest('O ID do prato é obrigatório.')
        }
        if (!ObjectId.isValid(plateId)) {
            return badRequest('Formato de ID inválido.')
        }

        try {
            const plate = await this.dataAccess.getPlateById(plateId) // Chama o método da camada de dados
            if (!plate) {
                // Se o DataAccess retornar null (prato não encontrado), enviamos 404
                return notFound('Prato não encontrado.')
            }
            return ok(plate) // Retorna o prato encontrado
        } catch (error) {
            // Captura qualquer erro inesperado durante a operação
            return serverError(error)
        }
    }

    async getAvailablePlates() {
        try {
            const plates = await this.dataAccess.getAvailablePlates()
            return ok(plates)
        } catch (error) {
            return serverError(error)
        }
    }

    async addPlate(plateData) {
        try {
            const result = await this.dataAccess.addPlate(plateData)
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async deletePlate(plateId) {
        if (!plateId) {
            return badRequest('O ID do prato é obrigatório.')
        }
        if (!ObjectId.isValid(plateId)) {
            return badRequest('Formato de ID inválido.')
        }
        try {
            const result = await this.dataAccess.deletePlate(plateId)
            if (!result) {
                return notFound('Prato não encontrado.')
            }
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updatePlate(plateId, plateData) {
        if (!plateId) {
            return badRequest('O ID do prato é obrigatório.')
        }
        if (!ObjectId.isValid(plateId)) {
            return badRequest('Formato de ID inválido.')
        }
        try {
            const result = await this.dataAccess.updatePlate(plateId, plateData)
            if (!result) {
                return notFound('Prato não encontrado.')
            }
            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}