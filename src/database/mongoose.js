// core modules
const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.log('MongoDB is connected');
});

mongoose.connection.on('error', (err) => {
  console.log(`Could not connect to MongoDB because of ${err}`);
  process.exit(-1);
});

exports.connect = () => {
  mongoose.connect(process.env.MONGO_URL, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  return mongoose.connection;
};