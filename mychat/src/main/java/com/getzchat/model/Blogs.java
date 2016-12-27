package com.getzchat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Blogs {
	@Id@GeneratedValue
private int blog_Id;
private  String blog_Name;
private String blog_Category;
private String blog_Description;
private int likes;
private boolean status;
private String postedBy;

public int getLikes() {
	return likes;
}
public void setLikes(int likes) {
	this.likes = likes;
}
public String getPostedBy() {
	return postedBy;
}
public void setPostedBy(String postedBy) {
	this.postedBy = postedBy;
}
public boolean isStatus() {
	return status;
}
public void setStatus(boolean status) {
	this.status = status;
}
public int getBlog_Id() {
	return blog_Id;
}
public void setBlog_Id(int blog_Id) {
	this.blog_Id = blog_Id;
}
public String getBlog_Name() {
	return blog_Name;
}
public void setBlog_Name(String blog_Name) {
	this.blog_Name = blog_Name;
}
public String getBlog_Category() {
	return blog_Category;
}
public void setBlog_Category(String blog_Category) {
	this.blog_Category = blog_Category;
}
public String getBlog_Description() {
	return blog_Description;
}
public void setBlog_Description(String blog_Description) {
	this.blog_Description = blog_Description;
}
 

}
