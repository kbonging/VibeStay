package com.project.VibeStay.index;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.project.VibeStay.member.MemberService;

import lombok.RequiredArgsConstructor;

@Controller
public class IndexController {
	
	@GetMapping("/")
	public String index() {
		return "index";
	}
	
	@GetMapping("/main.do")
	public String main() {
		return "redirect:/";
	}
}
