//since data will be changing, we need state. - use class component
import React from 'react';
import StudentRow from './student_row';

//console.log('Student Data: ', studentData);
//render -> componentDidMount -> getStudentData -> render
const Table = props => {
        //console.log('Table State:', this.state);
    const { studentList } = props;
    let studentRows = [];
    if(Array.isArray(studentList) && studentList.length){ //check so later when we use map it wont cause errors; it is better to use isArray instead of checking
        studentRows = props.studentList.map((student) => { //we can redefine studentRows using const because it is a different scope, but it wont work because we cannot use studentRows outside of the if statement
            //always put the key in the outermost element
            return <StudentRow delete={props.deleteStudent} key={student.id} student={student}/>
        });
    } else {
        //span all 4 columns - going across the table
        //JSX is just an object
        //anywhere you can use object you can use jsx
        studentRows.push(
            <tr key="no-data">
                <td colSpan="4">
                    <h4 className="center grey-text">No Student Data Available</h4>
                </td>
            </tr>
        );
    }

    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Grade</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
                {studentRows}
            </tbody>
        </table>
    );

}

export default Table;