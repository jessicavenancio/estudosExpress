const students = [
    { name: "Jessica", average: 9 },
    { name: "Jhon", average: 8 },
    { name: "Gaby", average: 7 },
    { name: "Jenni", average: 6 }
];


function listStudents( name, average )
{
    let listFilter = students;
    if (name) {
        listFilter = listFilter.filter(s => s.name.toLowerCase().includes(name.toLowerCase()));
    }
    else if (average) {
        listFilter = listFilter.filter(s => s.average >= average);
    }
    return listFilter;
}

function deleteStudents(index)
{
    const studentsRemoved = students.splice(index, 1);
    return studentsRemoved.length > 0 ? studentsRemoved[0] : null;
}

module.exports = {students, listStudents, deleteStudents};