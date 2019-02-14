//dont need to worry about state here because you just gonna pass in data here and all it need to do is render the row
import React from 'react';
import {Link} from 'react-router-dom';

const StudentRow = (props) => {
   // console.log('Student:', props.student);

    const { name, course, grade, id } = props.student;

    return (
        <tr>
            <td>
                <Link to={`/student/${id}`}>{name}</Link>
            </td>
            <td>{course}</td>
            <td>{grade}</td>
            <td className="center">
                <button onClick={() => {props.delete(id)}} className="btn btn-small red darken-2">Delete</button>
            </td>
        </tr>
    );
};

export default StudentRow;