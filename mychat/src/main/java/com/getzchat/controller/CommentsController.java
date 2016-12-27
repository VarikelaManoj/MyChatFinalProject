package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getzchat.dao.CommentsDao;
import com.getzchat.model.Comments;

@RestController
public class CommentsController {
	@Autowired
	CommentsDao commentsDao;
	@RequestMapping(value="/addComments",headers="Accept=Application/json",method=RequestMethod.POST)
	public void addComments(@RequestBody Comments comments)
	{
		commentsDao.addComment(comments);
	}
	@RequestMapping(value="/viewComments/{blog_Id}",headers="Accept=Application/json",method=RequestMethod.GET)
	List<Comments> viewComments(@PathVariable("blog_Id") int blog_Id)
	{
		return commentsDao.viewComments(blog_Id);
	}
	@RequestMapping(value="/viewComment/{question_Id}",headers="Accept=Application/json",method=RequestMethod.GET)
	List<Comments> viewComment(@PathVariable("question_Id") int question_Id)
	{
		return commentsDao.viewComment(question_Id);
	}
	
	
}
