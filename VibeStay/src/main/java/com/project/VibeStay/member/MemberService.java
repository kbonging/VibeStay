package com.project.VibeStay.member;

public interface MemberService {
	// 이메일로 회원 정보 조회
	public MemberVO selectMemberByEmail(String email);
	// 아이디로 회원 정보 조회
	public MemberVO selectMemberById(String memberId);
}
