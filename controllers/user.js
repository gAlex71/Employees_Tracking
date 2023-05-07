const {prisma} = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	const { email, password } = req.body;

    if(!email && !password) {
        return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля!' });
    }

    //Ищем пользователя в базе
    const user = await prisma.user.findFirst({
        where: {
            email
        }
    })

    //Сравниваем пришедший к нам пароль, и хеш пароля пользователя
    const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

    if(user && isPasswordCorrect) {
        res.status(200).json({
            id: user.id,
            name: user.name,
            email: user.email
        })
    }else{
        res.status(400).json({ message: 'Неверный логин или пароль!' });
    }
};

const registration = async (req, res) => {
	res.send('registration response');
};

const current = async (req, res) => {
	res.send('current user');
};

module.exports = {
    login,
    registration,
    current
}