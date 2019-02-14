//since data will be changing, we need state. - use class component
import React, { Component } from 'react';
import StudentRow from './student_row';
import axios from "axios";
import { Link } from 'react-router-dom';
import {formatPostData} from "../helpers";



//console.log('Student Data: ', studentData);
//render -> componentDidMount -> getStudentData -> render
class Table extends Component {
    //this component owns the data right now so all the changes / updates should happen here
    state = {
        students: null
    };
    //life cycle method
    componentDidMount(){
        this.getStudentData();
    }

    deleteStudent = async (id) => {
        /*
        //array.findIdex
        const indexToDelete = this.state.students.findIndex((student) => {
            return student.id === id;
        });
        //if didnt find any thing matches, it will return -1
        if(indexToDelete >= 0){
            const tempStudents = this.state.students.slice();//make a copy of the array

            tempStudents.splice(indexToDelete, 1);

            this.setState({
                students: tempStudents
            });
        }
        */
        const formattedId = formatPostData({id: id});//{id} since key and value are the same we can just put id only

        await axios.post('/server/deletestudent.php', formattedId);

        this.getStudentData();
    }

    async getStudentData(){
        //call server to get student data
        const resp = await axios.get('/server/getstudentlist.php');//http://localhost/server/getstudentlist.php'   /server/getstudentlist.php correct way of writing it; doesn't work for development because the server is on a different server
        //will return a promise; whereever we have a async we put await in front of it; behind the scenes, await put a .then() after get() and put all the rest
        //of the code in the function are put inside of then; works the same way as normal promise look like; it does'nt stop the code, all the other code can still running
//to use async way we have to be inside of a function
        //console.log('Resp:', resp);

        this.setState({
            students: resp.data.data || []
        });

        /*
                if(resp.data.success){
                    this.setState({
                        students: resp.data.data//students is undefined when no data
                    });
                } //else {
                   // this.setState({
                     //   students: []
                    //});
                //}
         */
        //console.log('Get List Resp:', resp);


        /*  old way of doing it ; now people do async way
        axios.get('http://localhost/server/getstudentlist.php').then((response) => {
                console.log('Server Response:', response.data.data);

                this.setState({
                    students: response.data.data
                });
            });//axios returns a promise; same as ajax
         */

    }

    render() {

        //console.log('Table State:', this.state);
        const { students } = this.state;
        let studentRows = [];
        if (Array.isArray(students) && students.length) { //check so later when we use map it wont cause errors; it is better to use isArray instead of checking
            studentRows = students.map((student) => { //we can redefine studentRows using const because it is a different scope, but it wont work because we cannot use studentRows outside of the if statement
                //always put the key in the outermost element
                return <StudentRow delete={this.deleteStudent} key={student.id} student={student}/>
            });
        } else if (students === null){

                studentRows.push(
                <tr key="no-data">
                    <td colSpan="4">
                        <h4 className="center grey-text">Student Data Loading</h4>
                    </td>
                </tr>
            );
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
            //Link allow you to go to other page without refreshing
            //do not combine links and buttons - choose one or the other
            <div>
                <h1 className="center">Student Grade Table</h1>

                <div className="row">
                    <div className="col s12 right-align">
                        <Link className="btn blue" to="/add-student">Add Student</Link>
                    </div>
                </div>

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
            </div>
        );
    }
}

export default Table;