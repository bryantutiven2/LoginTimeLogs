import moongose from "mongoose";

export const dbConnection = async () => {
   try {
      await moongose.connect(process.env.DB_ACCESS);
      console.log("Database online");
   } catch (error) {
      console.log(error);
      throw new Error("Error al conectar con la Database");
   }
};
