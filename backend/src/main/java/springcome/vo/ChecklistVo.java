package springcome.vo;

public class ChecklistVo {

	private Long no;
	private int status;
	private String name;
	private Long taskNo;
	
	public Long getNo() {
		return no;
	}
	public void setNo(Long no) {
		this.no = no;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getTaskNo() {
		return taskNo;
	}
	public void setTaskNo(Long taskNo) {
		this.taskNo = taskNo;
	}
	
	@Override
	public String toString() {
		return "ChecklistVo [no=" + no + ", status=" + status + ", name=" + name + ", taskNo=" + taskNo + "]";
	}
	
}
