<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>로그인 - VibeStay</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/login.css">
    
    <script type="text/javascript" src="/js/jquery-3.6.0.min.js"></script>
    <script type="text/javascript" src="<c:url value='/js/member/login_member.js' />"></script>
    
</head>
<body>
    <div class="login-container d-flex justify-content-center align-items-center vh-100">
        <div class="login-box p-4 shadow text-center">
            <!-- 로고 -->
            <div class="mb-5">
                <a href="/main.do">
                    <img src="/img/UI/Main_Logo_Roof.png" alt="VibeStay 로고" width="200">
                </a>
            </div>

            <!-- 로그인 폼 -->
            <form name="loginForm" id="loginForm" action="/member/login.do" method="post">
			    <!-- 아이디 -->
			    <div class="input-group">
			        <span class="input-group-text bg-white group-input-id">
			            <img src="/img/UI/login_id2.png" alt="아이디 아이콘" width="25">
			        </span>
			        <input type="text" class="form-control input-id" id="memberId" name="memberId" placeholder="아이디">
			    </div>
			
			    <!-- 비밀번호 -->
			    <div class="input-group mb-3">
			        <span class="input-group-text bg-white group-input-pwd">
			            <img src="/img/UI/login_pwd2.png" alt="비밀번호 아이콘" width="25">
			        </span>
			        <input type="password" class="form-control input-pwd" id="memberPwd" name="memberPwd" placeholder="비밀번호">
			    </div>
			
				<!-- error-message (에러 알림)  -->
				<div class="error-message-div mb-3">
					<span class="error-message" id="error-message"></span>
				</div>
			
			    <!-- 로그인 상태 유지 체크박스 -->
			    <div class="form-check mb-3">
			        <input class="form-check-input" type="checkbox" id="rememberMe" name="rememberMe">
			        <label class="form-check-label" for="rememberMe">
			            로그인 상태 유지
			        </label>
			    </div>
			
			    <!-- 로그인 버튼 -->
			    <button type="button" id="memberLoginBtn" class="btn btn-primary w-100 mb-3" onclick="fnMemberLogin()">로그인</button>
			
			    <!-- 링크: 아이디 찾기 | 비밀번호 찾기 | 회원가입 -->
			    <div class="d-flex justify-content-center small-links">
			        <a href="/find-id" class="me-2">아이디 찾기</a> <span class="pipe">|</span>
			        <a href="/forgot-password" class="mx-2">비밀번호 찾기</a> <span class="pipe">|</span>
			        <a href="/member/register.do" class="ms-2">회원가입</a>
			    </div>
			</form>
			<div>
				<a href="#">
                    <img src="/img/UI/kakao_login_medium_narrow.png" class="social_login" alt="kakao 로고" width="150">
                </a>
			</div>
        </div>
    </div>
    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
