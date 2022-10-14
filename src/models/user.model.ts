import { DataTypes } from "sequelize";
import { Model } from "sequelize/types/model";
import { sqlize } from "..";

interface User extends Model { username: string, password: string };

export const userModel = sqlize.define<User>('user',{
        username: {type: DataTypes.TEXT, allowNull: false},
        password: {type: DataTypes.TEXT, allowNull: false}
    },
    {
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        }
    }
);