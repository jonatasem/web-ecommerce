import { ok, serverError, notFound } from "../helpers/httpResponses.js"; // Importa helpers para respostas HTTP
import UsersDataAccess from "../dataAccess/users.js";

export default class UsersControllers {
    constructor() {
        this.dataAccess = new UsersDataAccess();
    }

    // Lógica para obter usuários
    async getUsers() {
        try {
            const users = await this.dataAccess.getUsers();
            return ok(users); // Retorna sucesso com a lista de usuários
        } catch (error) {
            console.error("Erro no controller getUsers:", error); // Loga o erro para depuração
            return serverError(error); // Retorna erro de servidor
        }
    }

    // Lógica para deletar um usuário
    async deleteUser(userId) {
        try {
            const result = await this.dataAccess.deleteUser(userId);
            // Verifica se o usuário foi realmente encontrado e deletado
            if (!result.value) {
                return notFound(`{ message: Usuário com ID ${userId} não encontrado para exclusão. }`);
            }
            return ok(result.value); // Retorna sucesso com o usuário deletado
        } catch (error) {
            console.error(`Erro no controller deleteUser para o ID ${userId}:, error`);
            return serverError(error); // Retorna erro de servidor
        }
    }

    // Lógica para atualizar um usuário
    async updateUser(userId, userData) {
        try {
            const result = await this.dataAccess.updateUser(userId, userData);
            return ok(result); // Retorna sucesso com o usuário atualizado
        } catch (error) {
            console.error(`Erro no controller updateUser para o ID ${userId}:, error`);
            // Diferencia erros de "não encontrado" de outros erros de servidor
            if (error.message.includes("não encontrado")) {
                return notFound({ message: error.message });
            }
            return serverError(error); // Retorna erro de servidor
        }
    }
}