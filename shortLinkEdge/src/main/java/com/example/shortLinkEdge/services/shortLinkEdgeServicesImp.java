package com.example.shortLinkEdge.services;

import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.shortLinkEdge.repository.shortLinkEdgeRepo;

@Service
public class shortLinkEdgeServicesImp implements shortLinkEdgeServices{

	@Autowired
	private shortLinkEdgeRepo projectRepo;
	
	@Override
	public boolean shortlinkPresent(String shortURL) {
		
		return projectRepo.existsById(shortURL);

	}
	
	@Override
	public String generateRandomChars(int length) {
		String candidateChars="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890abcdefghijklmnopqrstuvwxyz";
	    StringBuilder sb = new StringBuilder();
	    Random random = new Random();
	    for (int i = 0; i < length; i++) {
	        sb.append(candidateChars.charAt(random.nextInt(candidateChars.length())));
	    }

	    return sb.toString();
	}

}
