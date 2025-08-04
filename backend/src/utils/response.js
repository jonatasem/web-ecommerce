export const successResponse = (res, body, statusCode = 200) => {
    res.status(statusCode).send({ success: true, statusCode, body });
};

export const errorResponse = (res, message, statusCode = 500) => {
    res.status(statusCode).send({ success: false, statusCode, body: { text: message } });
};