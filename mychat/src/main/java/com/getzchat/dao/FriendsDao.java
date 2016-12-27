package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Friends;

public interface FriendsDao {
 void makeFriend(Friends friends);
 void updateFriend(Friends friends);
 void rejectFriend(Friends friends);
 List<Friends> seeFriends(String username);
}
