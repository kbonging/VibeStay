package com.project.VibeStay.email;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.project.VibeStay.member.MemberController;
import com.project.VibeStay.member.MemberVO;

import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	private final EmailService emailService;
	
	/* 이메일 전송 */
	@PostMapping("/sendEmail")
	public ResponseEntity<Boolean> sendEmail(@RequestBody MemberVO memberVO, HttpSession session){
		logger.info("@@@@@ 이메일 전송 메서드 @@@@@");
		
		boolean sendEmailSuccess = false; // 이메일 전송 실패
		String randomCode = emailService.randomCode();
		System.out.println("############" + memberVO.toString());
		
		// 이전 세션 값 삭제 (이메일 재전송 시)
		session.removeAttribute("verificationEmail");
		session.removeAttribute("verificationCode");
		session.removeAttribute("verificationCodeTimestamp");
		// 메일 정보 설정
		String email = memberVO.getMemberEmail();
		String subject = "[VibeStay]에서 보낸 인증번호입니다.";
		String text = emailService.createEmailContent(randomCode);
		
		
        try {
        	//이메일 전송
			emailService.sendEmail(email, subject, text);
			
			 // 세션에 이메일과 인증 코드 저장
	        session.setAttribute("verificationEmail", email);
	        session.setAttribute("verificationCode", randomCode);
	        session.setAttribute("verificationCodeTimestamp", System.currentTimeMillis()); // 현재 시간 저장
			sendEmailSuccess = true;
		} catch (UnsupportedEncodingException | MessagingException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(sendEmailSuccess);
	}
	
	/* 이메일 인증 */
	@PostMapping("/verifyCode")
	public ResponseEntity<Boolean> verifyCode(@RequestBody Map<String, String> requestBody, HttpSession session) {
	    String storedCode = (String) session.getAttribute("verificationCode");
	    String storedEmail = (String) session.getAttribute("verificationEmail");
	    Long timestamp = (Long) session.getAttribute("verificationCodeTimestamp");
	    
	    String email = requestBody.get("email");
	    String code = requestBody.get("code");
	    
	    System.out.println("##### "+requestBody.get("email")+", "+requestBody.get("code")+"###########");
	    
	    // 이메일 비교
	    if (storedEmail == null || !storedEmail.equals(email)) {
	    	return ResponseEntity.ok(false); // 이메일이 null이거나 입력값과 전송된 메일이 다를 경우
	    }
	    
	    // 만료 시간 체크 (5분 = 300000 milliseconds)
	    if (timestamp != null && (System.currentTimeMillis() - timestamp) > 300000) { // 5분이 경과했는지 확인
	        session.removeAttribute("verificationEmail");
	        session.removeAttribute("verificationCode");
	        session.removeAttribute("verificationCodeTimestamp");
	        return ResponseEntity.ok(false); // 코드 만료
	    }

	    // 인증 코드 비교
	    if (storedCode == null || !storedCode.equals(code)) {
	        return ResponseEntity.ok(false); // 코드가 다르거나 null인 경우 인증 실패
	    }
	    
	    // 인증 성공 시, 인증 상태를 세션에 저장
	    session.setAttribute("isVerified", true);  // 인증 성공 상태를 추가
	    // 인증 코드와 타임스탬프 삭제 (불필요한 데이터 제거)
	    session.removeAttribute("verificationCode");
	    session.removeAttribute("verificationCodeTimestamp");
	    
	    return ResponseEntity.ok(true);
	}
}
