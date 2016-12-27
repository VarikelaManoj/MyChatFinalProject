package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Forum;

public interface ForumDao {
void createForum(Forum forum);
List<Forum> viewForums();
List<Forum> viewForum(String postedBy);
/*List<Forum> viewForum(boolean postedBy);*/
void updateForum(Forum forum);
void deleteForum(int forum_Id);
}
