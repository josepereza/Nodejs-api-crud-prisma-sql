const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createUser = async (req, res)=>{
    try{
        const { name, email } = req.body

        let user = await prisma.user.findUnique({ where: { email }})

        if(user){
            return res.send('Email ja em uso!')
        }

        user = await prisma.user.create({
            data:{
                name,
                email
            }
        })
        return res.json(user)
    }catch(err){
        return res.send(err)
    }
}

const allUsers = async (req, res)=>{
    try{
        const users = await prisma.user.findMany()
        return res.json(users)
    }catch(err){
        return res.send(err)
    }
}

const findUser = async (req, res)=>{
    try{
        const { id } = req.params
        const user = await prisma.user.findUnique({ where: { id: Number(id) } })
        if(!user) return res.send('Usuário não encontrado!')
        return res.json(user)
    }catch(err){
        return res.send(err)
    }
}

const updateUser = async (req, res)=>{
    try{
        const { id } = req.params
        const { name, email } = req.body
        let user = await prisma.user.findUnique({ where: { id: Number(id) } })
        if(!user) return res.send('Usuário não encontrado!')

        user = await prisma.user.update({
            where: { id: Number(id) },
            data: { name, email }
        })
        return res.send('Usuário atualizado!')
    }catch(err){
        return res.send(err)
    }
}

const deleteUser = async (req, res)=>{
    try{
        const { id } = req.params
        const user = await prisma.user.findUnique({ where: { id: Number(id) } })
        if(!user) return res.send('Usuário não encontrado!')

        await prisma.user.delete({
            where: { id: Number(id) }
        })
        return res.send('Usuário deletado!')
    }catch(err){
        return res.send(err)
    }
}

module.exports = { createUser, allUsers, findUser, updateUser, deleteUser } 