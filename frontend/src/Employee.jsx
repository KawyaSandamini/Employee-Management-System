import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Employee() {
  // State to hold employee data
  const [data, setData] = useState([])

  useEffect(()=> {
    // Fetch employee data from the server
    axios.get('http://localhost:8081/getEmployee')
    .then(res => {
      if(res.data.Status === "Success") {
        // Update the state with fetched employee data
        setData(res.data.Result);
      } else {
        // Display an alert in case of an error
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }, [])

  // Function to handle employee deletion
  const handleDelete = (id) => {
    axios.delete('http://localhost:8081/delete/'+id)
    .then(res => {
      if(res.data.Status === "Success") {
        // Reload the page to reflect changes after successful deletion
        window.location.reload(true);
      } else {
        // Display an alert in case of an error
        alert("Error")
      }
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Employee List</h3>
      </div>
      <Link to="/create" className='btn btn-success'>Add Employee</Link>
      <div className='mt-3'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Address</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((employee, index) => {
              return <tr key={index}>
                <td>{employee.name}</td>
                <td>
                  {/* Display employee image */}
                  <img src={`http://localhost:8081/Images/`+employee.image} alt="" className='employee_image'/>
                </td>
                <td>{employee.email}</td>
                <td>{employee.address}</td>
                <td>{employee.salary}</td>
                <td>
                  <Link to={`/employeeEdit/`+employee.id} className='btn btn-primary btn-sm me-2'>edit</Link>
                  <button onClick={e => handleDelete(employee.id)} className='btn btn-sm btn-danger'>delete</button>
                </td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Employee
