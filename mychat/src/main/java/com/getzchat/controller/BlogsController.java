package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.getzchat.dao.BlogsDao;
import com.getzchat.model.Blogs;

@RestController
public class BlogsController {
@Autowired
BlogsDao blogsDao;
@RequestMapping(value="/createBlogs",headers="Accept=Application/json",method=RequestMethod.POST)
public void createBlogs(@RequestBody Blogs blogs)
{
	System.out.println("Inside create blog");
	blogsDao.createBlogs(blogs);
}
@RequestMapping(value="/viewBlogs",headers="Accept=Application/json",method=RequestMethod.GET)
public List<Blogs>  viewBlogs(){
	
	return blogsDao.viewBlogs();
}
/*@RequestMapping(value="/viewBlog",headers="Accept=Application/json",method=RequestMethod.GET)
public List<Blogs> viewBlog()
{
	return blogsDao.viewBlog(true);
	
}*/
@RequestMapping(value="/updateBlog",headers="Accept=Application/json",method=RequestMethod.PUT)
public void updateBlog(@RequestBody Blogs blogs)
{
	System.out.println("Inside update blog");
	blogsDao.updateBlog(blogs);
}
@RequestMapping(value="/deleteBlog/{blog_Id}",headers="Accept=Application/json",method=RequestMethod.DELETE)
public void deleteJob(@PathVariable int blog_Id)
{
	blogsDao.deleteBlog(blog_Id);
}
@RequestMapping(value="/viewUserBlogs/{postedBy}",headers="Accept=Application/json",method=RequestMethod.GET)
public List<Blogs> viewUserBlogs(@PathVariable("postedBy") String postedBy)
{
	System.out.println("inside the viewblogs :"+postedBy);
	return blogsDao.viewUserBlogs(postedBy);
}
}
