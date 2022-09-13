import { Identificators } from '../Identificators';

export default class WeatherContext {
    public identificator: string = Identificators.AddressContext;
    public id: number = NaN;
    public name: string = '';
    public temp: number = NaN;
    public feels_like: number = NaN;
    public wind_speed: number = NaN;
}