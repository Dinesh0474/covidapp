const express = require("express");
const router = express.Router()
const authorization = require("../middleware/authorization");
const pool = require("../db");

router.get("/", authorization, async (req, res) => {
  try {
    // Retrieve user name from the "users" table
    const user = await pool.query(
      "SELECT user_name,user_id FROM users WHERE user_id = $1",
      [req.user] 
    );

    // Retrieve center data from the "centers" table
    const centers = await pool.query("SELECT * FROM centers");

    // Combine user data and center data
    const responseData = {
      user: user.rows[0],
      centers: centers.rows
    };


    // console.log(responseData)

    // Send the combined data in the response
    res.json(responseData).status(200);



    // Log the data for debugging purposes
   
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/dashboard/center-details", async (req, res) => {
  const { user_id, center_id } = req.query;

  try {
    
    const userBooked = await pool.query(
      "select * from centers where center_id = $1",[center_id]
    );
    console.log("Fetched center details:", userBooked.rows[0]);

    res.json(userBooked.rows[0]);
  } catch (error) {
    console.error("Error fetching center details:", error);
    res.status(500).json({ error: "Server error" });
  }
});


router.post("/details", async (req, res) => {
  try {
    const { user_id, center_id } = req.body;

    const Booked = await pool.query(
      'INSERT INTO booking (user_id, center_id) VALUES ($1, $2)',
      [user_id, center_id]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// router.get("/booking",async (req,res) => {
//     try {

//       const result = await pool.query("SELECT * from centers WHERE center_id = $1",[req.center_id])

//       const booking = result.rows[0];

//       res.json(booking)
      
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send("Server error");
      
//     }
// })


// Backend code
router.post('/book-center/:center_id', async (req, res) => {
  const { center_id } = req.params;

try {
  // Fetch the center from the database
  const result = await pool.query("SELECT * FROM centers WHERE center_id = $1", [center_id]);

  // Check if there is a center in the result
  if (result.rows.length > 0) {
    const center = result.rows[0];
   

    // Check if there are available slots
    if (center.available_slots > 0) {
      // Decrease the available slots
      const updatedCenter = await pool.query(
        "UPDATE centers SET available_slots = available_slots - 1 WHERE center_id = $1 RETURNING *",
        [center_id]
      );

      res.json({ success: true, message: 'Booking successful' });
    } else {
      res.json({ success: false, message: 'No available slots' });
    }
  } else {
    res.status(404).json({ success: false, message: 'Center not found' });
  }
} catch (err) {
  console.error(err);
  res.status(500).json({ success: false, message: 'Internal Server Error' });
}

});


module.exports = router;
