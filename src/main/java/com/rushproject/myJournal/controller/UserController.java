package com.rushproject.myJournal.controller;

import com.rushproject.myJournal.api.response.WeatherResponse;
import com.rushproject.myJournal.entity.User;
import com.rushproject.myJournal.repository.IUserRepository;
import com.rushproject.myJournal.service.UserService;
import com.rushproject.myJournal.service.WeatherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user") // Apply mapping to whole class
public class UserController {
    @Autowired
    private UserService userService;

    //    @GetMapping
//    public List<User> getAllUsers() {
//        return userService.getAll();
//    }
    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private WeatherService weatherService;

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userName = authentication.getName();
        User userInDb = userService.findByUserName(userName);

        userInDb.setUserName(user.getUserName());
        userInDb.setPassword(user.getPassword());
        userService.saveNewUser(userInDb);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteUserById(@RequestBody User user) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        userRepository.deleteByUserName(authentication.getName());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping
    public ResponseEntity<String> greeting() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String greeting = "";
        WeatherResponse weatherResponse = weatherService.getWeather("Mumbai");
        if (weatherResponse != null) {
            int temperature = weatherResponse.getCurrent().getTemperature();
            greeting = ", weather feels like " + temperature + " degrees in Mumbai";
        }
        return new ResponseEntity<>("Hi " + authentication.getName() + greeting, HttpStatus.OK);
    }
}
