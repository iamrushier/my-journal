package com.rushproject.myJournal.controller;

import com.rushproject.myJournal.common.cache.AppCache;
import com.rushproject.myJournal.domain.entity.User;
import com.rushproject.myJournal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    private final UserService userService;
    private final AppCache appCache;

    @Autowired
    public AdminController(UserService userService, AppCache appCache) {
        this.userService = userService;
        this.appCache = appCache;
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> all = userService.getAll();
        if (all != null && !all.isEmpty()) {
            return new ResponseEntity<>(all, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("/create-admin-user")
    public void createAdmin(@RequestBody User user) {
        userService.saveAdmin(user);
    }

    @GetMapping("/clear-app-cache")
    public void clearAppCache(){
        appCache.init();
    }

    @DeleteMapping("/user/{username}")
    public ResponseEntity<Void> deleteUserByUsername(@PathVariable String username) {
        User user = userService.findByUserName(username);
        if (user != null) {
            userService.deleteByUserName(username);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
