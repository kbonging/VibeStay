package com.project.VibeStay.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer{
	private final HandlerInterceptor loginInterceptor;
	
 	@Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)  // 인터셉터 등록
                .addPathPatterns("/**")  // 모든 경로에 대해 인터셉터 적용
                .excludePathPatterns(// 제외할 경로들
                		"/", 
                		"/main.do",
                		"/resources/**",
                		"/static/**",
                		"/css/**",
                		"/img/**",
                        "/member/login.do");
    }
}
