import 'materialize-css/dist/css/materialize.min.css'; //this will add materialize css to all the pages
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React, { Component } from 'react';
import Table from './table';
import AddStudent from './add_student';
import {Route} from 'react-router-dom';
import ViewStudent from './view_student';

//console.log('randomString3:', randomString(3));
//console.log('randomString default:', randomString());
//console.log('randomString 5:', randomString(5));

class App extends Component {


    render(){
        //Route - exact ; path; component - all attibutes of route; have to put exact name
        //:id - url parameters
        return(
            <div className="container">
                <Route exact path="/" component={Table}/>
                <Route path="/add-student" component={AddStudent}/>
                <Route path="/student/:id" component={ViewStudent}/>
            </div>
        );
    }
}

export default App;
//routing - website usually have multiple page , but you are still on the same website; information is save inside url so when you refresh the page you can still see the same page; every page is self-sufficient
//as the content changes on the page, the url changes too; react cannot handle routing itself; we have to use other library to help