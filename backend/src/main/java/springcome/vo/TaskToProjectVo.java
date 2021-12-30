package springcome.vo;

public class TaskToProjectVo {
	
	private String name;
	private String startDate;
	private String endDate;
	private String color;
	private int importance;
	private int status;
	private String project;
	public String getName() {
		return name;
	}
	@Override
	public String toString() {
		return "TaskToProjectVo [name=" + name + ", startDate=" + startDate + ", endDate=" + endDate + ", color="
				+ color + ", importance=" + importance + ", status=" + status + ", project=" + project + "]";
	}
	public void setName(String name) {
		this.name = name;
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
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public int getImportance() {
		return importance;
	}
	public void setImportance(int importance) {
		this.importance = importance;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getProject() {
		return project;
	}
	public void setProject(String project) {
		this.project = project;
	}

}
