package springcome.vo;

public class AttendVo {
	private Long user_no;
	private Long project_no;
	private String role;
	private String status;
	private String color;
	private String sequenc;
	public Long getUser_no() {
		return user_no;
	}
	public void setUser_no(Long user_no) {
		this.user_no = user_no;
	}
	public Long getProject_no() {
		return project_no;
	}
	public void setProject_no(Long project_no) {
		this.project_no = project_no;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getSequenc() {
		return sequenc;
	}
	public void setSequenc(String sequenc) {
		this.sequenc = sequenc;
	}
	@Override
	public String toString() {
		return "AttendVo [user_no=" + user_no + ", project_no=" + project_no + ", role=" + role + ", status=" + status
				+ ", color=" + color + ", sequenc=" + sequenc + "]";
	}
	
	
}
