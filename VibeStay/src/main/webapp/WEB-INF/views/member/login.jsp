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
            <form action="/member/login.do" method="post">
			    <!-- 아이디 -->
			    <div class="input-group">
			        <span class="input-group-text bg-white group-input-id">
			            <img src="/img/UI/login_id2.png" alt="아이디 아이콘" width="25">
			        </span>
			        <input type="text" class="form-control input-id" id="memberId" name="memberId" placeholder="아이디" required>
			    </div>
			
			    <!-- 비밀번호 -->
			    <div class="input-group mb-3">
			        <span class="input-group-text bg-white group-input-pwd">
			            <img src="/img/UI/login_pwd2.png" alt="비밀번호 아이콘" width="25">
			        </span>
			        <input type="password" class="form-control input-pwd" id="memberPwd" name="memberPwd" placeholder="비밀번호" required>
			    </div>
			
			    <!-- 로그인 상태 유지 체크박스 -->
			    <div class="form-check mb-3">
			        <input class="form-check-input" type="checkbox" id="rememberMe" name="rememberMe">
			        <label class="form-check-label" for="rememberMe">
			            로그인 상태 유지
			        </label>
			    </div>
			
			    <!-- 로그인 버튼 -->
			    <button type="submit" class="btn btn-primary w-100 mb-3">로그인</button>
			
			    <!-- 링크: 아이디 찾기 | 비밀번호 찾기 | 회원가입 -->
			    <div class="d-flex justify-content-center small-links">
			        <a href="/find-id" class="me-2">아이디 찾기</a> <span class="pipe">|</span>
			        <a href="/forgot-password" class="mx-2">비밀번호 찾기</a> <span class="pipe">|</span>
			        <a href="/register" class="ms-2"><span class="blue">회원가입</span></a>
			    </div>
			</form>

        </div>
    </div>
    <!-- Bootstrap 5 JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
