import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/database';
import Game from './game';

interface ActivityAttributes {
  time: number;
  userId: number;
  gameId: string;
}

export class Activity extends Model<ActivityAttributes> implements ActivityAttributes {
  public time!: number;
  public userId!: number;
  public gameId!: string;
  game!: {
    id: string;
    name: string;
    time: number;
  };
}

Activity.init({
  time: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  gameId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'activity'
});

Activity.belongsTo(Game, { foreignKey: 'gameId' });

export default Activity;
