import Activity from './models/activity'
import Game from './models/game'
import Links from './models/links'
import sequelize from './utils/database'

const syncdb = async () => {
  try {
    // await sequelize.sync({ force: true }); //Do not use in production ever (It will REMOVE EVERYTHING from the database and create it again)

    //  await sequelize.sync({ alter: true });
    //  await Activity.sync({ alter: true })
    //  await Game.sync({ alter: true })
    //  await Links.sync({ alter: true })

    await sequelize.sync()
    console.log('Database synced')
  } catch (error) {
    console.error('Unable to sync database:', error)
  }
}

export default syncdb
