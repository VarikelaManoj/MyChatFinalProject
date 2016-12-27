package com.getzchat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Comments {
	@Id@GeneratedValue
	private int comment_Id;
	private int blog_Id;
	private int question_Id;
	private String comment;
	private String username;
	public int getComment_Id() {
		return comment_Id;
	}
	public void setComment_Id(int comment_Id) {
		this.comment_Id = comment_Id;
	}
	public int getBlog_Id() {
		return blog_Id;
	}
	public void setBlog_Id(int blog_Id) {
		this.blog_Id = blog_Id;
	}
	
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public int getQuestion_Id() {
		return question_Id;
	}
	public void setQuestion_Id(int question_Id) {
		this.question_Id = question_Id;
	}
	
	
	
}
