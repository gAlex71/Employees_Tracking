const { prisma } = require('../prisma/prisma-client');

const getAllEmployees = async (req, res) => {
    try {
        const employees = await prisma.employee.findMany();

        res.status(200).json(employees);
    } catch {
        res.status(400).json({message: 'Сотрудники не найдены'})
    }
};

const getOneEmployee = async (req, res) => {
    try {
        //Получаем id из url
        const { id } = req.params;

        const employee = await prisma.employee.findUnique({
            where: {
                id
            }
        })

        res.status(200).json(employee);
    } catch {
        res.status(400).json({message: 'Сотрудник не найден'})
    }
};

const createEmployee = async (req, res) => {
    try{
        const data = req.body;

        if(!data.firstName || !data.lastName || !data.age || !data.address){
            res.status(400).json({message: 'Заполните все поля!'})
        }

        const employee = await prisma.employee.create({
            data: {
                ...data,
                userId: req.user.id
            }
        })

        return res.status(201).json(employee);
    }catch(error){

        res.status(400).json({message: `Не удалось добавить сотрудника ${error}`})
    }
};

const removeEmployee = async (req, res) => {
    try {
        const { id }= req.params;

        await prisma.employee.delete({
            where: {
                id
            }
        })

        res.status(200).json({message: 'Сотрудник удален'});
    } catch {
        res.status(400).json({message: 'Не удалось удалить сотрудника'})
    }
};

const updateEmployee = async (req, res) => {
    try {
        const data = req.body;
        const { id }= req.params;

        await prisma.employee.update({
            where: {
                id
            },
            data
        })

        res.status(200).json({message: 'Сотрудник обновлен'});
    } catch {
        res.status(400).json({message: 'Не удалось обновить сотрудника'})
    }
};

module.exports = {
    getAllEmployees,
    getOneEmployee,
    createEmployee,
    removeEmployee,
    updateEmployee
}