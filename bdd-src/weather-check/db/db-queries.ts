export const writeWeatherToDbQuery = (
    weatherId: number,
    temp_col: number,
    feels_like_col: number,
    wind_speed_col: number,
    temp: number,
    feels_like: number,
    wind_speed: number,
): string =>
    `UPDATE weather SET ${temp_col}=${temp}, ${feels_like_col}=${feels_like}, ${wind_speed_col} = ${wind_speed} WHERE id=${weatherId}`;

export const finishProcessForTableQuery = (
    primaryKey: any,
    tableName: string,
    error: string
): string =>
    `UPDATE ${tableName} SET processing=false, processed=true, error='${error}', updated_date=now() WHERE id=${primaryKey}`