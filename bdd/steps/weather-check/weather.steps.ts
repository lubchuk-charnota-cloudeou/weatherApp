import {
    featureContext,
    postgresQueryExecutor
} from '@cloudeou/telus-bdd';
import { Identificators } from '../../contexts/Identificators';
import { WeatherApiClient } from '../../../bdd-src/weather-check/weather_api/weather_api.api';
import ErrorContext from '../../contexts/weather-check/ErrorContext';
import WeatherContext from '../../contexts/weather-check/WeatherContext';
import { writeWeatherToDbQuery } from '../../../bdd-src/weather-check/db/db-queries';

type step = (
    stepMatcher: string | RegExp,
    callback: (...args: any) => void
) => void;


export const weatherSteps = ({given, when, then}: {[key: string]: step}) => {
    const errorContext = (): ErrorContext =>
        featureContext().getContextById(Identificators.ErrorContext);
    const weatherContext = (): WeatherContext =>
        featureContext().getContextById(Identificators.AddressContext);

    const weatherApiClient = new WeatherApiClient();

    given(/^city (.*) is (.*)$/, (name: string, city_name: any) => {
        console.log(`Setting ${name} to ${city_name}`);
    })

    when('get city name', async () => {
        try {
            const cityName: string = weatherContext().name;
            const {temp, feels_like,wind_speed} = await weatherApiClient.getWeather(cityName);
            weatherContext().temp = temp;
            weatherContext().feels_like = feels_like;
            weatherContext().wind_speed = wind_speed;
        } catch (error) {
            errorContext().error = <string>error;
        }
    })

    then(/^write weather to db temp (.*), feels like (.*), wind speed (.*)$/,
        async (temp: number, feels_like: number, wind_speed:number) => {
        try {
            console.log(`Writing weather to DB`);
            await postgresQueryExecutor(
                writeWeatherToDbQuery(
                    weatherContext().id,
                    temp,
                    feels_like,
                    wind_speed,
                    weatherContext().temp,
                    weatherContext().feels_like,
                    weatherContext().wind_speed,
                )
            );
        } catch (error) {
            const errorText: string = `Error while writing coordinates to DB: ${JSON.stringify(error)}`;
            errorContext().error = errorText;
        }
    })
}
