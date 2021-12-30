var email_ok;
var password_ok;
var tel_ok;
var timer;
const SERVER_URL = "http://localhost:8080";
/*
* 함수: msg_time
* 작성자: 이동현
* 기능: 인증시간 카운트
*/

function msg_time() {   // 1초씩 카운트      
	m = Math.floor(timer / 60) + "분 " + (timer % 60) + "초"; // 남은 시간 계산     
	$("#authTime").text(m);
	timer--;                  // 1초씩 감소
	if (timer == 0) {          // 시간이 종료 되었으면..        
		$("#authTime").text('인증시간 초과');
		clearInterval(tid);

	}
}

/*
* 함수: stopTimer
* 작성자: 이동현
* 기능: 인증시간 중지
*/

function stopTimer() {
	$("#authTime").text('');
	$("#authErrMsg").text('');
	$("#AUTH_NO").val('');
	clearInterval(tid);
}

/*
* 함수: emailAuth
* 작성자: 이동현
* 기능: 이메일 인증
*/

function emailAuth() {
	var authNum = $("#AUTH_NO").val();
	var email = $("#email").val();
	var name = $("#name").val();
	var password = $("#password").val();
	var birth = $("#birth").val();
	var tel = $("#tel").val();


	var sendData = {
		"authNum": authNum,
		"cookie": getCookie('테스트쿠키'),
		"email": email,
		"name": name,
		"password": password,
		"birth": birth,
		"tel": tel
	}

	$.ajax({
		method: 'POST',
		url: '/user/authemail',
		data: sendData,
		success: function(resp) {
			if (resp == 'success') {
				stopTimer();
				$('#authLayerTemp').hide();
				successBox('회원가입 성공');

			} else if (resp == 'serverError') {
				errorBox('서버 상태를 확인하세요.');

			} else {
				$("#authErrMsg").text('인증 번호를 확인하세요.');

			}
		},
		error: function() {
			console.log('error');
		}
	})


}

/*
* 함수: TimerStart
* 작성자: 이동현
* 기능: 타이머 실행
*/

function TimerStart() {
	timer = 180;
	tid = setInterval('msg_time()', 1000);
};

/*
* 함수: checkEmail
* 작성자: 이동현
* 기능: 이메일 유효성 검사
*/

function checkEmail() {
	var email = $("#email").val();
	var sendData = {
		"email": email
	}

	$.ajax({
		method: 'POST',
		url: '/user/checkemail',
		data: sendData,
		success: function(resp) {
			if (resp == 'exist') {
				$('#check_email').css('color', 'red')
				$('#check_email').html("사용중인 이메일입니다.")
				email_ok = false;

			} else if (resp == 'success') {
				$('#check_email').css('color', 'blue')
				$('#check_email').html("사용할 수 있는 이메일입니다.")
				email_ok = true;

			} else {
				$('#check_email').css('color', 'red')
				$('#check_email').html("이메일 형식이 잘못되었습니다.")
				email_ok = false;
			}
		},
		error: function() {
			email_ok = false;
		}
	})
}

/*
* 함수: checkPassword
* 작성자: 이동현
* 기능: 비밀번호 유효성 검사
*/

function checkPassword() {
	var pwd1 = $("#password").val();
	var pwd2 = $("#check_password").val();
	var sendData = {
		"password": pwd1,
		"check_password": pwd2
	}

	$.ajax({
		method: 'POST',
		url: '/user/checkpassword',
		data: sendData,
		success: function(resp) {
			if (resp == 'nomatches') {
				$('#check_pwd').css('color', 'red')
				$('#check_pwd').html("비밀번호가 일치하지 않습니다.")
				password_ok = false;

			} else if (resp == 'success') {
				$('#check_pwd').css('color', 'blue')
				$('#check_pwd').html("비밀번호가 일치합니다.")
				password_ok = true;

			} else {
				$('#check_pwd').css('color', 'red')
				$('#check_pwd').html("비밀번호는 5~30자 이하의 영문+숫자 조합을 사용하세요.")
				password_ok = false;
			}
		},
		error: function() {
			password_ok = false;
		}
	})

}

/*
* 함수: checkTel
* 작성자: 이동현
* 기능: 휴대폰 번호 유효성 검사
*/

function checkTel() {
	var tel = $("#tel").val();
	var sendData = {
		"tel": tel
	}

	$.ajax({
		method: 'POST',
		url: '/user/checktel',
		data: sendData,
		success: function(resp) {
			if (resp == 'success') {
				$('#check_tel').css('color', 'blue')
				$('#check_tel').html("사용할 수 있는 휴대폰 번호 입니다.")
				tel_ok = true;

			} else if(resp == 'used'){
				$('#check_tel').css('color', 'red')
				$('#check_tel').html("사용중인 휴대폰 번호 입니다.")
				tel_ok = false;
			} 
			else {
				$('#check_tel').css('color', 'red')
				$('#check_tel').html("휴대폰 번호 형식이 잘못되었습니다.")
				tel_ok = false;
			}
		},
		error: function() {
			tel_ok = false;
		}
	})
}

$(".modal_content").click(function() {
	$(".modal").fadeOut();
});

/*
* 함수: checkInformation
* 작성자: 이동현
* 기능: 회원가입 폼 입력값 유효성 검사 / 인증메일 전송
*/

function checkInformation() {

	if (email_ok && password_ok && tel_ok) {

		var email = $("#email").val();
		var sendData = {
			"email": email
		}

		$.ajax({
			method: 'POST',
			url: '/user/sendemail',
			data: sendData,

			beforeSend: function() {

				timer = 180;
				TimerStart();
				$("#inputemail").text(email);
				$('#authLayerTemp').show();

			},

			success: function(resp) {
				$('#Progress_Loading').hide();
				setCookie('테스트쿠키', resp.rand,1);

				if (resp.result == 'success') {

				} else {
					console.log('error');

				}
			},
			
			error: function() {
				console.log('error');
			}
		})


	} else {
		console.log("가입 불가");
	}



}

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
* 함수: successBox
* 작성자: 이동현
* 기능: 회원가입 성공 모달
*/

function successBox(txt) {
	modal({
		type: 'success',
		title: 'Success',
		text: txt
	});

}

/*
* 함수: successBox
* 작성자: 이동현
* 기능: 회원가입 실패 모달
*/

function errorBox(txt) {
	modal({
		type: 'error',
		title: 'Error',
		text: txt
	});

}

/*
* 함수: successBox
* 작성자: 이동현
* 기능: 모달 설정
*/

function modal(e) {
	return $.cModal(e)
} (function(e) {
	e.cModal = function(t) {
		var n = {
			type: "default",
			title: null,
			text: null,
			size: "normal",
			buttons: [{
				text: "OK",
				val: true,
				onClick: function(e) {
					location.href = `${SERVER_URL}/loginForm`;
				}
			}],
			center: true,
			autoclose: false,
			callback: null,
			onShow: null,
			animate: true,
			closeClick: true,
			closable: true,
			theme: "default",
			background: null,
			zIndex: 1050,
			buttonText: {
				ok: "OK",
				yes: "Yes",
				cancel: "Cancel"
			},
			template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title"><a class="modal-close-btn"></a></div><div class="modal-text"></div><div class="modal-buttons"></div></div></div>',
			_classes: {
				box: ".modal-box",
				boxInner: ".modal-inner",
				title: ".modal-title",
				content: ".modal-text",
				buttons: ".modal-buttons",
				closebtn: ".modal-close-btn"
			}
		},
			t = e.extend({}, n, t),
			r, i = e("<div id='modal-window' />").hide(),
			s = t._classes.box,
			o = i.append(t.template),
			u = {
				init: function() {
					e("#modal-window").remove();
					u._setStyle();
					u._modalShow();
					u._modalConent();
					i.on("click", "a.modal-btn", function(t) {
						u._modalBtn(e(this))
					}).on("click", t._classes.closebtn, function(e) {
						r = false;
						u._modalHide()
					}).click(function(e) {
						if (t.closeClick) {
							if (e.target.id == "modal-window") {
								r = false;
								u._modalHide()
							}
						}
					});
					e(window).bind("keyup", u._keyUpF).resize(function() {
						var e = t.animate;
						t.animate = false;
						u._position();
						t.animate = e
					})
				},
				_setStyle: function() {
					i.css({
						position: "fixed",
						width: "100%",
						height: "100%",
						top: "0",
						left: "0",
						"z-index": t.zIndex,
						overflow: "auto"
					});
					i.find(t._classes.box).css({
						position: "absolute"
					});
				},
				_keyUpF: function(e) {
					switch (e.keyCode) {
						case 13:
							if (o.find("input:not(.modal-prompt-input),textarea").is(":focus")) {
								return false
							}
							u._modalBtn(i.find(t._classes.buttons + " a.modal-btn" + (typeof u.btnForEKey !== "undefined" && i.find(t._classes.buttons + " a.modal-btn:eq(" + u.btnForEKey + ")").size() > 0 ? ":eq(" + u.btnForEKey + ")" : ":last-child")));
							break;
						case 27:
							u._modalHide();
							break
					}
				},
				_modalShow: function() {
					e("body").css({
						overflow: "hidden",
						width: e("body").innerWidth()
					}).append(o);
				},
				_modalHide: function(n) {
					if (t.closable === false) {
						return false
					}
					r = typeof r == "undefined" ? false : r;
					var o = function() {
						if (t.callback != null && typeof (t.callback) == "function" ? t.callback(r, i, u.actions) == false ? false : true : true) {
							i.fadeOut(200, function() {
								e(this).remove();
								e("body").css({
									overflow: "",
									width: ""
								})
							});
							var n = 100 * parseFloat(e(s).css("top")) / parseFloat(e(s).parent().css("height"));
							e(s).stop(true, true).animate({
								top: n + (t.animate ? 3 : 0) + "%"
							}, "fast")
						}
					};
					if (!n) {
						o()
					} else {
						setTimeout(function() {
							o()
						}, n)
					}
					e(window).unbind("keyup", u._keyUpF)
				},
				_modalConent: function() {
					var n = t._classes.title,
						r = t._classes.content,
						o = t._classes.buttons,
						a = t.buttonText,
						f = ["alert", "confirm", "prompt"],
						l = ["xenon", "atlant", "reseted"];
					if (e.inArray(t.type, f) == -1 && t.type != "default") {
						e(s).addClass("modal-type-" + t.type)
					}
					if (t.size && t.size != null) {
						e(s).addClass("modal-size-" + t.size)
					} else {
						e(s).addClass("modal-size-normal")
					}
					if (t.theme && t.theme != null && t.theme != "default") {
						e(s).addClass((e.inArray(t.theme, l) == -1 ? "" : "modal-theme-") + t.theme)
					}
					if (t.background && t.background != null) {
						i.css("background-color", t.background)
					}
					if (t.title || t.title != null) {
						e(n).prepend("<h3>" + t.title + "</h3>")
					} else {
						e(n).remove()
					}
					t.type == "prompt" ? t.text = (t.text != null ? t.text : "") + '<input type="text" name="modal-prompt-input" class="modal-prompt-input" autocomplete="off" autofocus="on" />' : "";
					e(r).html(t.text);
					if (t.buttons || t.buttons != null) {
						var c = "";
						switch (t.type) {
							case "alert":
								c = '<a class="modal-btn' + (t.buttons[0].addClass ? " " + t.buttons[0].addClass : "") + '">' + a.ok + "</a>";
								break;
							case "confirm":
								c = '<a class="modal-btn' + (t.buttons[0].addClass ? " " + t.buttons[0].addClass : "") + '">' + a.cancel + '</a><a class="modal-btn ' + (t.buttons[1] && t.buttons[1].addClass ? " " + t.buttons[1].addClass : "btn-light-blue") + '">' + a.yes + "</a>";
								break;
							case "prompt":
								c = '<a class="modal-btn' + (t.buttons[0].addClass ? " " + t.buttons[0].addClass : "") + '">' + a.cancel + '</a><a class="modal-btn ' + (t.buttons[1] && t.buttons[1].addClass ? " " + t.buttons[1].addClass : "btn-light-blue") + '">' + a.ok + "</a>";
								break;
							default:
								if (t.buttons.length > 0 && e.isArray(t.buttons)) {
									e.each(t.buttons, function(e, t) {
										var n = t["addClass"] && typeof t["addClass"] != "undefined" ? " " + t["addClass"] : "";
										c += '<a class="modal-btn' + n + '">' + t["text"] + "</a>";
										if (t["eKey"]) {
											u.btnForEKey = e
										}
									})
								} else {
									c += '<a class="modal-btn">' + a.ok + "</a>"
								}
						}
						e(o).html(c)
					} else {
						e(o).remove()
					}
					if (t.type == "prompt") {
						$(".modal-prompt-input").focus()
					}
					if (t.autoclose) {
						var h = t.buttons || t.buttons != null ? e(r).text().length * 32 : 900;
						u._modalHide(h < 900 ? 900 : h)
					}
					i.fadeIn(200, function() {
						t.onShow != null ? t.onShow(u.actions) : null;
					});
					u._position();
				},
				_position: function() {
					var n, r, i;
					if (t.center) {
						n = {
							top: e(window).height() < e(s).outerHeight() ? 1 : 50,
							left: 50,
							marginTop: e(window).height() < e(s).outerHeight() ? 0 : -e(s).outerHeight() / 2,
							marginLeft: -e(s).outerWidth() / 2
						}, r = {
							top: n.top - (t.animate ? 3 : 0) + "%",
							left: n.left + "%",
							"margin-top": n.marginTop,
							"margin-left": n.marginLeft
						}, i = {
							top: n.top + "%"
						};
					} else {
						n = {
							top: e(window).height() < e(s).outerHeight() ? 1 : 10,
							left: 50,
							marginTop: 0,
							marginLeft: -e(s).outerWidth() / 2
						}, r = {
							top: n.top - (t.animate ? 3 : 0) + "%",
							left: n.left + "%",
							"margin-top": n.marginTop,
							"margin-left": n.marginLeft
						}, i = {
							top: n.top + "%"
						};
					}
					e(s).css(r).stop(true, true).animate(i, "fast")
				},
				_modalBtn: function(n) {
					var s = false,
						o = t.type,
						a = n.index(),
						f = t.buttons[a];
					if (e.inArray(o, ["alert", "confirm", "prompt"]) > -1) {
						r = s = a == 1 ? true : false;
						if (o == "prompt") {
							r = s = s && i.find("input.modal-prompt-input").size() > 0 != 0 ? i.find("input.modal-prompt-input").val() : false
						}
						u._modalHide()
					} else {
						if (n.hasClass("btn-disabled")) {
							return false
						}
						r = s = f && f["val"] ? f["val"] : true;
						if (!f["onClick"] || f["onClick"](e.extend({
							val: s,
							bObj: n,
							bOpts: f,
						}, u.actions))) {
							u._modalHide()
						}
					}
					r = s
				},
				actions: {
					html: i,
					close: function() {
						u._modalHide()
					},
					getModal: function() {
						return i
					},
					getBox: function() {
						return i.find(t._classes.box)
					},
					getInner: function() {
						return i.find(t._classes.boxInner)
					},
					getTitle: function() {
						return i.find(t._classes.title)
					},
					getContet: function() {
						return i.find(t._classes.content)
					},
					getButtons: function() {
						return i.find(t._classes.buttons).find("a")
					},
					setTitle: function(e) {
						i.find(t._classes.title + " h3").html(e);
						return i.find(t._classes.title + " h3").size() > 0
					},
					setContent: function(e) {
						i.find(t._classes.content).html(e);
						return i.find(t._classes.content).size() > 0
					}
				}
			};
		u.init();
		return u.actions;
	}
})(jQuery);
