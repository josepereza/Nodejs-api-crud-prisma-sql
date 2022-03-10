const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createPost = async (req, res)=>{
    const { content } = req.body
    const { id } = req.params
    try{
        const user =  await prisma.user.findUnique({ where: {id: Number(id)}})
        if(!user) return res.send('Usuário não encontrado!')
        const post = await prisma.post.create({
            data: {
                content,
                userId: user.id
            },
            include: {
                author: true
            }
        })
        return res.json(post)
    }catch(err){
        return res.send(err)
    }
}

const findAllPosts = async (req, res)=>{
    try{
        const posts = await prisma.post.findMany({
            // select: {
            //     content: true,
            // }
        })
        return res.json(posts)
    }catch(err){
        return res.send(err)
    }
}


const updatePost = async (req, res)=>{
    const { id } = req.params
    const { content } = req.body
    try{
        const post = await prisma.post.findUnique({
            where: {id: Number(id)}
        })
        if(!post) return res.send('Post não encontrado!')
        await prisma.post.update({
            where: {id: Number(id)},
            data: { content }
        })
        return res.send('Post atualizado!')
    }catch(err){
        return res.send(err)
    }
}



module.exports = { createPost, findAllPosts, updatePost }