require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

const userRoute = require('./routes/user.routes')
const postsRoute = require('./routes/posts.routes')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
  
    console.log(`MongoDB Database Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error); 
    process.exit(1);
  }
}

// Use Express Router for better route management

app.use('/user', userRoute)
app.use('/posts', postsRoute)

// Error handling middleware
app.use((err, req, res, next) => { 
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`);
  });
}) 