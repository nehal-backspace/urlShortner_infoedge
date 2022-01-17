package com.example.shortLinkEdge.controller;


import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import com.example.shortLinkEdge.model.Links;
import com.example.shortLinkEdge.model.stats;
import com.example.shortLinkEdge.repository.shortLinkEdgeRepo;
import com.example.shortLinkEdge.repository.statsRepo;
import com.example.shortLinkEdge.services.shortLinkEdgeServices;

@CrossOrigin(origins = "http://localhost:3000/") //at this location the frontend is hosted..so to avoid error 
@RestController
@RequestMapping("/api/v1/")
public class shortLinkEdgeController {
	
	@Autowired
	private shortLinkEdgeRepo projectRepo;
	@Autowired
	private shortLinkEdgeServices projectServices;
	@Autowired
	private statsRepo statsRepository;
	
	//get all Link API
	@GetMapping("/all-links")
	public List<Links> getAllLinks()
	{
		return projectRepo.findAll();
	}
	
	
	//Save Link API
	@PostMapping("/all-links")
	public Links saveLink(@RequestBody Links linksObj)
	{
		
		String shortURL="";
		
		//Produce shortURL and check in DB , if Present Repeat
		
		do {
			
			shortURL=projectServices.generateRandomChars(7);
			
		} while (projectServices.shortlinkPresent(shortURL) == true);
		
		
		//inserting all values in object
		linksObj.setShortURL(shortURL);
		

		
		return projectRepo.save(linksObj);
	}
	
	
	
	//Save Custom Link API
	@PostMapping("/saveCustomLink")
	public Links saveCustomLink(@RequestBody Links linksObj)
	{
		
		String shortID = linksObj.getShortURL();
		//check in DB , if shortURL Present then Repeat
		if (projectServices.shortlinkPresent(shortID) == true) {
			
			linksObj.setLongURL("error");
			
		} 
		else {
			
			 projectRepo.save(linksObj);
		}
		
		return linksObj;
	}
	
	
	
	//API to fetch long url from short one
	@GetMapping("/{shortURL}")
	public Links getMylink(@PathVariable String shortURL)
	{
		Optional<Links> optional = projectRepo.findById(shortURL);
		Links linkObj = null;
		
		//checking if Link is present in DB
		if(optional.isPresent())
		{
			linkObj=optional.get();
		}
		else {
			Links erroeObj = new Links();
			erroeObj.setLongURL("error");
			return erroeObj;
		}
		
		//Checking if (not null && link is not expired)
		Date exp = linkObj.getExpiryDate();
		if(exp != null && exp.before(new Date()))
		{
			Links erroeObj = new Links();
			erroeObj.setLongURL("error");
			return erroeObj;
		}
		
		
		//Saving in link_stats table for URL Stats
		stats stObj = new stats();
		
		stObj.setShortURL(shortURL);
		stObj.setToday(new Date());
		statsRepository.save(stObj);
		
		//incrementing Counts Clicked 
		long count = linkObj.getCountsClicked();
		count+=1;
		linkObj.setCountsClicked(count);
		linkObj.setLastClickedDate(new Date());//today
		
		
		return projectRepo.save(linkObj);	
	}
	
	
	//API to return Date stats of Clicked links
	@GetMapping("/getStats")
	public List<Date> getURLStats(@RequestBody Links linksObj)
	{
		return statsRepository.findAllByShortURL(linksObj.getShortURL());
	}
}
