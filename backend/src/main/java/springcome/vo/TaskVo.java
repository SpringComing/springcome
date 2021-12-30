package springcome.vo;

import java.util.List;

public class TaskVo {

	private Long no;
	private String name;
	private Long importance;
	private String startDate;
	private String endDate;
	private int status;
	private Long sequence;
	private String color;
	private Long processNo;
	
	private List<ChecklistVo> checklists;

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

	public Long getImportance() {
		return importance;
	}

	public void setImportance(Long importance) {
		this.importance = importance;
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

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
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

	public Long getProcessNo() {
		return processNo;
	}

	public void setProcessNo(Long processNo) {
		this.processNo = processNo;
	}

	public List<ChecklistVo> getChecklists() {
		return checklists;
	}

	public void setChecklists(List<ChecklistVo> checklists) {
		this.checklists = checklists;
	}

	@Override
	public String toString() {
		return "TaskVo [no=" + no + ", name=" + name + ", importance=" + importance + ", startDate=" + startDate
				+ ", endDate=" + endDate + ", status=" + status + ", sequence=" + sequence + ", color=" + color
				+ ", processNo=" + processNo + ", checklists=" + checklists + "]";
	}
	

}
