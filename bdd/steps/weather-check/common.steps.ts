import {
    featureContext,
    postgresQueryExecutor
} from '@cloudeou/telus-bdd';
import { Identificators } from '../../contexts/Identificators';
import ErrorContext from '../../contexts/weather-check/ErrorContext';
import AddressContext from '../../contexts/weather-check/WeatherContext';
import { finishProcessForTableQuery } from '../../../bdd-src/weather-check/db/db-queries';
import WeatherContext from "../../contexts/weather-check/WeatherContext";

type step = (
    stepMatcher: string | RegExp,
    callback: (...args: any) => void
) => void;


export const commonSteps = ({given, when, then}: {[key: string]: step}) => {
    const errorContext = (): ErrorContext =>
        featureContext().getContextById(Identificators.ErrorContext);
    const weatherContext = (): WeatherContext =>
        featureContext().getContextById(Identificators.AddressContext);


    when(/^finish process for (.*)$/, async (tableName: string) => {
        try {
            const primaryKey = weatherContext().id;
            const errorText = errorContext().error;
            console.log(`Finishing process for ${tableName}, row id ${primaryKey}. \n Writing error: ${errorText}`);
            console.dir(await postgresQueryExecutor(finishProcessForTableQuery(primaryKey, tableName, errorText)));
        } catch (error) {
            console.log(error)
        }
    })

}