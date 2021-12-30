<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<link href="${pageContext.request.contextPath }/assets/css/find.css"
	rel="stylesheet" type="text/css">
<link
	href="${pageContext.request.contextPath }/assets/css/jquery.modal.css"
	rel="stylesheet" type="text/css">

<script src="http://code.jquery.com/jquery-latest.js"></script>

<title>Insert title here</title>
</head>
<body>

	<center>
		<img src="/assets/images/logo.png" width="20%" height="5%" />
	</center>
	<div id="content">

		<div class="titleArea">
			<h2>아이디 찾기</h2>
		</div>
		<form name="form1" method="post" action="/shop/lostpass.html"
			target="loginiframe">
			<input type="hidden" name="focus_ok"> <input type="hidden"
				name="msecure_key"> <input type="hidden" name="sslid"
				value="tr5923"> <input type="hidden" name="sslip"
				value="natureformula.co.kr"> <input type="hidden"
				name="mail"> <input type="hidden" name="authtext" value="">
			<input type="hidden" name="authid"> <input type="hidden"
				name="find_type" value="find_pw">
			<div id="find_id" class="find_idpw" style="margin-top: 0;">
				<div class="contentbox">
					<div class="subtit">회원가입 시, 입력하신 이름 + 휴대폰 번호로 아이디를 확인하실 수
						있습니다.</div>
					<br />
					<div class="radio-wrap">
						<label> <input type="radio" name="find_id_type"
							value="email" checked="checked"> 휴대폰 번호로 찾기
						</label>
					</div>
					<br />
					<div class="find-info">
						<table>
							<colgroup>
								<col width="100">
								<col width="*">
							</colgroup>
							<tbody>
								<tr class="user-name" height="44">
									<th scope="row"><div>이름</div></th>
									<td><div>
											<input type="text" id="name" name="name" class="MS_input_txt"
												maxlength="30" title="이름">
										</div></td>
								</tr>
								<tr id="find_id_email_wrap">
									<th scope="row"><div>휴대폰 번호</div></th>
									<td><div>
											<input type="text" id="tel" name="tel" class="MS_input_txt"
												value="" maxlength="30" title="휴대폰 번호">
										</div></td>
								</tr>
							</tbody>
						</table>
						<br />
						<div id="checkUser"
							style="color: red; font-weight: bold; text-align: center;"></div>

						<br />

						<div class="btn-area">
							<a class="info-confirm btn_point btn_03"
								onclick="findId();">아이디 찾기</a> <a
								class="info-confirm btn_white btn_03" href="/loginForm">로그인</a>
						</div>
					</div>
				</div>
				<br /> <br />
			</div>
			</form>
			<!--/#find_id/-->
			<hr />
			<br />

			<div class="titleArea">
				<h2>비밀번호 찾기</h2>
			</div>

			<div id="find_pw" class="find_idpw">
				<div class="contentbox">
					<div class="subtit">회원가입 시, 입력하신 이메일 + 휴대폰번호로 새로운 비밀번호를 설정할 수
						있습니다.</div>
					<br />
					<div class="radio-wrap">
						<label> <input type="radio" name="find_pw_type"
							value="email" checked="checked"> 휴대폰 번호로 찾기
						</label>
					</div>
					<br />
					<div id="find_pw_input_wrap">
						<div class="find-info">
							<table border="0" summary="이름, 이메일, 휴대폰 번호">
								<colgroup>
									<col width="100">
									<col width="*">
								</colgroup>
								<tbody>
									<tr class="user-name" height="44">
										<th scope="row"><div>이메일</div></th>
										<td>
											<div>
												<input type="text" name="email2" id="email2"
													class="MS_input_txt" maxlength="30">
											</div>
										</td>
									</tr>
									<tr id="find_pw_email_wrap">
										<th scope="row"><div>휴대폰 번호</div></th>
										<td>
											<div>
												<input type="text" id="tel2" name="tel2"
													class="MS_input_txt" value="" maxlength="30" title="휴대폰 번호"
													onfocus="document.form1.focus_ok.value='yes'">
											</div>
										</td>
									</tr>
								</tbody>
							</table>
							<br />

							<div id="checkUser2"
								style="color: red; font-weight: bold; text-align: center;"></div>

							<br />

							<div class="btn-area">
								<a class="btn_point btn_03" onclick="findPwd();">비밀번호
									찾기</a> <a href="/loginForm" class="btn_white btn_03">로그인</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!--/#find_pw/-->
		</form>
		<br /> <br />
	</div>

	<div id="authLayerTemp">
		<!-- 인증 layerpopup -->
		<div id="authLayer" class="layerstyle4"
			style="width: 450px; margin-left: -225px; top: 50%; left: 50%; z-index: 90001; position: fixed; margin-top: -171px; display: block;">
			<div class="layerstyle4_po">
				<div class="layerstyle4_title">
					<h3 style='font-weight: bold;'>인증번호 입력</h3>
					<button id="authLayerClose" class="btn_layerstyle4_close"
						onclick="$('#authLayerTemp').hide(); stopTimer();"></button>
				</div>
				<div class="layerstyle4_cont" style="height: 300px;">

					<div id="authCheckLayer" class="phone_authno_wrap">
						<h5 class="font-Noto">
							<span>회원가입 시 등록한 휴대폰 번호</span><br> <span id="inputtel"></span>
							<span data-langcode="H518">으로<br>4자리 인증번호가 전송되었습니다.
							</span>
						</h5>
						<div class="phone_authno ipt_center">
							<span class="iptbx" style="cursor: pointer;"> <input
								id="AUTH_NO" type="text" class="font-Noto" name="AUTH_NO"
								style="width: 160px;" maxlength="4"><span id="authTime"
								class="time end"></span>
							</span>
						</div>

						<div class="errormsg">
							<!-- 인증실패시 메시지 -->
							<p id="authErrMsgLayer" style="">
								<span id="authErrMsg"></span><a id="authReSend" href=""
									onclick="stopTimer(); $('#authLayerTemp').hide(); find();"
									data-langcode="H520">재전송</a>
							</p>
						</div>
						<button id="authSendBtn" class="btnst02 off"
							style="width: 300px; display: inline-block;" onclick="authTel();">확인</button>
						<br />
					</div>


				</div>
			</div>
		</div>
	</div>


	<script src="/assets/js/findscript.js"></script>
	<script>
		//$(document).ajaxSend(function(e, xhr, options) {
		//	xhr.setRequestHeader("${_csrf.headerName}", "${_csrf.token}");
		//});

		$(document).ready(function() {
			$('#authLayerTemp').hide();
		})
	</script>

</body>
</html>