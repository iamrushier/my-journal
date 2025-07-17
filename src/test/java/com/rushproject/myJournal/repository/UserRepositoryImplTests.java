package com.rushproject.myJournal.repository;

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
        User u=userRepository.findByUserName("hello");
        System.out.println(u);
        Assertions.assertNotNull(u);
        int a=0;
//        userRepository.getUserForSA();
    }
}
