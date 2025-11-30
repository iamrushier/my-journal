package com.rushproject.myJournal.service.weather;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rushproject.myJournal.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Profile("prod")
public class ProdWeatherService implements IWeatherService {

    @Value("${weather.api.key}")
    private String API_KEY;

    private static final String API_TEMPLATE = "http://api.weatherstack.com/current?access_key=%s&query=%s";

    @Autowired
    private RedisService redisService;

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public WeatherResponse getWeather(String city) {
        try {
            WeatherResponse cached = redisService.get("weather_of_" + city, WeatherResponse.class);
            if (cached != null) {
                System.out.println("Returning cached weather data for: " + city);
                return cached;
            }

            String url = String.format(API_TEMPLATE, API_KEY, city);
            System.out.println("Fetching weather data from URL: " + url);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();
            System.out.println("Raw JSON response: " + responseBody);

            WeatherResponse body = objectMapper.readValue(responseBody, WeatherResponse.class);
            System.out.println("Deserialized WeatherResponse object: " + body);
            if (body != null) {
                 if(body.getCurrent() == null) {
                    System.out.println("Current weather data is null after deserialization.");
                } else {
                    System.out.println("Current weather temperature: " + body.getCurrent().getTemperature());
                }
                redisService.set("weather_of_" + city, body, 300L);
            }

            return body;
        } catch (Exception e) {
            System.err.println("Error during weather data fetching: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
