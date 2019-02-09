import 'materialize-css/dist/css/materialize.min.css'; //this will add materialize css to all the pages
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React from 'react';
import Table from './table';
import AddStudent from './add_student';

const App = () => (
    <div>
        <h1 className="center">SGT</h1>
        <div className="row">
            <div className="col s12 m8">
                <Table/>
            </div>
            <div className="col s12 m4">
                <AddStudent/>
            </div>
        </div>
    </div>
);

export default App;
