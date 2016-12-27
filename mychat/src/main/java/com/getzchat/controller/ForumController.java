package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.getzchat.dao.ForumDao;
import com.getzchat.model.Blogs;
import com.getzchat.model.Forum;

@RestController
public class ForumController {
@Autowired
ForumDao forumDao;
@RequestMapping(value="/createForum",headers="Accept=Application/json",method=RequestMethod.POST)
public void saveForum(@RequestBody Forum forum ){

	forumDao.createForum(forum);
}
@RequestMapping(value="/viewForum/{postedBy}",headers="Accept=Application/json",method=RequestMethod.GET)
public List<Forum> viewForum(@PathVariable("postedBy") String postedBy){
	
	return forumDao.viewForum(postedBy);
	
}
@RequestMapping(value="/updateForum",headers="Accept=Application/json",method=RequestMethod.PUT)
public void updateBlog(@RequestBody Forum forum)
{
	System.out.println("Inside update forum");
	forumDao.updateForum(forum);
}

@RequestMapping(value="/viewForums",headers="accept=Application/json",method=RequestMethod.GET)
public List<Forum> viewForums()
{
	return forumDao.viewForums();
	
}
@RequestMapping(value="/deleteForum/{forum_Id}",headers="Accept=Application/json",method=RequestMethod.DELETE)
public void deleteForum(@PathVariable int forum_Id)
{
	forumDao.deleteForum(forum_Id);
}
}
