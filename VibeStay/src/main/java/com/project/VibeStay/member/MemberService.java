package com.project.VibeStay.member;

public interface MemberService {
	/** 이메일로 회원 정보 조회 */
	public MemberVO selectMemberByEmail(String email);
	/** 아이디로 회원 정보 조회 */
	public MemberVO selectMemberById(String memberId);
	/** local 회원 가입 */
	public int insertMember(MemberVO memberVO);
	/** 아이디 중복 체크 */
	public int countByMemberId(String memberId);
	/** 이메일 중복 체크 */
	public int countByMemberEmail(String memberEmail);
}
