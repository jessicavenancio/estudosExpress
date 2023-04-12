const express = require("express");
const students = require("./students");


//Config do app
const app = express();
app.use(express.json());

//Rotas

/* Crie uma rota GET para “/alunos” que lista todos os alunos. 
Deve conter query opcional para filtrar por nome e por média.
Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”, “/alunos?media=7.5” ou esse “/alunos”.
Esta rota deve utilizar as funções exportadas pelo módulo alunos.js;*/
app.get("/students", (req, res) => {
    const { name, average } = req.query;
    const list = students.listStudents(name, average);
    res.json(list);
});


/*Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). 
Valide os campos passados e caso contrário indique um erro (400);*/
app.post("/students/new", (req, res) => {
    const { name, register, average } = req.body;
    if (!name || !register || !average) {
        res.status(400).json({ error: "Informações incompletas" });
    } else {
        const newStudent = { name: name, register: register, average: average };
        students.students.push(newStudent);
        res.status(201).json({ message: `Usuário ${name} adicionado com sucesso` });
    }
});

/*Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index).
Trate a chamada se o aluno não existir (404);*/
app.post("/students/delete/:index", (req, res) => {
    const index = req.params.index;
    const deleteStudents = students.deleteStudents(index);

    if (deleteStudents) {
        res.json(deleteStudents);
    } else {
        res.status(404).json({ mensagem: "Estudante não encontrado" });
    }
});



//Escuta das requisições
app.listen(3000, () => {
    console.log("Servido rodando em http://localhost:3000/")
});

