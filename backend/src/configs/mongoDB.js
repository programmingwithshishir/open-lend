const mongoose = require('mongoose');

// Replace the URI with your MongoDB connection string
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('Connection error:', err));
