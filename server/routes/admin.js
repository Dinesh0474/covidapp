const authorization = require("../middleware/authorization");
const pool = require("../db");

const express = require("express");
const router = express.Router();

router.post('/create',async (req, res) => {
    try { 
      console.log(req.body)
      const { location, street, city, postal_code, available_slots } = req.body;
  
      const newCenters = await pool.query(
        'INSERT INTO centers (location, street, city, postal_code, available_slots) VALUES ($1, $2, $3, $4, $5)',
        [location, street, city, postal_code, available_slots]
      );
  
      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

router.get("/",async (req,res) => {
    try {
        const Allcenters = await pool.query("SELECT * from centers");
        res.json(Allcenters.rows).status(200);
    } catch (err) {
        console.error(err.message);
    }

})


router.delete("/remove/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const center = await pool.query("DELETE FROM centers WHERE center_id = $1", [id]);
        res.status(200).send("Successfully deleted");
    } catch (err) {
        console.error('Error deleting center:', err.message);
        res.status(500).send("Internal Server Error");
    }
});


module.exports = router;