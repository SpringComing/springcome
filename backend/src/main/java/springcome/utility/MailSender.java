package springcome.utility;

import java.util.Properties;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;

/*
 * 클래스: MailSender
 * 작성자: 전지은
 * 책임: javax mail을 사용하여 메일 전송
 */

public class MailSender {
	@Autowired
	JavaMailSenderImpl mail;
	public String randnum;
	
	/*
	* 함수: MailSender
	* 작성자: 전지은
	* 기능: 메일 보내기 기본 설정
	*/

	public MailSender() {
		mail = new JavaMailSenderImpl();
		mail.setHost("smtp.gmail.com"); // 구글 SMTP서버 이름
		mail.setPort(587); // 구글 SMTP서버 포트번호
		mail.setUsername("coder7968@gmail.com"); // 보내는 Gmail 아이디
		//mail.setPassword("dbfla2101019"); // 보내는 Gmail 비밀번호
		mail.setPassword("wpjxgaybzyvhkrqo"); // 보내는 Gmail 비밀번호 (2차 인증 사용시)
		mail.setDefaultEncoding("UTF-8"); // 인코딩 정보
		Properties prop = new Properties();
		prop.setProperty("mail.smtp.auth", "true");
		prop.setProperty("mail.smtp.starttls.enable", "true");
		mail.setJavaMailProperties(prop);
		randnum = getRandNum();

	}
	
	/*
	* 함수: getRandNum
	* 작성자: 전지은
	* 기능: 4자리의 랜덤 인증코드 생성
	*/

	public String getRandNum() {
		int rand = (int) (Math.random() * (9999-1000)) + 1000;
		String randNum = rand + "";

		return randNum;
	}
	
	/*
	* 함수: sendVerifiNum
	* 작성자: 전지은
	* 기능: 메일의 본문 설정 / 발송
	*/

	public String sendVerifiNum(String email) throws Exception {

		String html = "<table style='width:700px; margin-left:20px;'>"
				+ "<tr>"
				+ "<tr><img src='https://i.esdrop.com/d/52eukywkmujt/wWhKCdp2zE.png' style='width:700px; height:300px;'</tr>"
				+ "</tr><tr><td><span>안녕하세요. <strong>SpringCome</strong> 입니다.<br>저희 사이트를 방문해 주셔서 감사드립니다.<br><br><strong>"
				+ "</strong> SpringCome에서 보낸 인증번호는 다음과 같습니다.</span></td>" + "</tr>"
				+ "<tr><td><table style='margin-top:20px;'><col width='100px'><col width='200px'><tr style='border:1px solid gray; '>"
				+ "<td style='background-color: #f5f6f5; color:#80878d'>인증번호</td><td>" + randnum + "</td>"
				+ "</tr></table></td></tr><tr><td><span><br>인증번호 칸에 인증번호를 입력해주세요.</td>" + "</tr></table>";

		MimeMessage msg = mail.createMimeMessage();
		MimeMessageHelper helper;
		
		helper = new MimeMessageHelper(msg, true);
		helper.setFrom("SpringCome"); // 보내는 사람
		helper.setTo(email); // 받는 사람
		helper.setSubject("[SpringCome] " + email + "님 인증번호 입니다."); // 메일 제목
		helper.setText(html, true); // 메일 내용

		mail.send(msg); // 메일 전송
		
		return randnum;
	}
	
	/*
	* 함수: sendInvitationMail
	* 작성자: 전지은, 성창현
	* 기능: 프로젝트 초대 메일 발송
	*/

	public void sendInvitationMail(String email, String sender) throws Exception {

		String html = 
			"<table style='width:700px; margin-left:20px;'>"
		   + "<tr><img src='https://i.esdrop.com/d/52eukywkmujt/wWhKCdp2zE.png' style='width:700px; height:300px;'</tr>"
		   + "<tr><td><span>안녕하세요. <strong>SpringCome</strong> 입니다.<br></span></td></tr>"
		   + "<tr><td><br><span><strong>"+ sender +"</strong> 님이 <strong>SpringCome</strong>에서 함께 작업할 수 있도록 고객님을 초대하였습니다.</span></td></tr>"
		   + "<tr><td><span><br><a href='http://34.64.73.89:8080/loginForm/"+ email +"'>지금 바로 클릭하여 참여하세요!!</a></span></td></tr></table>";

		MimeMessage msg = mail.createMimeMessage();
		MimeMessageHelper helper;
		
		helper = new MimeMessageHelper(msg, true);
		helper.setFrom("SpringCome"); // 보내는 사람
		helper.setTo(email); // 받는 사람
		helper.setSubject(sender + " 님이 SpringCome에서 함께 작업할 수 있도록 고객님을 초대합니다."); // 메일 제목
		helper.setText(html, true); // 메일 내용
	
		mail.send(msg); // 메일 전송
		System.out.println("----------------------------------------------------------------------------------------------mail 전송");
	}

}
