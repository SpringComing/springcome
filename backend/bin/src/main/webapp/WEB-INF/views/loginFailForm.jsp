<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link rel="preconnect" href="https://fonts.gstatic.com">
<link rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<link
	href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;600&display=swap"
	rel="stylesheet">
<link href="${pageContext.request.contextPath }/assets/css/login.css"
	rel="stylesheet" type="text/css">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<title>로그인 페이지</title>
</head>

<body>
	<div class="background">
		<div class="shape"></div>
		<div class="shape"></div>
	</div>
	<form action="/login" method="POST">
		<h3>Spring Coming</h3>
		<br /> <br />
		<div class="loginform">
			<input type="text" name="email" id="email" placeholder="Email"> <input
				type="password" name="password" placeholder="Password"> <input
				type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
			<input type="checkbox" name="check" id="check"
				style='width: 15px; height: 15px; display: inline'/> <span
				class="text"><strong>이메일 저장</strong></span><br /><span style="color:red; font-weight: bold;">일치하는 정보가 없습니다.</span><br /> <br /> <input
				style="font-weight: bold" type="submit" value="LOGIN" onclick="remember()">
				
	</form>
	<br />
	<p style='text-align: center'>
		<a href="${pageContext.request.contextPath }/findForm">forgot id /
			password ?</a>
	</p>
	<br />
	<p style='text-align: center'>
		Not a Member? <a href="${pageContext.request.contextPath }/joinForm">Sign
			up now!</a>
	</p>

</body>
<script src="/assets/js/cookie.js"></script>
<script>
	window.onload = function() {
		if(getCookie('checkbox') == 'check'){
			$("input:checkbox[id='check']").prop("checked", true);  
			$('#email').val(getCookie('rememberemail'));
		}else{
			$("input:checkbox[id='check']").prop("checked", false); 
		}

	}
	
	
</script>
</html>