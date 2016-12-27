package com.getzchat.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.getzchat.dao.UsersDao;
import com.getzchat.model.Users;

@RestController
public class UserController {
	@Autowired
	UsersDao usersDao;
	@RequestMapping(value="/fileUpload",method=RequestMethod.POST)
	public void saveUser(@RequestParam("file")MultipartFile file,@RequestParam("username")String username,
			@RequestParam("password")String password,@RequestParam("dob")String dob,
			@RequestParam("mobileno")String mobileno)
	{
		System.out.println("in user");
		System.out.println("file"+file);
		System.out.println("username:"+username+"/t"+password+"/t"+dob+"/t"+mobileno);
		Users users=new Users();
		users.setUsername(username);
		users.setDob(dob);
		users.setPassword(password);
		users.setMobileno(mobileno);
		usersDao.registerUser(users);
		Path path=Paths.get("E://COLLABORATION//mychatfront//WebContent//images//"+username+".jpg");
		if(file!=null)
		{
			try {
				file.transferTo(new File(path.toString()));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
	/*@RequestMapping(value="/getUsers",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Users> listUser()
	{
		List<Users> users=usersDao.listUser();
		return users;
	}*/
	@RequestMapping(value="/authenticateUser",headers="accept=Application/json",method=RequestMethod.POST)
	public int authenticateUser(@RequestBody Users users)
	{
		System.out.println("username:"+users.getUsername());
		System.out.println("password:"+users.getPassword());
		int result=0;
		result=usersDao.validateUsers(users.getUsername(),users.getPassword());
		System.out.println("result "+result);
		return result;
		
	}
	@RequestMapping(value = "/findFriends/{username}",headers = "Accept=application/json", method = RequestMethod.GET)  
	public List<Users> findFriends(@PathVariable String username)
	{
		 List<Users> users=usersDao.findFriends(username);
		return users;
	}
	@RequestMapping(value = "/logout/{username}", method = RequestMethod.POST, headers = "Accept=application/json")  
	public void logout(@PathVariable String username)
	{
		 usersDao.logout(username);
	}
}
