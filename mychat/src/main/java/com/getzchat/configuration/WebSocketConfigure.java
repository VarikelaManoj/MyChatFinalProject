package com.getzchat.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.AbstractWebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;

@EnableWebSocketMessageBroker
@Configuration
@ComponentScan(basePackages="com.getzchat")
public class WebSocketConfigure extends AbstractWebSocketMessageBrokerConfigurer{

	@Override
	  public void configureMessageBroker(MessageBrokerRegistry config) {
	    config.enableSimpleBroker("/topic");
	    config.setApplicationDestinationPrefixes("/app");
	  }
	
	public void registerStompEndpoints(StompEndpointRegistry registry) {
		registry.addEndpoint("/chat").withSockJS();
		
	}

}
