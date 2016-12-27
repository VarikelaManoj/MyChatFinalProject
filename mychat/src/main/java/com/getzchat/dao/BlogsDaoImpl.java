package com.getzchat.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Blogs;
@Transactional
@Repository
public class BlogsDaoImpl implements BlogsDao {

	@Autowired
	SessionFactory sessionFactory;
	
	public void createBlogs(Blogs blogs) {
		sessionFactory.getCurrentSession().save(blogs);
	}
	public List<Blogs> viewBlogs() {
		Session session=sessionFactory.getCurrentSession();
		List<Blogs> list=session.createCriteria(Blogs.class).list();
		
		return list;
	}
	
	public void updateBlog(Blogs blogs) {
		sessionFactory.getCurrentSession().update(blogs);
		  		
		
	}
	public void deleteBlog(int blog_Id) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.getCurrentSession();
		Blogs blogs=(Blogs)session.get(Blogs.class,new Integer(blog_Id));
		session.delete(blogs);	
		}
	/*public List<Blogs> viewBlog(boolean status) {
		String hql="from Blogs where status="+"'"+true+"'";
		Query query=sessionFactory.getCurrentSession().createQuery(hql);
		List<Blogs> list=  query.list();
		return  list;
	}*/
	public List<Blogs> viewUserBlogs(String postedBy) {
		Session session=sessionFactory.getCurrentSession();
		Criteria ct=session.createCriteria(Blogs.class);
		ct.add(Restrictions.eq("postedBy",postedBy));
		ct.add(Restrictions.eq("status",true));
		List<Blogs> list=ct.list();
		System.out.println(list);
		return list;
		
	}
	
	
}
