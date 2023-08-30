const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 

//routers  
const authRoutes = require('./routes/userRoute'); 
const sessionRoutes = require('./routes/sessionsRoute'); 

//mongoose
mongoose.connect('mongodb://localhost/unischeduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// app , PORT

const app = express();
const PORT = 3001; 

app.use(cors());
app.use(express.json());

//routes 

app.use('/auth', authRoutes);
app.use('/sessions', sessionRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
