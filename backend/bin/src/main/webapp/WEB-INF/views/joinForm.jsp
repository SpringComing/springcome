<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<title>회원가입 페이지</title>
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<link href="${pageContext.request.contextPath }/assets/css/join.css"
	rel="stylesheet" type="text/css">
	<link href="${pageContext.request.contextPath }/assets/css/jquery.modal.css"
	rel="stylesheet" type="text/css">
<script src="http://code.jquery.com/jquery-latest.js"></script>
<style media="screen">

</style>
<title>회원가입 페이지</title>
</head>
<body>
	
		<img src="/assets/images/logo.png" width="20%" height="5%"/>
	
	<div class="register">
		<br />
		<h3>회원가입</h3>
		<form name="login"
			action="#" method="post">
			<div class="flex">
				<ul class="container">
					<li class="item center">이메일</li>
					<li class="item"><input type="text" name="email" id="email"
						placeholder="ex) hyeon2142@naver.com" autofocus="autofocus"
						required></li>
					<br />
				</ul>

				<ul class="container">
					<li class="item center"></li>
					<li class="item">
						<div id="check_email"></div>
					</li>
					<br />
					<br />
				</ul>

				<ul class="container">
					<li class="item center">이름</li>
					<li class="item"><input type="text" name="name" id="name"
						placeholder="이름을 입력하세요." required></li>
				</ul>
				<br />
				<ul class="container">
					<li class="item center">비밀번호</li>
					<li class="item"><input type="password" name="password"
						id="password" placeholder="(5-30자 이하의 영문+숫자 조합)" required></li>
					<li class="item"></li>
				</ul>
				<br />
				<ul class="container">
					<li class="item center">비밀번호 확인</li>
					<li class="item"><input type="password" name="check_password"
						id="check_password" placeholder="비밀번호 재확인" required></li>
				</ul>

				<ul class="container">
					<li class="item center"></li>
					<li class="item">
						<div id="check_pwd"></div>
					</li>
					<br />
				</ul>
				<br />
				<ul class="container">
					<li class="item center">생년월일</li>
					<li class="item"><input type="date" name="birth" id="birth"
						value='1995-08-31' required></li>

				</ul>
				<br />
				<ul class="container">
					<li class="item center">휴대폰 번호</li>
					<li class="item"><input type="text" name="tel" id="tel"
						placeholder="휴대전화번호 ( 하이픈(-)을 제외하고 입력 )"></li>
					<li class="item"></li>
				</ul>
				<ul class="container">
					<li class="item center"></li>
					<li class="item">
						<div id="check_tel"></div>
					</li>
					<br />
				</ul>
				<ul class="container">
					<li class="item center"></li>
					<li class="item"><input type="button"
						onclick="checkInformation();" value="다음" /></li>
					<li class="item"></li>
				</ul>
				<br />
			</div>
		</form>
	</div>

</body>

<div id="authLayerTemp">
	<!-- 인증 layerpopup -->
	<div id="authLayer" class="layerstyle4"
		style="width: 450px; margin-left: -225px; top: 50%; left: 50%; z-index: 90001; position: fixed; margin-top: -171px; display: block;">
		<div class="layerstyle4_po">
			<div class="layerstyle4_title">
				<h3 style='font-weight:bold;'>인증번호 입력</h3>
				<button id="authLayerClose" class="btn_layerstyle4_close"
					onclick="$('#authLayerTemp').hide(); stopTimer();"></button>
			</div>
			<div class="layerstyle4_cont" style="height: 300px;">

				<div id="authCheckLayer" class="phone_authno_wrap">
					<h5 class="font-Noto">
						<span id='inputemail'></span> <span data-langcode="H518">으로<br>4자리
							인증번호가 전송되었습니다.
						</span>
					</h5>
					<div class="phone_authno ipt_center">
						<span class="iptbx" style="cursor: pointer;"> <input
							id="AUTH_NO" type="text" class="font-Noto" name="AUTH_NO" style="width: 160px;"
							maxlength="4"><span id="authTime" class="time end"></span>
						</span>
					</div>
					
					<div class="errormsg">
					<!-- 인증실패시 메시지 -->
					<p id="authErrMsgLayer" style=""><span id="authErrMsg"></span><a id="authReSend" href="#" onclick="stopTimer(); $('#authLayerTemp').hide(); checkInformation();" data-langcode="H520">재전송</a></p>
				</div>
					<button id="authSendBtn" class="btnst02 off"
						style="width: 300px; display: inline-block;"
						onclick="emailAuth();">확인</button>
					<br />
				</div>


			</div>
		</div>
	</div>
</div>
<script src="/assets/js/joinscript.js"></script>
<script>
	$(document).ready(function() {

		$('#authLayerTemp').hide();
		
	})

	//$(document).ajaxSend(function(e, xhr, options) {
	//	xhr.setRequestHeader("${_csrf.headerName}", "${_csrf.token}");
	//});

	$(function() {
		$("#email").on('keyup', checkEmail);
		$("#email").on('focusout', checkEmail);
	})

	$(function() {
		$("#check_password").on('keyup', checkPassword);
		$("#check_password").on('focusout', checkPassword);
	})

	$(function() {
		$("#tel").on('keyup', checkTel);
		$("#tel").on('focusout', checkTel);
	})
</script>
</body>
</html>