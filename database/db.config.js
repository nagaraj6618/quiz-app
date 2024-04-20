const mongoose = require("mongoose");

// Function to connect to the database
const connectDb = async () => {
  try {
    // Attempt to connect to the MongoDB database using the provided connection string
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    // Log a success message if the connection is successful
    console.log(
      "Database Connected : ",
      connect.connection.host,
      connect.connection.name
    );
  } catch (err) {
    // Log any errors that occur during the connection process
    console.log(err);
    // Exit the Node.js process with an error code if the connection fails
    process.exit(1);
  }
};

// Export the connectDb function for use in other modules
module.exports = connectDb;
