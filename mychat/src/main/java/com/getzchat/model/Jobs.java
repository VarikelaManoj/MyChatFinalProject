package com.getzchat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Jobs {
	@Id@GeneratedValue(strategy=GenerationType.AUTO)
	private int jobId;
	private String jobsName;
	private String jobsDescription;
	private String jobsLocation;
	
	public int getJobId() {
		return jobId;
	}
	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	public String getJobsName() {
		return jobsName;
	}
	public void setJobsName(String jobsName) {
		this.jobsName = jobsName;
	}
	public String getJobsDescription() {
		return jobsDescription;
	}
	public void setJobsDescription(String jobsDescription) {
		this.jobsDescription = jobsDescription;
	}
	public String getJobsLocation() {
		return jobsLocation;
	}
	public void setJobsLocation(String jobsLocation) {
		this.jobsLocation = jobsLocation;
	}
	
	

}
