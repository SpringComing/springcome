package springcome.utility;

import java.util.HashMap;

import org.json.simple.JSONObject;

import net.nurigo.java_sdk.api.Message;

/*
 * 클래스: MessageSender
 * 작성자: 이동현
 * 책임: 휴대폰 인증 기능
 */

public class MessageSender {

	String api_key = "NCSN3OZTFSG2HDLF";
	String api_secret = "URFXYWUJ6QYIJEDGQQZFSXTH3VL7SIYI";

	/*
	* 함수: send
	* 작성자: 이동현
	* 기능: 전달받은 휴대폰 번호로 문자 전송
	*/
	
	public void send(String tel, String text) {

		Message coolsms = new Message(api_key, api_secret);
		HashMap<String, String> params = new HashMap<String, String>();

		params.put("to", "01039977968");
		params.put("from", "01039977968"); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
		params.put("type", "SMS");
		params.put("text", "[Spring is Comming] 인증번호 : " + text);
		params.put("app_version", "test app 1.2");

		try {
			JSONObject obj = (JSONObject) coolsms.send(params);

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

}
