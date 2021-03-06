import { IValutes } from "./IExchanges";
import { IWeatherCoords } from "./IWeather";

/**
 * Интерфейс для работы с конфигурациями пользователей
 */
export default interface UserConfig extends Object {
    id: Number;
    requiredExchanges: Array<keyof IValutes> | null;
    movie: Boolean;
    phrase: Boolean;
    weatherCoords: IWeatherCoords | null;
    username: String;
    time: String;
    hour: number;
}