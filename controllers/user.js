const { prisma } = require('../prisma/prisma-client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля!' });
	}

	//Ищем пользователя в базе
	const user = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	//Сравниваем пришедший к нам пароль, и хеш пароля пользователя
	const isPasswordCorrect = user && (await bcrypt.compare(password, user.password));

	if (user && isPasswordCorrect) {
		res.status(200).json({
			id: user.id,
			name: user.name,
			email: user.email,
		});
	} else {
		res.status(400).json({ message: 'Неверный логин или пароль!' });
	}
};

const registration = async (req, res) => {
	const { email, password, name } = req.body;

	if (!name || !email || !password) {
		return res.status(400).json({ message: 'Пожалуйста, заполните обязательные поля!' });
	}

	//Проверяем, есть ли такой пользователь в бд
	const checkUser = await prisma.user.findFirst({
		where: {
			email,
		},
	});

	if (checkUser) {
		return res.status(400).json({ message: 'Пользователь с таким email уже существует!' });
	}

	//Дополнительная строка для хеширования пароля
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(password, salt);

	const user = await prisma.user.create({
		data: {
			email,
			name,
			password: hashPassword,
		},
	});

	const secret = process.env.JWT_SECRET;

	if (user && secret) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			token: jwt.sign(
				{ id: user.id },
				secret,
				//Время действия токена
				{ expiresIn: '1d' }
			),
		});
	} else {
		return res.status(400).json({ message: 'Не удалось создать пользователя!' });
	}
};

const current = async (req, res) => {
	res.send('current user');
};

module.exports = {
	login,
	registration,
	current,
};
