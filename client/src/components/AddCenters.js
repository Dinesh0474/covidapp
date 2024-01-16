import React, { useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const AddCenters = ({ setAuth }) => {
  const [location,setLocation] = useState('');
  const [street,setStreet] = useState('');
  const [city,setCity] = useState('');
  const [postal_code,setPostal_code] = useState('');
  const [available_slots,setAvalilable_slots] = useState('');



  const navigate = useNavigate();
 

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setModel((prevModel) => ({
//       ...prevModel,
//       [name]: name === 'postal_code' || name === 'available_slots' ? parseInt(value, 10) || 0 : value,
//     }));
//   };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      location: location,
      street: street,
      city: city,
      postal_code: postal_code,
      available_slots: available_slots,
      
    };

    console.log('Form Data:', formData);

  
    try {
      // Make an API call to submit the form data to the server
      const response = await fetch('http://localhost:5000/admin/create', {
            method: 'POST',
            headers: {
         'Content-Type': 'application/json', // specify the content type as JSON
      // add any additional headers if needed
        },
        body: JSON.stringify(formData),
      });


      console.log(response)
      setLocation('')
      setStreet('')
      setCity('')
      setPostal_code('')
      setAvalilable_slots('')
      

    
      if (response.ok) {
        console.log('Form submitted successfully!');
      } else {
        console.error('Failed to submit the form.');
      }
    } catch (error) {

      console.error('Error submitting the form:', error);
    }
    navigate("/admin/")
  };
  

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Add Centers</h1>
      </div>

      <div className="row g-8">
        <div className="col-md-5 col-lg-4 order-md-last">
        <form onSubmit={handleSubmit}>
      <div>
        <label>Location:</label>
        <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div>
        <label>Street:</label>
        <input type="text" name="street" value={street} onChange={(e)=>setStreet(e.target.value)} />
      </div>

      <div>
        <label>City:</label>
        <input type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)} />
      </div>

      <div>
        <label>Postal Code:</label>
        <input type="number" name="postal_code" value={postal_code} onChange={(e) => setPostal_code(e.target.value)} />
      </div>

      <div>
        <label>Available Slots:</label>
        <input type="number" name="available_slots" value={available_slots} onChange={(e) => setAvalilable_slots(e.target.value)} />
      </div>

      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
        </div>
      </div>
      <br/><br/><br/><br/><br/>
    </main>
  );
};

export default AddCenters;
