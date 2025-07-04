package com.rushproject.myJournal.service;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;

@SpringBootTest
public class RedisServiceTests {

    //    @Autowired private RedisTemplate redisTemplate;
    @Autowired
    private RedisService redisService;

    //    @Disabled
    @Test
    @Disabled
    void testRedis() {
//        redisTemplate.opsForValue().set("email","1@mail.com");
//        Object name=redisTemplate.opsForValue().get("name");
//        int a=1;
        redisService.set("email", "1@mail.com", 300L);
        Object name = redisService.get("name", String.class);
        int a = 1;
    }
}
