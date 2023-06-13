import { Sequelize } from 'sequelize'

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',

  storage: __dirname + '/../database.sqlite',
  logging: false,
})

;async () => {
  sequelize.sync()
}

export default sequelize
