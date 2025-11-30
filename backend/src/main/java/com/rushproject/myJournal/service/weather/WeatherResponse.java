package com.rushproject.myJournal.service.weather;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.util.List;

// De-serialization, JSON to Java object

@Setter
@AllArgsConstructor
@NoArgsConstructor
public class WeatherResponse{
    private Current current;

    public Current getCurrent() {
        return current;
    }

    @Data
    public static class Current {
        private String observation_time;
        @Getter
        private int temperature;
        private int weather_code;
        private List<String> weather_descriptions;

        @JsonProperty("feelslike")
        private int feelsLike;
        private String is_day;

    }
}

