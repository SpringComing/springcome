/*
* 함수: setCookie
* 작성자: 이동현
* 기능: 쿠키 설정
*/
function setCookie(cookie_name, value, miuntes) {
	const exdate = new Date();
	exdate.setMinutes(exdate.getMinutes() + miuntes);
	const cookie_value = escape(value) + ((miuntes == null) ? '' : '; expires=' + exdate.toUTCString());
	document.cookie = cookie_name + '=' + cookie_value;
}

/*
* 함수: getCookie
* 작성자: 이동현
* 기능: 쿠키 가져오기
*/
function getCookie(cookie_name) {
	var x, y;
	var val = document.cookie.split(';');

	for (var i = 0; i < val.length; i++) {
		x = val[i].substr(0, val[i].indexOf('='));
		y = val[i].substr(val[i].indexOf('=') + 1);
		x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
		if (x == cookie_name) {
			return unescape(y); // unescape로 디코딩 후 값 리턴
		}
	}
}

/*
* 함수: remember
* 작성자: 이동현
* 기능: 이메일 저장 체크박스 여부를 확인하여 쿠키에 저장
*/
function remember(){
	if($(check).is(":checked")){
		setCookie('checkbox','check',4320);
		setCookie('rememberemail',$('#email').val(),4320);
	}else{
		setCookie('checkbox','',0);
		setCookie('rememberemail','',0)

	}
}