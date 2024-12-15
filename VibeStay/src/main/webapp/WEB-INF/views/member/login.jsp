<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>로그인 - VibeStay</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="/css/login.css" />
</head>

<body>
    <div class="login-container">
	    <a href="/main.do">
		    <img src="/img/UI/Logo.png" class="image" alt="Example Image" width="200" height="100" />
		</a>
        <h2>로그인</h2>
        <form action="/member/login.do" method="post">
            <!-- 아이디 -->
            <div class="form-group mb-3">
                <label for="memberId">아이디</label>
                <input type="text" class="form-control" id="memberId" name="memberId" placeholder="아이디를 입력하세요" required>
            </div>

            <!-- 비밀번호 -->
            <div class="form-group mb-3">
                <label for="memberPwd">비밀번호</label>
                <input type="password" class="form-control" id="memberPwd" name="memberPwd" placeholder="비밀번호를 입력하세요" required>
            </div>

            <!-- 로그인 버튼 -->
            <button type="submit" class="btn btn-primary">로그인</button>

            <!-- 비밀번호 찾기 링크 -->
            <a href="/forgot-password" class="btn-link forgot-password">비밀번호를 잊으셨나요?</a>
        </form>
    </div>
    <!-- JavaScript -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
