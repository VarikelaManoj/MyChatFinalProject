package com.getzchat.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Users;
@Transactional
@Repository
public class UsersDaoImpl implements UsersDao {
	@Autowired
	SessionFactory sessionFactory;
	public void registerUser(Users users) {
		// TODO Auto-generated method stub
		  users.setRole("ROLE_USER");
	sessionFactory.getCurrentSession().save(users);
		
	}
	public List<Users> listUser() {
		Session session=sessionFactory.getCurrentSession();
		List<Users> list=session.createCriteria(Users.class).list();
 		return list;
	}
	public int validateUsers(String username, String password) {
		int res=0;
		Session session=sessionFactory.getCurrentSession();
		Query result = session.createQuery("from Users  u where u.username='"+username+"'");
		List<Users> users=result.list();
		System.out.println("users:"+users);
		if(users.size()==0)
		{
			res=0;
		}
		else
		{
			for(int i=0;i<users.size();i++)
			{
				System.out.println("inside for loop");
				String dbuserName=users.get(i).getUsername();
				String dbpassword=users.get(i).getPassword();
				String dbrole=users.get(i).getRole();
				if(dbuserName.equals(username)&&dbpassword.equals(password)&&dbrole.equals("ROLE_USER"))
				{
					String query = "UPDATE users SET IsOnline = '"+ "online" +"' WHERE username = '"+ username + "'";

					SQLQuery sqlQuery= 	 session.createSQLQuery(query);
					sqlQuery.executeUpdate();
					String query1 = "UPDATE friends SET IsOnline = '"+ "online" +"' WHERE friend_name = '"+ username + "'";

					SQLQuery sqlquery= 	 session.createSQLQuery(query1);
					sqlquery.executeUpdate();
					res=1;
					System.out.println("the result is:"+res);
				}
				else
					if(dbuserName.equals(username)&&dbpassword.equals(password)&&dbrole.equals("ROLE_ADMIN"))
				{
					res=2;
					System.out.println("the result  is:"+res);
				}
				}
		}	
		return res;
		}
	public void updateUser(Users users) {
			sessionFactory.getCurrentSession().update(users);
	}
	public Users viewUserById(int id) {
		Session session=sessionFactory.getCurrentSession();
		Users users=(Users)session.get(Users.class, id);
		return users;
	}
	public List<Users> findFriends(String username) {
		Session session=sessionFactory.getCurrentSession();
		
		  Criteria ct=session.createCriteria(Users.class);
	ct.add(Restrictions.ne("username",username));
	ct.add(Restrictions.eq("role","ROLE_USER"));
	List list=ct.list();
		return list;
	}
	public void logout(String username) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.getCurrentSession();
		String query = "UPDATE users SET IsOnline = '"+ "offline" +"' WHERE username = '"+ username + "'";

		SQLQuery sqlQuery= 	 session.createSQLQuery(query);
		sqlQuery.executeUpdate();
		String query1 = "UPDATE friends SET IsOnline = '"+ "offline" +"' WHERE friend_name = '"+ username + "'";

		SQLQuery sqlquery= 	 session.createSQLQuery(query1);
		sqlquery.executeUpdate();

	}
	
	

	
}
