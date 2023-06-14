import { Sequelize } from 'sequelize'

// You can use this to connect to your MySQL server, if you prefer
// const sequelize = new Sequelize(
//   process.env.DB_NAME!,
//   process.env.DB_USERNAME!,
//   process.env.DB_PASSWORD!,
//   {
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
//     dialect: "mysql",
//     logging: false,
//   }
// )

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
