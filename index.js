// import { PrismaClient } from '@prisma/client'
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const app = express();
app.use(express.json()); // To parse the incoming requests with JSON payloads
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

/* user */
// get all user
app.get("/user", async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            Posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                },
            },
            createdAt: true,
        },
    });
    res.json(users);
});
// get 1 user
app.get("/user/:id", async (req, res) => {
    const user = await prisma.user.findMany({
        where: {
            id: parseInt(req.params.id),
        },
        select: {
            id: true,
            name: true,
            email: true,
            Posts: {
                select: {
                    id: true,
                    title: true,
                    content: true,
                    createdAt: true,
                },
            },
            createdAt: true,
        },
    });
    res.json(user);
});
// create new user
app.post("/user", async (req, res) => {
    const createUser = async ({ name, email, password }) => {
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password,
                updatedAt: new Date(),
            },
        });
        console.log("User created", user);
        return user;
    };
    const user = await createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    res.json(user);
});
//update user
app.put("/user/:id", async (req, res) => {
    const updateUser = async ({ id, name, email, password }) => {
        const user = await prisma.user.update({
            where: {
                id: parseInt(id),
            },
            data: {
                name,
                email,
                password,
                updatedAt: new Date(),

            },
        });
        console.log("User Updated", user);
        return user;
    };
    const user = await updateUser({
        id: req.params.id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });
    res.json(user);
});
//  delete user
app.delete("/user/:id", async (req, res) => {
    const user = await prisma.user.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(user);
});

/* posr */
// get all posts
app.get("/post", async (req, res) => {
    const post = await prisma.post.findMany();
    res.json(post);
});
// get 1 post
app.get("/post/:id", async (req, res) => {
    const post = await prisma.post.findMany({
        where: {
            id: parseInt(req.params.id),
        },
        include: {
            user: true,
        },
    });
    res.json(post);
});
// create new post
app.post("/post", async (req, res) => {
    const createPostForUser = async ({ title, content, userId }) => {
        const post = await prisma.post.create({
            data: {
                title: title,
                content: content,
                updatedAt: new Date(),
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });
        console.log("post created", post);
        return post;
    };
    const post = await createPostForUser({
        title: req.body.title,
        content: req.body.content,
        userId: parseInt(req.body.userId),
    });
    res.json(post);
});
// update post
app.put("/post/:id", async (req, res) => {
    const createPostForUser = async ({ title, content, userId }) => {
        const post = await prisma.post.update({
            where: {
                id: parseInt(req.params.id),
            },
            data: {
                title: title,
                content: content,
                updatedAt: new Date(),

            },
        });
        console.log("post updated", post);
        return post;
    };
    const post = await createPostForUser({
        title: req.body.title,
        content: req.body.content,
        userId: parseInt(req.body.userId),
    });
    res.json(post);
});
//  delete post
app.delete("/post/:id", async (req, res) => {
    const user = await prisma.post.delete({
        where: {
            id: parseInt(req.params.id),
        },
    });
    res.json(user);
});
app.get("/", (_, res) => {
    res.json({ message: `App is running on port ${PORT}` });
});
