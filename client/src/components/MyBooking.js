const MyBooking = ({ bookedCenters }) => {
  return (
    
    <div className="album py-5 bg-light">
      <h2>My Booking</h2>
      <br />
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          {bookedCenters.map((center) => (
            <div className="col" key={center.center_id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{center.location}</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    Address: {center.street} {center.city} {center.postal_code}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
