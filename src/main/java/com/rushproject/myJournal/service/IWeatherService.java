package com.rushproject.myJournal.service;

import com.rushproject.myJournal.api.response.WeatherResponse;

public interface IWeatherService {
    WeatherResponse getWeather(String city);
}