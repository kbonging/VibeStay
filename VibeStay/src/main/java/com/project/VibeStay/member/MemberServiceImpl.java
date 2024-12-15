package com.project.VibeStay.member;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {
	
	private final MemberDAO memberDAO;

	@Override
	public MemberVO selectMemberByEmail(String email) {
		return memberDAO.selectMemberByEmail(email);
	}

	@Override
	public MemberVO selectMemberById(String memberId) {
		return memberDAO.selectMemberById(memberId);
	}
	
}