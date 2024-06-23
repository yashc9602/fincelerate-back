const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./routes/user.route.js');
const authRouter = require('./routes/auth.route.js');
const profileRouter = require('./routes/profile.route.js');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/server/user', userRouter);
app.use('/server/auth', authRouter);
app.use('/server', profileRouter);

// MongoDB Connection
mongoose.connect('mongodb+srv://fincelerate:HSvj1997@fincelerate.66cvkhp.mongodb.net/?retryWrites=true&w=majority&appName=Fincelerate', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log('DB connection error:', err);
  });

// Start the Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
