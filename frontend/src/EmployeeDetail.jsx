import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function EmployeeDetail() {
  // Extract the 'id' parameter from the URL using useParams()
  const { id } = useParams();
  const navigate = useNavigate()
    
  // State to hold employee data
  const [employee, setEmployee] = useState([])

  // Use effect to fetch employee details based on the 'id' parameter
  useEffect(() => {
    axios.get('http://localhost:8081/get/' + id)
    .then(res => setEmployee(res.data.Result[0]))
    .catch(err => console.log(err));
  }, [id]) // Specify 'id' as a dependency to re-run the effect when 'id' changes

  // Function to handle user logout
  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
    .then(res => {
      navigate('/start')
    })
    .catch(err => console.log(err));
  }

  return (
    <div>
      <div className='d-flex justify-content-center flex-column align-items-center mt-3'>
        {/* Display employee image */}
        <img src={`http://localhost:8081/images/` + employee.image} alt="" className='empImg' />
        <div className='d-flex align-items-center flex-column mt-5'>
          {/* Display employee details */}
          <h3>Name: {employee.name}</h3>
          <h3>Email: {employee.email}</h3>
          <h3>Salary: {employee.salary}</h3>
        </div>
        <div>
          {/* Buttons for editing and logging out */}
          <button className='btn btn-primary me-2'>Edit</button>
          <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
