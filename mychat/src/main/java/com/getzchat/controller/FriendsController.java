package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getzchat.dao.FriendsDao;
import com.getzchat.model.Friends;

@RestController
public class FriendsController {
	@Autowired
	FriendsDao friendsDao;
	@RequestMapping(value="/makeFriend",headers="Accept=Application/json",method=RequestMethod.POST)
	public void makeFriend(@RequestBody Friends friends)
	{
		friendsDao.makeFriend(friends);
	}
	@RequestMapping(value="/updateFriend",headers="Accept=Application/json",method=RequestMethod.PUT)
		public void updateFriend(@RequestBody Friends friends)
		{
		friendsDao.updateFriend(friends);
		}
	@RequestMapping(value="/rejectFriend",headers="Accept=Application/json",method=RequestMethod.DELETE)
	public void rejectFriend(@RequestBody Friends friends)
	{
		friendsDao.rejectFriend(friends);
	}
	@RequestMapping(value="/seeFriends/{username}",headers="Accept=Application/json",method=RequestMethod.GET)
	List<Friends> seeFriends(@PathVariable("username") String username){
		return friendsDao.seeFriends(username);
		
	}
}
