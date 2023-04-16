const express = require("express");
const students = require("./students");

//Config do app
const app = express();
/*Desafio 4: Pesquise e aplique o logger morgan na aplicação;*/
const morgan = require('morgan');
app.use(express.json());

//Rotas
/*1- Crie uma rota GET para “/alunos” que lista todos os alunos. 
Deve conter query opcional para filtrar por nome e por média.
Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”, “/alunos?media=7.5” ou esse “/alunos”.
Esta rota deve utilizar as funções exportadas pelo módulo alunos.js;*/
app.get("/students", (req, res) => {
    const { name, average } = req.query;
    const list = students.listStudents(name, average);
    res.json(list);
});

/*2- Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). 
Valide os campos passados e caso contrário indique um erro (400);*/
/*Desafio 1: Refatore a aplicação e mova para alunos.js, os métodos de deletar, adicionar e atualizar um aluno;*/
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

/*3- Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index).
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

/*Crie uma rota POST para /alunos/atualizar/:index, que no corpo da requisição recebe um objeto (nome, média)
e atualiza os dados do aluno naquela posição. 
Trate a chamada se o aluno não existir (404);*/
/* Desafio 0: Escreva um arquivo JSON chamado db.json toda vez que ocorrer uma alteração nos dados do array de alunos;*/
app.post("/students/update/:index", (req, res) => {
    const index = parseInt(req.params.index);
    const { name, average } = req.body;
    const updateFile = students.updateFile(index, name, average);

    if (updateFile) {
        //res.status(200).send('Atualização realizada!');
        res.json(updateFile);
    } else {
        res.status(404).send('Estudante não encontrado!');
    }
});

/*Desafio 2: Substituir as rotas POST de atualizar e deletar com os métodos PUT e DELETE respectivamente,
reformulando as URLs para todas utilizarem o mesmo caminho /alunos, mudando apenas o método utilizado;*/
//atualizar
app.put("/students/:index", morgan('tiny'), (req, res) => {
    const index = Number(req.params.index);
    const { name, average } = req.body;
    const updateFile = students.updateFile(index, name, average);

    if(updateFile) {
        res.json(updateFile);
    } else {
        res.status(404).json({mensagem: "Aluno não encontrado"})
    }
});
//deletar
app.delete("/students/:index", morgan('tiny'), (req, res) => {
    const index = Number(req.params.index);
    const deleteStudents = students.deleteStudents(index);

    if(deleteStudents) {
        res.json(deleteStudents);
    } else {
        res.status(404).json({mensagem: "Aluno não encontrado"})
    }
});

/*Desafio 3: Entregue a documentação desta API usando os recursos do Postman; ok*/

//Escuta das requisições
app.listen(3000, () => {
    console.log("Servido rodando em http://localhost:3000/")
});

