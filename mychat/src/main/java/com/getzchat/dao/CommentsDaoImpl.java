package com.getzchat.dao;

import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import com.getzchat.model.Comments;

@Repository
@Transactional
public class CommentsDaoImpl implements CommentsDao{
	@Autowired
	SessionFactory sessionFactory;
	public void addComment(Comments comments) {
		sessionFactory.getCurrentSession().save(comments);		
	}
	public List<Comments> viewComments(int blog_Id) {
		Session session=sessionFactory.getCurrentSession();
		Criteria ct=session.createCriteria(Comments.class);
		ct.add(Restrictions.eq("blog_Id",blog_Id));
		List list=ct.list();
		System.out.println(list);
		return list;
	}
	public List<Comments> viewComment(int question_Id) {
		Session session=sessionFactory.getCurrentSession();
		Criteria ct=session.createCriteria(Comments.class);
		ct.add(Restrictions.eq("question_Id",question_Id));
		List list=ct.list();
		System.out.println(list);
		return list;
	}

	

}
