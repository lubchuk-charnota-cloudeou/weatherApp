@-
@-
@cityWeather
@DBboostrap=retrieveWeather

Feature: weather in the city
    Scenario: get city coordinates
    Given city name is @city_name
    When get city name
    Then write location to db lat ip_lat, lon ip_lon

    Scenario:  get the weather in the city
        Given city lat is ip_lat
        And city lon is ip_lon
        When send request with coordinates
        Then write weather to db temp temp, feels like feels_like, wind speed wind_speed

    Scenario: Finish process
        When finish process for city