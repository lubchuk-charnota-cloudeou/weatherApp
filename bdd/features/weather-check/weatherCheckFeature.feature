@-
@-
@cityWeather
@DBboostrap=retrieveCity

Feature: weather in the city
    Scenario: get the weather in the city
        Given city name is @city_name
        When get city name
        Then write weather to db temp temp, feels like feels_like, wind speed wind_speed

    Scenario: Finish process
        When finish process for city