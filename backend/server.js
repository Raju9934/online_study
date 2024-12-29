const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

app.listen(process.env.PORT || 3306, () => {
    console.log(`Server is running on port ${process.env.PORT || 3306}`);
});
