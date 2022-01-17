package com.example.shortLinkEdge.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "links")
public class Links {
	
	@Id
	@Column(name = "short_URL")
	private String shortURL;
	
	@Column(name = "long_URL")
	private String longURL;
	
	@Column(name = "expiryDate")
	private Date expiryDate;
	
	@Column(name = "countsClicked")
	private long countsClicked;
	
	@Column(name = "lastClickedDate")
	private Date lastClickedDate;

	public Links()
	{
		
	}

	public Links(String longURL, Date expiryDate, long countsClicked, Date lastClickedDate) {
		super();
		this.longURL = longURL;
		this.expiryDate = expiryDate;
		this.countsClicked = countsClicked;
		this.lastClickedDate = lastClickedDate;
	}

	public String getLongURL() {
		return longURL;
	}

	public void setLongURL(String longURL) {
		this.longURL = longURL;
	}

	public String getShortURL() {
		return shortURL;
	}

	public void setShortURL(String shortURL) {
		this.shortURL = shortURL;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate = expiryDate;
	}

	public long getCountsClicked() {
		return countsClicked;
	}

	public void setCountsClicked(long countsClicked) {
		this.countsClicked = countsClicked;
	}

	public Date getLastClickedDate() {
		return lastClickedDate;
	}

	public void setLastClickedDate(Date lastClickedDate) {
		this.lastClickedDate = lastClickedDate;
	}
	

}
