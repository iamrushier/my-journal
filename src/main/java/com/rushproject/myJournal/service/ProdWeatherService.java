package com.rushproject.myJournal.service;

import com.rushproject.myJournal.api.response.WeatherResponse;
import com.rushproject.myJournal.cache.AppCache;
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

//    private static final String API_STRING = "http://api.weatherstack.com/current?access_key=API_KEY&query=CITY";

    @Autowired
    private AppCache appCache;
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private RedisService redisService;

    public WeatherResponse getWeather(String city) {

        WeatherResponse cached = redisService.get("weather_of_" + city, WeatherResponse.class);
        if (cached != null) return cached;
        else {
            String finalAPI = appCache.APP_CACHE.get("weather_api").replace("<city>", city).replace("<api_key>", API_KEY);
            ResponseEntity<WeatherResponse> response = restTemplate.exchange(finalAPI, HttpMethod.GET, null, WeatherResponse.class);
            WeatherResponse body = response.getBody();
            if (body != null) redisService.set("weather_of_" + city, body, 300L);
            return body;
        }
//  //    For POST Request
//        String requestBody = "{" +
//                "\"userName\": \"tina\"," +
//                "\"password\": \"tina\"" +
//                ";";
//
//        HttpEntity<String> httpEntity = new HttpEntity<>(requestBody);
//        ResponseEntity<WeatherResponse> response = restTemplate.exchange(API_STRING, HttpMethod.POST, requestBody, WeatherResponse.class);
    }
}
