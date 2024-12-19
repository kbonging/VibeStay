package com.project.VibeStay.member;

import com.project.VibeStay.cmm.DefaultVO;

import lombok.ToString;

@ToString(callSuper = true)
public class MemberVO extends DefaultVO{
	private int memberIdx; // 회원 고유번호 (PK)
    private String memberId = ""; // 자체 회원 아이디
    private String memberPwd = ""; // 자체 회원 비밀번호
    private String memberName = ""; // 회원명
    private String memberEmail = ""; // 회원 이메일
    
	public int getMemberIdx() {
		return memberIdx;
	}
	public void setMemberIdx(int memberIdx) {
		this.memberIdx = memberIdx;
	}
	public String getMemberId() {
		return memberId;
	}
	public void setMemberId(String memberId) {
		this.memberId = memberId;
	}
	public String getMemberPwd() {
		return memberPwd;
	}
	public void setMemberPwd(String memberPwd) {
		this.memberPwd = memberPwd;
	}
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public String getMemberEmail() {
		return memberEmail;
	}
	public void setMemberEmail(String memberEmail) {
		this.memberEmail = memberEmail;
	}
    
}
