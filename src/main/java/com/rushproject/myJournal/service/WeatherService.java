package com.rushproject.myJournal.service;

import com.rushproject.myJournal.api.response.WeatherResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {
    @Value("${weather.api.key}")
    private String API_KEY;

    private static final String API_STRING = "http://api.weatherstack.com/current?access_key=API_KEY&query=CITY";

    @Autowired
    private RestTemplate restTemplate;

    public WeatherResponse getWeather(String city) {
        String finalAPI = API_STRING.replace("CITY", city).replace("API_KEY", API_KEY);

//  //    For POST Request
//        String requestBody = "{" +
//                "\"userName\": \"tina\"," +
//                "\"password\": \"tina\"" +
//                ";";
//
//        HttpEntity<String> httpEntity = new HttpEntity<>(requestBody);
//        ResponseEntity<WeatherResponse> response = restTemplate.exchange(API_STRING, HttpMethod.POST, requestBody, WeatherResponse.class);

        ResponseEntity<WeatherResponse> response = restTemplate.exchange(finalAPI, HttpMethod.GET, null, WeatherResponse.class);
        WeatherResponse body = response.getBody();
        return body;
    }
}
