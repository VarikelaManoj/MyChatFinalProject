package com.getzchat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Friends {
	@Id@GeneratedValue
private int friend_Id;
private String friend_Name;
private String username;
private String isOnline;

public String getIsOnline() {
	return isOnline;
}
public void setIsOnline(String isOnline) {
	this.isOnline = isOnline;
}
/*private boolean status;

public boolean isStatus() {
	return status;
}
public void setStatus(boolean status) {
	this.status = status;
}*/
public int getFriend_Id() {
	return friend_Id;
}
public void setFriend_Id(int friend_Id) {
	this.friend_Id = friend_Id;
}
public String getFriend_Name() {
	return friend_Name;
}
public void setFriend_Name(String friend_Name) {
	this.friend_Name = friend_Name;
}
public String getUsername() {
	return username;
}
public void setUsername(String username) {
	this.username = username;
}

}
