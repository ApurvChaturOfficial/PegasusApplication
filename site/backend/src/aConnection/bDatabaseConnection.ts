import mongoose from "mongoose";


const databaseConnection = () => {
  const DB_URL = "mongodb+srv://apurvchatur:apurvchatur@cluster0.qi6bn.mongodb.net/";

  mongoose.set("strictQuery", true);
  mongoose
    .connect(DB_URL, { dbName: "PegasusApplication" })
    .then(response => {
      console.log(`Great... MongoDB connected on server ${response.connection.host} at ${response.connection.name}`);
    })
    // .catch(error => {
    //   console.log(error);
    // })
}

export default databaseConnection;
