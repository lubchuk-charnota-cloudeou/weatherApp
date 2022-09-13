import {axiosInstance} from "../axiosInstance";
import {envConfig} from "../../env-config";

export class WeatherApiClient {
    constructor(){}

    public async getWeather(cityName: string): Promise<{temp:number, feels_like:number, wind_speed: number}>{
        try{
            console.log(`City name: ${cityName}`);
            const response: {[key:string]: any} = await axiosInstance({
                method:"GET",
                url: `${envConfig.weatherApi.baseUrl}/current.json`,
                params: {
                    key: envConfig.weatherApi.apiKey,
                    aqi: 'no',
                    q: `${cityName}`
                }
            });
            const weather = {temp: response.temp_c, feels_like: response.feelslike_c, wind_speed: response.wind_mph};//  _.pick(response, 'lat', 'lon')
            console.log(`${cityName}: ${weather.temp}, ${weather.feels_like},${weather.wind_speed}`);
            return weather;
        }
        catch(error){
            console.log(error);
            const errorText = `Error while getting weather: ${cityName}\n ${JSON.stringify(error)}`
            console.log(errorText);
            throw new Error(errorText);
        }
    }
}