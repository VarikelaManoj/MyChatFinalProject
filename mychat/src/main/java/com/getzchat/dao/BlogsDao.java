package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Blogs;

public interface BlogsDao {
void createBlogs(Blogs blogs);
List<Blogs> viewBlogs();
void updateBlog(Blogs blogs);
void deleteBlog(int blog_Id);
List<Blogs> viewUserBlogs(String postedBy);
//List<Blogs> viewUserBlogs(int likes);

}
