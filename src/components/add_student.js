//when you have input in react, it is usually controlled by state; like when you are typing in the input, letters appears;
import React, { Component } from 'react';

class AddStudent extends Component {
    state = {
        name: '',
        course: '',
        grade: ''
        //all data inputs are strings
    };

    handleSubmit = (event) => {
        event.preventDefault();//prevent form refresh ; url no longer change, page no longer refresh

        //console.log('Form submitted', this.state);

        this.props.add(this.state);

        this.resetForm();
    };
    //property storing anonymous function
    resetForm = () => {
        this.setState({
            name: '',
            course: '',
            grade: ''
        });
    };

    handleKeyPress = (event) => {
       // console.log('Event:', event.target);
        //console.log('Event Name:', event.target.name);
        //console.log('Event Value:', event.target.value);

        //after setState, it will call render afterwards
        this.setState({
            [event.target.name]: event.target.value
        });

    /*
        switch(event.target.name){
            case 'name':
                this.setState({
                    name: event.target.value
                });
                break;
            case 'course':
                this.setState({
                    course: event.target.value
                });
                break;
            case 'grade':
                this.setState({
                    grade: event.target.value
                });
        }
     */
    };


    render(){
        const {name, course, grade} = this.state;

        return (
            //for onsubmit or onclick on add button; only pick one way or the other; the first one is preferred
            //if you only have one input, you dont need to have submit button to submit form; enter key would work
            <form onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="col input-field s10 offset-s1">
                        <input onChange={this.handleKeyPress} name="name" type="text" id="name" value={name} autoComplete="off"/>
                        <label htmlFor="name">Name</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col input-field s10 offset-s1">
                        <input onChange={this.handleKeyPress} name="course" type="text" id="course" value={course} autoComplete="off"/>
                        <label htmlFor="course">Course</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col input-field s10 offset-s1">
                        <input onChange={this.handleKeyPress} name="grade" type="number" id="grade" value={grade} autoComplete="off"/>
                        <label htmlFor="grade">Grade</label>
                    </div>
                </div>

                <div className="row">
                    <div className="col s6 center">
                        <button onClick={this.resetForm} type="button" className="btn red darken-2">Clear</button>
                    </div>
                    <div className="col s6 center">
                        <button className="btn green darken-2">Add</button>
                    </div>
                </div>
            </form>
        );
    }
}

export default AddStudent;

//button on default is type submit
//when you click on button it will try to send information using get (query string) to itself since we didnt set any action on the form

//every time input changes we want to save it in our state