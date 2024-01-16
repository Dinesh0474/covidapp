import React, { useEffect, useState, Fragment } from "react";
import { toast } from "react-toastify";
import MyBooking from "./MyBooking";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [user_id,setUser_id] =  useState("");
  // const [selectedCenterId,setSelectedCenterId] =useState("");
  const [bookedCenters, setBookedCenters] = useState([]);

  // const getName = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/dashboard/", {
  //       method: "GET",
  //       headers: { token: localStorage.token }
  //     });
      
  //     console.log(res);
  //     const parseData = await res.json();
      
  //     setName(parseData.user_name);
     
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  // const getName = async () => {
  //   try {
  //     const res = await fetch("http://localhost:5000/dashboard/", {
  //       method: "GET",
  //       headers: { token: localStorage.token }
  //     });
  
  //     const parseData = await res.json();
     
  //     setName(parseData.user_name);
  //     setId(parseData.user_id);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };


  const [centers, setCenters] = useState([]);

   const getCenters  = async() => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/",{
        method: "GET",
        headers: {token : localStorage.token}
        

      });
      const jsonData = await response.json();
      console.log(jsonData.centers)
      setCenters(jsonData.centers);
      setName(jsonData.user.user_name);
      setUser_id(jsonData.user.user_id);
  
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



  const handleClick = async (center) => {
    try {
      // Check if the center is already booked
      if (!bookedCenters.some((bookedCenter) => bookedCenter.center_id === center.center_id)) {
        // Send a request to book the center
        const response = await fetch(`http://localhost:5000/dashboard/book-center/${center.center_id}`, {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
            'token': localStorage.token
          }
        });
  
        const result = await response.json();
        console.log(result)
  
        if (result.success) {
          // If booking is successful, update the state
          setBookedCenters([...bookedCenters, center]);
          toast.success(`Center at ${center.location} booked successfully`);
  
          // Refresh the list of centers
          getCenters();
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error(`Center at ${center.location} is already booked`);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    // getName()
    getCenters()
  },[]);

  return (
    <Fragment>
    <h1>Dashboard {name} </h1>
    <div className="album py-5 bg-light">
      <div className="container">
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
                      { (
                          <button type="button" className="btn btn-sm btn-primary" onClick={()=>handleClick(center)}>
                            Book
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
    <br />
    <MyBooking name={name}user_id ={user_id} bookedCenters ={bookedCenters}/>
  </Fragment>
  );
};

export default Dashboard;
