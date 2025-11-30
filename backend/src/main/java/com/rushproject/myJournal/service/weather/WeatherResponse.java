package com.rushproject.myJournal.service.weather;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

// De-serialization, JSON to Java object

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WeatherResponse{
    private Current current;
    private Boolean success;
    private Error error;

    @Data
    public static class Current {
        private String observation_time;
        private int temperature;
        private int weather_code;
        private List<String> weather_descriptions;

        @JsonProperty("feelslike")
        private int feelsLike;
        private String is_day;

    }

    @Data
    public static class Error {
        private int code;
        private String type;
        private String info;
    }
}

