package com.project.VibeStay.interceptor;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

@Component
public class LoginInterceptor implements HandlerInterceptor {

    // 요청 처리 전 실행
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession(false);
        System.out.println("preHandle: 호출됩니다.");
        
        // 세션에 로그인 정보가 없다면 로그인 페이지로 리디렉션
        if (session == null || session.getAttribute("memberIdx") == null) {
            response.sendRedirect(request.getContextPath() + "/member/login.do");
            return false;  // 요청을 컨트롤러로 넘기지 않음
        }
        return true;  // 요청을 컨트롤러로 넘김
    }

    // 요청 처리 후 실행 (하지만 뷰 렌더링 전에)
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           org.springframework.web.servlet.ModelAndView modelAndView) throws Exception {
        // 컨트롤러가 실행된 후에 수행할 작업
    	 System.out.println("postHandle: 컨트롤러 실행 후 호출됩니다.");
    }

    // 뷰 렌더링 후 실행
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        // 요청 처리 완료 후 수행할 작업
    	System.out.println("afterCompletion: 요청 완료 후 호출됩니다.");
    }
}