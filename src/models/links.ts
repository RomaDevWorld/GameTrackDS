import { DataTypes, Model } from 'sequelize'
import sequelize from '../utils/database'
import Game from './game'

interface LinkAttributes {
  time: number
  roleId: number
  gameId: string
  guildId: string
}

class Link extends Model<LinkAttributes> implements LinkAttributes {
  public time!: number
  public roleId!: number
  public guildId!: string
  public gameId!: string
}

Link.init(
  {
    time: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.STRING,
    },
    guildId: {
      type: DataTypes.STRING,
    },
    gameId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'links',
  }
)

Link.belongsTo(Game, { foreignKey: 'gameId' })

export default Link
