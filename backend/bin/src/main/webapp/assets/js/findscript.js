var timer;
var email;
var type;
const SERVER_URL = "http://localhost:8080";
/*
* 함수: msg_time
* 작성자: 이동현
* 기능: 메일 / 휴대폰 인증 인증시간 카운트
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
* 함수: find
* 작성자: 이동현
* 기능: 아이디 찾기, 비밀번호 찾기 타입 선택
*/

function find() {

	if (type == 1) {
		findId();
	} else {
		findPwd();
	}

}

/*
* 함수: stopTimer
* 작성자: 이동현
* 기능: 모달창 종료, 인증시간 만료 시 타이머 중지
*/

function stopTimer() {
	$("#authTime").text('');
	$("#authErrMsg").text('');
	$("#AUTH_NO").val('');
	clearInterval(tid);
}

/*
* 함수: stopTimer
* 작성자: 이동현
* 기능: 타이머 실행
*/

function TimerStart() {
	timer = 180;
	tid = setInterval('msg_time()', 1000);
};

/*
* 함수: authTel
* 작성자: 이동현
* 기능: 휴대폰 인증
*/

function authTel() {

	type = getCookie('type');

	if (type == 1) {
		var input = $("#AUTH_NO").val();
		var cookie = getCookie('telauth');
		var name = $("#name").val();
		var tel = $("#tel").val();

		var sendData = {
			"input": input,
			"cookie": cookie,
			"name": name,
			"tel": tel
		}

		$.ajax({
			method: 'POST',
			url: '/user/auth',
			data: sendData,
			success: function(resp) {
				if (resp.result == 'success') {
					stopTimer();
					$('#authLayerTemp').hide();
					email = resp.email;
					infoBox('<pre><strong><input type="radio" style="display:inline;" value="고고" checked/>' + " 이메일 : " + resp.email + "                        가입일 : " + resp.join_date + '</strong></pre>');
				} else if (resp.result == 'fail') {
					$("#authErrMsg").text('인증 번호를 확인하세요.');
				} else {
					$("#authErrMsg").text('서버 상태를 확인하세요');
				}
			},
			error: function() {
				$("#authErrMsg").text('서버 상태를 확인하세요');
			}
		})
	} else {
		var input = $("#AUTH_NO").val();
		var cookie = getCookie('telauth');
		var email2 = $("#email2").val();
		var tel2 = $("#tel2").val();
		var sendData = {
			"input": input,
			"cookie": cookie,
			"email2": email2,
			"tel2": tel2
		}

		$.ajax({
			method: 'POST',
			url: '/user/auth2',
			data: sendData,
			success: function(resp) {
				if (resp.result == 'success') {
					stopTimer();
					$('#authLayerTemp').hide();
					warningBox('<center>변경할 비밀번호 : <input type="password" style="background-color: white" name="pass1" id="pass1"/><br /><br />비밀번호 확인&nbsp&nbsp&nbsp  : <input type="password" style="background-color: white" name="pass2" id="pass2" /> <br /><br /><div id="check" name="check" style="color: red; font-weight: bold;"></div> </center>');

				} else if (resp.result == 'fail') {
					$("#authErrMsg").text('인증 번호를 확인하세요.');
				} else {
					$("#authErrMsg").text('서버 상태를 확인하세요');
				}
			},
			error: function() {
				$("#authErrMsg").text('서버 상태를 확인하세요');
			}
		})
	}
}


/*
* 함수: authTel
* 작성자: 이동현
* 기능: 아이디 찾기
*/

function findId() {
	type = 1;
	var name = $("#name").val();
	var tel = $("#tel").val();

	var sendData = {
		"name": name,
		"tel": tel
	}

	$.ajax({
		method: 'POST',
		url: '/user/find',
		data: sendData,
		success: function(resp) {
			if (resp.result == 'success') {

				$("#checkUser").text('');
				timer = 180;
				TimerStart();
				$("#inputtel").text(tel);
				$('#authLayerTemp').show();
				setCookie('telauth', resp.rand, 1);
				setCookie('type', type, 1);

			} else if (resp.result == 'fail') {
				$("#checkUser").text('일치하는 정보가 없습니다');
			} else {
				$("#checkUser").text('서버 상태를 확인하세요');
			}
		},
		error: function() {
			console.log('여기들옴')
			$("#checkUser").text('서버 상태를 확인하세요');
		}
	})

}

/*
* 함수: authTel
* 작성자: 이동현
* 기능: 비밀번호 찾기
*/

function findPwd() {
	type = 2;
	var email2 = $("#email2").val();
	var tel2 = $("#tel2").val();

	var sendData = {
		"email2": email2,
		"tel": tel2
	}

	$.ajax({
		method: 'POST',
		url: '/user/find2',
		data: sendData,
		success: function(resp) {
			if (resp.result == 'success') {
				$("#checkUser2").text('');
				timer = 180;
				TimerStart();
				$("#inputtel").text(tel2);
				$('#authLayerTemp').show();
				setCookie('telauth', resp.rand, 1);
				setCookie('type', type, 1);


			} else if (resp.result == 'fail') {
				$("#checkUser2").text('일치하는 정보가 없습니다');
			} else {
				$("#checkUser2").text('서버 상태를 확인하세요');
			}
		},
		error: function() {
			$("#checkUser2").text('서버 상태를 확인하세요');
		}
	})

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
* 함수: setCookie
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
* 함수: infoBox
* 작성자: 이동현
* 기능: 아이디 찾기 기능 수행 모달
*/

function infoBox(email) {
	modal({
		type: 'info',
		title: "고객님의 정보와 일치하는 아이디 목록입니다.",
		text: email,
	});
}

/*
* 함수: warningBox
* 작성자: 이동현
* 기능: 비밀번호 찾기 기능 수행 모달
*/

function warningBox(txt) {
	modal({
		type: 'warning',
		title: '새로운 비밀번호 설정',
		text: txt,
		center: false
	});
}

/*
* 함수: successBox
* 작성자: 이동현
* 기능: 아이디 찾기 / 비밀번호 찾기 성공 모달
*/

function successBox(txt) {
	modal({
		type: 'success',
		title: 'Success',
		text: txt
	});

}

/*
* 함수: modal
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
				text: "확인",
				val: true,
				onClick: function(e) {

					var email2 = $("#email2").val();
					var pass1 = $("#pass1").val();
					var pass2 = $("#pass2").val();
					var sendData = {
						"email2": email2,
						"pass1": pass1,
						"pass2": pass2
					}

					$.ajax({
						method: 'POST',
						url: '/user/changePWD',
						data: sendData,
						success: function(resp) {
							
							if (resp == 'success') {
								successBox('비밀번호가 성공적으로 변경되었습니다!!!');

							} else if (resp == 'fail') {
								$("#check").text('비밀번호는 5~30자 이하의 숫자 + 영문자로 구성되어야 합니다.');
							} else if (resp == 'nomatch') {
								$("#check").text('비밀번호가 일치하지 않습니다!');
							} 			
							else {
								$("#check").text('서버 상태를 확인하세요.');
							}
						},
						error: function() {

						}
					})

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
				cancle: "취소",
				login: "로그인하기"
			},
			template: '<div class="modal-box"><div class="modal-inner"><div class="modal-title"><a class="modal-close-btn"></a></div><div class="modal-text"></div><div><div class="modal-buttons"><div> </div></div></div>',
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
							case "info":
								c = '<a class="modal-btn' + (t.buttons[0].addClass ? " " + t.buttons[0].addClass : "") + '">' + a.login + '</a><a class="modal-btn ' + (t.buttons[1] && t.buttons[1].addClass ? " " + t.buttons[1].addClass : "btn-light-blue") + '">' + a.cancle + "</a>";
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
					if (e.inArray(o, ["alert", "info", "prompt", "success"]) > -1) {
						r = s = a == 1 ? true : false;
						if (o == 'info' && a == 0) {
							u._modalHide();
							location.href = `${SERVER_URL}/loginForm?` + email;
						} else if (o === 'success') {
							location.href = `${SERVER_URL}/loginForm`;
						}
						else {
							u._modalHide();
						}



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


