package com.getzchat.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
@EnableWebMvc
@Configuration
@ComponentScan(basePackages="com.getzchat.configuration")
public class GetzConfiguration {

}
