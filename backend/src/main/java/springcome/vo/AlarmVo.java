package springcome.vo;

public class AlarmVo {
	private Long userNo;
	private Long alarmNo;
	private String message;
	private String regDate;
	private String type;
	private int status;
	public Long getUserNo() {
		return userNo;
	}
	public void setUserNo(Long userNo) {
		this.userNo = userNo;
	}
	public Long getAlarmNo() {
		return alarmNo;
	}
	public void setAlarmNo(Long alarmNo) {
		this.alarmNo = alarmNo;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "AlarmVo [userNo=" + userNo + ", alarmNo=" + alarmNo + ", message=" + message + ", regDate=" + regDate
				+ ", type=" + type + ", status=" + status + "]";
	}
}
