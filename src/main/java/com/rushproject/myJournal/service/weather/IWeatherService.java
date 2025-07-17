package com.rushproject.myJournal.service.weather;

public interface IWeatherService {
    WeatherResponse getWeather(String city);
}