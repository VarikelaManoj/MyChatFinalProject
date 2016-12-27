package com.getzchat.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Blogs;
import com.getzchat.model.Forum;

@Repository
@Transactional
public class ForumDaoImpl implements ForumDao {

	@Autowired
	SessionFactory sessionFactory;
	
	public void createForum(Forum forum) {
		sessionFactory.getCurrentSession().save(forum);
		
	}

	public List<Forum> viewForums() {
		Session session=sessionFactory.getCurrentSession();
		List<Forum> list=session.createCriteria(Forum.class).list();
return list;
	}

	public void updateForum(Forum forum) {
		sessionFactory.getCurrentSession().update(forum);
		
	}

	public void deleteForum(int forum_Id) {
		Session session=sessionFactory.getCurrentSession();
		Forum forum=(Forum)session.get(Forum.class,new Integer(forum_Id));
		session.delete(forum);	
	}

	/*public List<Forum> viewForum(boolean status) {
		String hql="from Forum where status="+"'"+true+"'";
		Query query=sessionFactory.getCurrentSession().createQuery(hql);
		List<Forum> list=  query.list();
		return  list;
	}*/

	public List<Forum> viewForum(String postedBy) {
		System.out.println("in view my forums");
		Session session=sessionFactory.getCurrentSession();
		Criteria ct=session.createCriteria(Forum.class);
		ct.add(Restrictions.eq("postedBy",postedBy));
		ct.add(Restrictions.eq("status",true));
		List list=ct.list();	
		return list;
		}	

}
