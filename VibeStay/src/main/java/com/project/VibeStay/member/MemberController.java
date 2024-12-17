package com.project.VibeStay.member;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class MemberController {
	private final MemberService memberService;
	private final PasswordEncoder passwordEncoder; // PasswordEncoder 주입
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@GetMapping("/memberTest")
	public String memberTest(Model model) {
		String email = "apple75391@gmail.com";
//		MemberVO memberVO = memberService.selectMemberByEmail(email);
		String memberId = "admin";
		MemberVO memberVO = memberService.selectMemberById(memberId);
		System.out.println("#############"+memberVO);
		model.addAttribute("memberVO", memberVO);
		return "index";
	}
	
	/* 로그인 페이지 이동 */
	@GetMapping("/member/login.do")
	public String login() throws Exception {
		 logger.info("@@@@@ 로그인 페이지로 이동 @@@@@");
		return "member/login";
	}
	
	/* 로그인 처리 */
	@PostMapping("/member/login.do") // POST 요청 처리
	public ResponseEntity<Boolean> login(@RequestBody MemberVO memberVO, Model model, HttpSession session, 
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		 //System.out.println("/member/login.do-#####"+memberVO.toString());
		 logger.info("로그인 처리-"+memberVO.toString());
	    	
		boolean loginSuccess = false; // 로그인 실패 기본값
		 
	    if (session != null) { // 기존 세션이 있으면 세션을 무효화합니다.
	        session.invalidate(); // 기존 세션을 삭제
	    }
	    session = request.getSession(true); // 새로운 세션 생성
	    
	    try {
	        MemberVO resultVO = memberService.selectMemberById(memberVO.getMemberId());
	        if (resultVO != null && passwordEncoder.matches(memberVO.getMemberPwd(), resultVO.getMemberPwd())) {
	            session.setAttribute("memberIdx", resultVO.getMemberIdx());
	            session.setAttribute("memberId", resultVO.getMemberId());
	            session.setAttribute("memberName", resultVO.getMemberName());
	            session.setMaxInactiveInterval(1800); // 세션 유효 시간 설정 (30분)
	            loginSuccess = true; // 로그인 성공 시 true
	        }
	    } catch (Exception e) {
	        // 예외 처리 로직
	    }
	    return ResponseEntity.ok(loginSuccess); // true/false 반환
	 }
	 
	 /* 로그아웃 처리 */
    @GetMapping("/member/logout.do")
    public String logout(HttpSession session, HttpServletResponse response) {
        // 세션 무효화
        if (session != null) {
        	session.setAttribute("memberIdx", null); // 회원 고유 번호 저장
            session.invalidate();
        }
        return "redirect:/main.do"; // 메인 페이지로 리다이렉트
    }
}
