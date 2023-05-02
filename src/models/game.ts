import { DataTypes } from "sequelize";
import sequelize from "../utils/database";

const Game = sequelize.define("game", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

export default Game;
