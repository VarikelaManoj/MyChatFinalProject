package com.getzchat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

import org.springframework.web.multipart.MultipartFile;

@Entity
public class Users {
    @Id@GeneratedValue
	private int id;
    private String username;
    private String password;
    private String dob;
    private String mobileno;
    private String role;
    private String isOnline;
    @Transient
    private MultipartFile file;
    /*@Transient
	private String imageData;
    public String getImageData() {
		return imageData;
	}
	public void setImageData(String imageData) {
		this.imageData = imageData;
	}*/
	public String getMobileno() {
		return mobileno;
	}
	public void setMobileno(String mobileno) {
		this.mobileno = mobileno;
	}
	
    public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
    public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getDob() {
		return dob;
	}
	public void setDob(String dob) {
		this.dob = dob;
	}
	public MultipartFile getFile() {
		return file;
	}
	public void setFile(MultipartFile file) {
		this.file = file;
	}
	public String getIsOnline() {
		return isOnline;
	}
	public void setIsOnline(String isOnline) {
		this.isOnline = isOnline;
	}
	
}
