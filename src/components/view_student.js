//initially no data then call server to get data; so use class
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { formatPostData } from '../helpers';

class ViewStudent extends Component {
    //constructor -> render -> componentDidMount
    state = {
        student: {}
    };//when it is empty object name, course will be undefined

    async componentDidMount(){
        //console.log('Student ID:', this.props.match.params.id);

        const studentId = formatPostData({
           id: this.props.match.params.id
        });

        const studentData = await axios.post('/server/getstudentdetails.php', studentId);

        //console.log('Student Data:', studentData);

        this.setState({
            student: studentData.data.data
        });
    }

    render(){
        const {name, course } = this.state.student; //const {name = '', course='' } = this.state.student; we can do this so when name is undefined it will be empty string

        return (
            <div>
                <h1 className="center">Student Details</h1>

                <div className="row">
                    <div className="col s12 right-align">
                        <Link to="/" className="btn blue">Home</Link>
                    </div>
                </div>

                <h1 className="center">{name}</h1>
                <h5 className="center">{course}</h5>
            </div>
        );
    }
}

export default ViewStudent;