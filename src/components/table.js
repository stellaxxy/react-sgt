//since data will be changing, we need state. - use class component
import React, { Component } from 'react';
import studentData from '../data/get_all_students';
import StudentRow from './student_row';

//console.log('Student Data: ', studentData);
//render -> componentDidMount -> getStudentData -> render
class Table extends Component {
    state = {
        students: []
    };
//life cycle method
    componentDidMount(){
        this.getStudentData();
    }

    getStudentData(){
        //call server to get student data

        this.setState({
            students: studentData
        });
    }

    render(){
        //console.log('Table State:', this.state);

        const studentRows = this.state.students.map((student) => {
            //always put the key in the outermost element
            return <StudentRow key={student.id} student={student}/>
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
}

export default Table;