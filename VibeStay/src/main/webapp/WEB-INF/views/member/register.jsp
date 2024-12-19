<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>회원가입 - VibeStay</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/memberRegister.css">
    
    <script type="text/javascript" src="/js/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="<c:url value='/js/member/register_member.js' />"></script>
</head>
<body>
    <div class="login-container d-flex justify-content-center align-items-center vh-100">
        <div class="login-box p-4 shadow text-center" style="width: 500px;">
            <!-- 로고 -->
            <div class="mb-3">
                <a href="/main.do">
                    <img src="/img/UI/Main_Logo_Roof.png" alt="VibeStay 로고" width="200">
                </a>
            </div>
			<div class="mb-3" id="pageDescription">
				회원가입
			</div>
            <!-- 회원가입 폼 -->
            <form name="registerForm" id="registerForm" action="/member/register.do" method="post">
			    <!-- 아이디 -->
			    <div class="mb-3 text-start">
			        <label for="memberId" class="form-label">아이디</label>
			        <input type="text" class="form-control" id="memberId" name="memberId" placeholder="6~20자 영문, 숫자" required>
			    </div>
			
			    <!-- 비밀번호 -->
			    <div class="mb-3 text-start">
			        <label for="memberPwd" class="form-label">비밀번호</label>
			        <input type="password" class="form-control" id="memberPwd" name="memberPwd" placeholder="8~12자 영문, 숫자, 특수문자" required>
			    </div>
			
			    <!-- 비밀번호 확인 -->
			    <div class="mb-3 text-start">
			        <label for="confirmMemberPwd" class="form-label">비밀번호 확인</label>
			        <input type="password" class="form-control" id="confirmMemberPwd" name="confirmMemberPwd" placeholder="8~12자 영문, 숫자, 특수문자" required>
			    </div>
			
			    <!-- 이메일 -->
			    <div class="mb-3 text-start">
			        <label for="memberEmail" class="form-label">이메일</label>
			        <div class="d-flex">
			            <input type="email" class="form-control me-2" id="memberEmail" name="memberEmail" placeholder="예) Vibestay@gmail.com" required>
			            <button type="button" class="btn btn-secondary" id="sendEmailBtn" onclick="fnSendEmail()">인증번호 전송</button>
			        </div>
			    </div>
			    
			    <!-- 인증번호 -->
			    <div class="mb-3 text-start" id="verificationCodeDiv" style="display: none;">
			        <label for="verificationCode" class="form-label">인증번호</label>
			        <input type="text" class="form-control" id="verificationCode" name="verificationCode" placeholder="인증번호를 입력하세요">
			    </div>
			    
			    <!-- 이름 -->
			    <div class="mb-3 text-start">
			        <label for="memberName" class="form-label">이름</label>
			        <input type="text" class="form-control" id="memberName" name="memberName" placeholder="이름을 입력하세요" required>
			    </div>
			
			    <!-- 회원가입 버튼 -->
			    <button type="submit" id="memberRegisterBtn" class="btn btn-primary w-100 mb-3">회원가입</button>
			
			    <!-- 링크: 로그인 -->
			    <div class="d-flex justify-content-center small-links">
			        <a href="/member/login.do" class="text-decoration-none">이미 계정이 있으신가요? 로그인</a>
			    </div>
			</form>
        </div>
    </div>
    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
