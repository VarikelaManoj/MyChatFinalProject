package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Comments;

public interface CommentsDao {
	void addComment(Comments comments);
	List<Comments> viewComments(int blog_Id);
	List<Comments> viewComment(int question_Id);
}
