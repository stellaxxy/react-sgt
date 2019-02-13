import 'materialize-css/dist/css/materialize.min.css'; //this will add materialize css to all the pages
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import axios from 'axios'; //object constructor; function; not a component
import Table from './table';
import AddStudent from './add_student';
import {formatPostData} from '../helpers';//since it is index file we dont need to specify index

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

    addStudent = async (student) => { //async always in front of the function
        //student.id = randomString();

        /*
        this.setState({
            students: [...this.state.students, student]//works for array or objects, add the existing students then add the new student
        });
        */

        const formattedStudent = formatPostData(student);

        await axios.post('/server/createstudent.php', formattedStudent);//post method - pass in the data you want to send(an object)

       // console.log('Add Student Response:', resp);

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
                console.log('Get List Resp:', resp);


            /*  old way of doing it ; now people do async way
            axios.get('http://localhost/server/getstudentlist.php').then((response) => {
                    console.log('Server Response:', response.data.data);

                    this.setState({
                        students: response.data.data
                    });
                });//axios returns a promise; same as ajax
             */

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
