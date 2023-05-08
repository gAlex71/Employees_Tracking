const jwt = require('jsonwebtoken');
const {prisma} = require('../prisma/prisma-client');

const auth = async (req, res, next) => {
    try {
        //Достаем токен из заголовков
        let token = req.headers.authorization?.split(' ')[1];
        //Декодируем его и полуаем id пользователя
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            }
        })

        // Помещаем в запрос пользователя
        req.user = user;

        //Переходим к следующей функции
        next();
    } catch (error) {
        res.status(401).json({ message: 'Пользователь не авторизован' });
    }
}

module.exports = {
    auth
}