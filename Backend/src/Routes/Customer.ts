import express from 'express'

const router = express.Router();


router.post('/signup' , (req,res) => {
  const obj = req.body;

   res.json({
    username: obj.username,
    password: obj.password
  });
});


export default router;