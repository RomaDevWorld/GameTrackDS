import sequelize from "./utils/database";

const syncdb = async () => {
  try {
    // await sequelize.sync({ force: true }); //Do not use in production ever (It will REMOVE EVERYTHING from the database and create it again)
    await sequelize.sync();
    console.log("Database synced");
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
};

export default syncdb;
