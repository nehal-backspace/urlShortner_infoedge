package com.example.shortLinkEdge.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class shortLinkEdgeExceptions extends RuntimeException{

//	Whenever we are not able to find the data from database... we will call this {functionality 4 of project}
	
	private static final long serialVersionUID=1L;
	
	
	public  shortLinkEdgeExceptions(String message) {
		
		super(message);
	}
}
