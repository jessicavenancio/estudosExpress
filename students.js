const students = [
    { name: "Jessica", average: 9 },
    { name: "Jhon", average: 8 },
    { name: "Gaby", average: 7 },
    { name: "Jenni", average: 6 }
];


function listStudents(name, average) {
    let listFilter = students;
    if (name) {
        listFilter = listFilter.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
    }
    else if (average) {
        listFilter = listFilter.filter(s => s.average >= average);
    }
    return listFilter;
}

function deleteStudents(index) {
    const studentsRemoved = students.splice(index, 1);
    return studentsRemoved.length > 0 ? studentsRemoved[0] : null;
}

const fs = require('fs');
const path = require('path');

function updateFile(index, name, average) {
    if (index >= 0 && index < students.length) {
        const updateFile = students[index];
        updateFile.name = name || updateFile.name;
        updateFile.average = average || updateFile.average;

        //Desafio 0:
        fs.writeFile(
            path.join(__dirname, 'db.json'),
            JSON.stringify(students),
            err => {
                if (err) {
                    console.error(err);
                } else {
                    console.log('Dados atualizados!');
                }
            }
        );

        return updateFile;
    } else {
        return null
    }
};





module.exports = { students, listStudents, deleteStudents, updateFile};