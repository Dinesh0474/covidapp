import React, { useEffect, useState, Fragment } from "react";
import {  useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AdminDashboard = ({setAuth}) => {

    const [centers, setCenters] = useState([]);

    const navigate = useNavigate();

    const getCenters  = async () => {

    try {
        const response = await fetch("http://localhost:5000/admin/", {
            method: "GET",
            headers: { token: localStorage.token }
          });
        const jsonData = await response.json();
        console.log(jsonData)
        setCenters(jsonData);
  
    } catch (err) {
      console.error(err.message);
    }

    }


    const logout = async (e) => {
        e.preventDefault();
        try {
          localStorage.removeItem("token");
          setAuth(false);
          toast.success("Logout successfully");
        } catch (err) {
          console.error(err.message);
        }
      };

    const [filterText, setFilterText] = useState('');

 
    const filteredCenters = centers.filter(
    (center) =>
      center.location.toLowerCase().includes(filterText.toLowerCase()) 
    );

    const handleClick = async (center_id) => {
      try {
        console.log(center_id)
        const response = await fetch(`http://localhost:5000/admin/remove/${center_id}`, {
          method: 'DELETE',
          headers: { token: localStorage.token },
        });
  
        if (response.ok) {
          toast.success('Center removed successfully');
          // Update the centers after successful removal
          getCenters();
        } else {
          toast.error('Failed to remove center');
        }
      } catch (error) {
        console.error('Error removing center:', error.message);
        toast.error('Error removing center');
      }
    };


    const handleCenters = async() => {
        setAuth(true);
        navigate("/admin/create")
    }
    useEffect(() => {
        getCenters()
     },[]);


    return(
     <Fragment>
   
    <div className="album py-5 bg-light">
      <div className="container">
      <h1 className="h3 mb-3 fw-normal" >Admin Dashboard </h1>
        <input
          className="form-control form-control-dark w-50"
          type="text"
          placeholder="Search by name"
          aria-label="Search"
          id="location"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
        />
        <br />
        <br />
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {filteredCenters.map((center) => (
            <div className="col" key={center.center_id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{center.location}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Address: {center.street} {center.city} {center.postal_code}
                  </li>
                  <li className="list-group-item">Available slots: {center.available_slots}</li>
                </ul>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                      {center.center_id && (
                          <button
                            type="button"
                            className="btn btn-sm btn-primary"
                            onClick={() => handleClick(center.center_id)}
                          >
                            Remove
                          </button>
                        )}
                    </div>
   
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div> 
    <button className="logout-btn" onClick={(e) => logout(e)}>
      Logout
    </button>
    <button className="btn" onClick={handleCenters}>
      add centers
    </button>
  </Fragment>
    );
}

export default AdminDashboard;