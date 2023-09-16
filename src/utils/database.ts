import { Sequelize } from 'sequelize'
import { config } from 'dotenv'
config()

const sequelize = new Sequelize(process.env.DB_NAME as string, process.env.DB_USERNAME as string, process.env.DB_PASSWORD as string, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
  dialect: 'postgres',
  logging: false,
})

;async () => {
  sequelize.sync()
}

export default sequelize
