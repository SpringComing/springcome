package springcome.vo;

public class ProjectVo{
	private Long no;
	private String name;
	private String description;
	private String startDate;
	private String endDate;
	private String regDate;
	private String status;
	private Long sequence;
	private String color;
	private String role;
	private int attendStatus;
	
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public int getAttendStatus() {
		return attendStatus;
	}
	public void setAttendStatus(int attendStatus) {
		this.attendStatus = attendStatus;
	}
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}

	public Long getSequence() {
		return sequence;
	}
	public void setSequence(Long sequence) {
		this.sequence = sequence;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "ProjectVo [no=" + no + ", name=" + name + ", description=" + description + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", regDate=" + regDate + ", status=" + status + ", sequence=" + sequence
				+ ", color=" + color + ", role=" + role + ", attendStatus=" + attendStatus + "]";
	}
}
