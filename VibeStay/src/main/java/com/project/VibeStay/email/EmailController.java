package com.project.VibeStay.email;

import java.io.UnsupportedEncodingException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.VibeStay.member.MemberController;
import com.project.VibeStay.member.MemberVO;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {
	private static final Logger logger = LoggerFactory.getLogger(MemberController.class);
	private final EmailService emailService;
	
	/* 이메일 전송 */
	@PostMapping("/sendEmail")
	public ResponseEntity<Boolean> sendEmail(@RequestBody MemberVO memberVO){
		logger.info("@@@@@ 이메일 전송 메서드 @@@@@");
		
		boolean sendEmailSuccess = false; // 이메일 전송 실패
		String randomCode = emailService.randomCode();
		System.out.println("############" + memberVO.toString());
		
		// 메일 정보 설정
		String email = memberVO.getMemberEmail();
		String subject = "[VibeStay]에서 보낸 인증번호입니다.";
		String text = emailService.createEmailContent(randomCode);
		
		 //이메일 전송
        try {
			emailService.sendEmail(email, subject, text);
			sendEmailSuccess = true;
		} catch (UnsupportedEncodingException | MessagingException e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(sendEmailSuccess);
	}
}
