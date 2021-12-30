package springcome.vo;

public class TaskSameVo {
	Long processNo;
    Long taskNo;
    Long oriTaskSeq;
    Long newTaskSeq;
	public Long getProcessNo() {
		return processNo;
	}
	public void setProcessNo(Long processNo) {
		this.processNo = processNo;
	}
	public Long getTaskNo() {
		return taskNo;
	}
	public void setTaskNo(Long taskNo) {
		this.taskNo = taskNo;
	}
	public Long getOriTaskSeq() {
		return oriTaskSeq;
	}
	public void setOriTaskSeq(Long oriTaskSeq) {
		this.oriTaskSeq = oriTaskSeq;
	}
	public Long getNewTaskSeq() {
		return newTaskSeq;
	}
	public void setNewTaskSeq(Long newTaskSeq) {
		this.newTaskSeq = newTaskSeq;
	}
	@Override
	public String toString() {
		return "TaskSameVo [processNo=" + processNo + ", taskNo=" + taskNo + ", oriTaskSeq=" + oriTaskSeq
				+ ", newTaskSeq=" + newTaskSeq + "]";
	}
    
    
}
