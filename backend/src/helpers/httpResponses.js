export const ok = (body) => {
    return {
        success: true,
        statusCode: 200,
        body
    }
}

export const notFound = (message = 'Recurso não encontrado.') => {
    return {
        success: false,
        statusCode: 404,
        body: {
            text: message
        }
    }
}

export const badRequest = (message = 'Requisição inválida.') => {
    return {
        success: false,
        statusCode: 400,
        body: {
            text: message
        }
    }
}

export const serverError = (error) => {
    return {
        success: false,
        statusCode: 500,
        body: error // Em produção, você pode querer enviar uma mensagem mais genérica aqui por segurança
    }
}
