import app from "./app";

const main = () => {
   app.listen(process.env.PORT || 3002, () => {
      console.log(`Server is running on Port ${process.env.PORT}`);
   });
};

main();
