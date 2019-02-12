import 'materialize-css/dist/css/materialize.min.css'; //this will add materialize css to all the pages
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import axios from 'axios'; //object constructor; function; not a component
import Table from './table';
import AddStudent from './add_student';
import studentData from '../data/get_all_students';
import {randomString} from '../helpers';//since it is index file we dont need to specify index

//console.log('randomString3:', randomString(3));
//console.log('randomString default:', randomString());
//console.log('randomString 5:', randomString(5));

class App extends Component {
    //this component owns the data right now so all the changes / updates should happen here
    state = {
        students: []
    };
    //life cycle method
    componentDidMount(){
        this.getStudentData();
    }

    deleteStudent = (id) => {
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
    }

    addStudent = (student) => {
        student.id = randomString();

        this.setState({
            students: [...this.state.students, student]//works for array or objects, add the existing students then add the new student
        });
    }

    getStudentData(){
        //call server to get student data
        axios.get('http://localhost/server/getstudentlist.php').then((response) => {
            console.log('Server Response:', response.data.data);

            this.setState({
                students: response.data.data
            });
        });//axios returns a promise; same as ajax


    }


    render(){
        return(
            <div>
                <h1 className="center">SGT</h1>
                <div className="row">
                    <div className="col s12 m8">
                        <Table deleteStudent={this.deleteStudent} studentList={this.state.students}/>
                    </div>
                    <div className="col s12 m4">
                        <AddStudent add={this.addStudent}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
