package springcome.utility;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/*
 * 클래스: Sha256
 * 작성자: 이동현
 * 책임: 쿠키 암호화를 위한 SHA256 알고리즘을 구현한 클래스
 */

public class Sha256 {

	private Sha256() {

	}
	
	/*
	* 함수: getHash
	* 작성자: 이동현
	* 기능: 입력받은 문자열을 SHA-256 일방향 해시함수로 암호화
	*/

	public static String getHash(String input) {
		StringBuilder result = new StringBuilder();
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(input.getBytes());
			byte[] bytes = md.digest();
			for (int i = 0; i < bytes.length; i++) {
				result.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
			}
		} catch (NoSuchAlgorithmException e) {
			e.getMessage();
		}
		return result.toString();
	}

}
