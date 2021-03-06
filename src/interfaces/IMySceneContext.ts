import { Context, Scenes } from "telegraf";
import IUserConfig from "../db/dbInterfaces/IUserConfig";


/**
* Интерфейс контекста бота
*/
export default interface IMyContext extends Context {
    scene: IMySceneContext;
}

interface IMySceneContext
    extends Scenes.SceneContextScene<IMyContext> {
    state: IUserConfig;
}
