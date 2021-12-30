package springcome.vo;

public class GuestVo {
	private Long no;
	private String email;
	private Long projectNo;
	public Long getNo() {
		return no;
	}
	public void setNo(Long no) {
		this.no = no;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Long getProjectNo() {
		return projectNo;
	}
	public void setProjectNo(Long projectNo) {
		this.projectNo = projectNo;
	}
	@Override
	public String toString() {
		return "GuestVo [no=" + no + ", email=" + email + ", projectNo=" + projectNo + "]";
	}
	
	

}
