package com.project.VibeStay.member;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;


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
	public String login(@ModelAttribute MemberVO memberVO, Model model, HttpSession session, 
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		 //System.out.println("/member/login.do-#####"+memberVO.toString());
		 logger.info("로그인 처리-"+memberVO.toString());
		 String url = "/member/login.do", msg = "아이디 또는 비밀번호가 잘못 되었습니다. 아이디와 비밀번호를 정확히 입력해 주세요. ";
	    	
	    if (session != null) { // 기존 세션이 있으면 세션을 무효화합니다.
	        session.invalidate(); // 기존 세션을 삭제
	    }
	    session = request.getSession(true); // 새로운 세션 생성
	    
		MemberVO resultVO = memberService.selectMemberById(memberVO.getMemberId());
		if(resultVO != null) {
			if(passwordEncoder.matches(memberVO.getMemberPwd(), resultVO.getMemberPwd())) {
	            session.setAttribute("memberIdx", resultVO.getMemberIdx()); // 회원 고유 번호 저장
	            session.setAttribute("memberId", resultVO.getMemberId()); // 회원 아이디 저장
	            session.setMaxInactiveInterval(1800); // 세션 유효 시간 설정 (30분 = 1800초)
	            
	            return "redirect:/main.do"; // 메인 페이지로 리다이렉트
			}
		}
		model.addAttribute("url", url);
		model.addAttribute("msg", msg);
		return "common/message";
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
