package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Users;

public interface UsersDao {
   void registerUser(Users users);
   /*List<Users> listUser();*/
   void updateUser(Users users);
   Users viewUserById(int id);
   public List<Users> findFriends(String username);
   int validateUsers(String username,String password);
   void logout(String username);
}
