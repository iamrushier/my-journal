package com.rushproject.myJournal.repository;

import org.junit.jupiter.api.AfterEach;
import com.rushproject.myJournal.domain.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class UserRepositoryImplTests {
    @Autowired
//    private UserRepositoryImpl userRepository;
private IUserRepository userRepository;
    @Test
    public void testSaveNewUser(){
        User newUser = new User();
        newUser.setUserName("testuser");
        newUser.setPassword("password");
        userRepository.save(newUser);
        User u=userRepository.findByUserName("testuser");
        System.out.println(u);
        Assertions.assertNotNull(u);
    }

    @AfterEach
    public void cleanup() {
        userRepository.deleteByUserName("testuser");
    }
