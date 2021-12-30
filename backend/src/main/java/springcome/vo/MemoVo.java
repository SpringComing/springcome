package springcome.vo;

public class MemoVo{
	

	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDate() {
		return date;
	}
	@Override
	public String toString() {
		return "MemoVo [title=" + title + ", date=" + date + ", writer=" + writer + ", no=" + no + "]";
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getWriter() {
		return writer;
	}
	public void setWriter(String writer) {
		this.writer = writer;
	}
	private String title;
	private String date;
	private String writer;
	private int no;
	public int getNo() {
		return no;
	}
	public void setNo(int no) {
		this.no = no;
	}

}
