package com.rushproject.myJournal.api.response;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

// De-serialization, JSON to Java object

@Setter
public class WeatherResponse{
    private Current current;

    public Current getCurrent() {
        return current;
    }
    public class Current {
        private String observation_time;
        private int temperature;
        private int weather_code;
        private List<String> weather_descriptions;

        @JsonProperty("feelslike")
        private int feelsLike;
        private String is_day;

        public int getTemperature(){
            return this.temperature;
        }
    }
}

