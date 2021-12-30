package springcome.vo;

public class FileVo {
	Long no;
	String name;
	String url;
	String regDate;
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	Long taskNo;
	Long userNo;
	String userName;
	
	public Long getNo() {
		return no;
	}
	public void setNo(Long no) {
		this.no = no;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getUrl() {
		return url;
	}
	public void setUrl(String url) {
		this.url = url;
	}
	public Long getTaskNo() {
		return taskNo;
	}
	public void setTaskNo(Long taskNo) {
		this.taskNo = taskNo;
	}
	public Long getUserNo() {
		return userNo;
	}
	public void setUserNo(Long userNo) {
		this.userNo = userNo;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	@Override
	public String toString() {
		return "FileVo [no=" + no + ", name=" + name + ", url=" + url + ", regDate=" + regDate + ", taskNo=" + taskNo
				+ ", userNo=" + userNo + ", userName=" + userName + "]";
	} 

}
