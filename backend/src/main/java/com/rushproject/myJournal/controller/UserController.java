package com.rushproject.myJournal.controller;

import com.rushproject.myJournal.service.weather.WeatherResponse;
import com.rushproject.myJournal.domain.entity.User;
import com.rushproject.myJournal.repository.IUserRepository;
import com.rushproject.myJournal.service.UserService;
import com.rushproject.myJournal.service.weather.IWeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user") // Apply mapping to whole class
public class UserController {
    private final UserService userService;
    private final IUserRepository userRepository;
    private final IWeatherService weatherService;

    @Autowired
    public UserController(UserService userService, IUserRepository userRepository, IWeatherService weatherService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.weatherService = weatherService;
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User userInDb = userService.findByUserName(userName);

        userInDb.setUserName(user.getUserName());
        userInDb.setPassword(user.getPassword());
        userService.updateUser(userInDb);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUserById() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userRepository.deleteByUserName(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<String> greeting() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String greeting = "";
        WeatherResponse weatherResponse = weatherService.getWeather("Mumbai");
        if (weatherResponse != null && weatherResponse.getCurrent() != null) {
            int temperature = weatherResponse.getCurrent().getTemperature();
            greeting = ", weather feels like " + temperature + " degrees in Mumbai";
        }
        return new ResponseEntity<>("Hi " + authentication.getName() + greeting, HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User user = userService.findByUserName(userName);

        // Remove password before returning for security
//        user.setPassword(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping("/sentiment-analysis")
    public ResponseEntity<Void> updateSentimentAnalysis(@RequestParam boolean enabled) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();

        User user = userService.findByUserName(userName);
        if (user != null) {
            user.setSentimentAnalysis(enabled);
            userService.updateUser(user);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
