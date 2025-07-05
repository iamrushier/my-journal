package com.rushproject.myJournal.service;

import com.rushproject.myJournal.api.response.WeatherResponse;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

@Service
@Profile("dev")
public class DevWeatherService implements IWeatherService {

    @Override
    public WeatherResponse getWeather(String city) {
        // Return a hardcoded/dummy weather response for development
        WeatherResponse weatherResponse = new WeatherResponse();
        WeatherResponse.Current current = weatherResponse.new Current();
        current.setTemperature(25); // Dummy temperature
        current.setFeelsLike(27); // Dummy feels like temperature
        current.setWeather_descriptions(java.util.Collections.singletonList("Partly cloudy")); // Dummy description
        weatherResponse.setCurrent(current);
        return weatherResponse;
    }
}