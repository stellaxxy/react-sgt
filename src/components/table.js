//since data will be changing, we need state. - use class component
import React from 'react';
import StudentRow from './student_row';

//console.log('Student Data: ', studentData);
//render -> componentDidMount -> getStudentData -> render
const Table = props => {
        //console.log('Table State:', this.state);

    const studentRows = props.studentList.map((student) => {
        //always put the key in the outermost element
        return <StudentRow delete={props.deleteStudent} key={student.id} student={student}/>
    });

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>
                {studentRows}
            </tbody>
        </table>
    );

}

export default Table;