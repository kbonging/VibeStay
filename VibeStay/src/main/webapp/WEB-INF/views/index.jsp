<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>VibeStay | main</title>
</head>
<body>
	<a href="/main.do">
	     <img src="/img/UI/Main_Logo_Roof.png" class="image" alt="Example Image" width="200"/>
	</a>
	<h1>index 페이지</h1>
	<br>
	<c:choose>
		<c:when test="${not empty sessionScope.memberIdx}">
			"${sessionScope.memberName}" 님이 로그인중<br>
			<a href="/member/logout.do">로그아웃</a>
		</c:when>
		<c:otherwise>
			비로그인중
			<a href="/member/login.do">로그인 페이지 이동</a>
		</c:otherwise>
	</c:choose>
	머지 테스트
</body>
</html>