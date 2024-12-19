package com.project.VibeStay.member;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MemberDAO {
	// 이메일로 회원 정보 조회
	public MemberVO selectMemberByEmail(String email);
	// 아이디로 회원 정보 조회
	public MemberVO selectMemberById(String memberId);
	// local 회원 가입
	public int insertMember(MemberVO memberVO);
}
