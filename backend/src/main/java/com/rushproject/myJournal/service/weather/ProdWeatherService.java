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
                return cached;
            }

            String url = String.format(API_TEMPLATE, API_KEY, city);

            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            String responseBody = response.getBody();

            if (responseBody == null || responseBody.isEmpty()) {
                System.err.println("Weather API returned an empty or null response body.");
                return null;
            }

            WeatherResponse body = objectMapper.readValue(responseBody, WeatherResponse.class);

            // Check if the API call was successful based on the 'success' field
            // A successful response usually doesn't have a 'success' field, or it's true.
            // An error response has 'success: false'
            if (body != null && (body.getSuccess() == null || body.getSuccess())) {
                if (body.getCurrent() != null) {
                    redisService.set("weather_of_" + city, body, 300L);
                } else {
                    System.err.println("Weather API call was successful, but 'current' data is null for city: " + city);
                }
            } else if (body != null && body.getError() != null) {
                System.err.println("Weather API returned an error: Code=" + body.getError().getCode() +
                                   ", Type=" + body.getError().getType() +
                                   ", Info=" + body.getError().getInfo());
                return null; // Do not cache error responses
            } else {
                System.err.println("Weather API returned an unexpected response for city: " + city + " Response: " + responseBody);
                return null; // Do not cache unexpected responses
            }

            return body;
        } catch (Exception e) {
            System.err.println("Error during weather data fetching: " + e.getMessage());
            e.printStackTrace();
            return null;
        }
    }
}
