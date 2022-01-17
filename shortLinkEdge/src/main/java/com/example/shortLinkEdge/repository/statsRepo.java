package com.example.shortLinkEdge.repository;


import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.shortLinkEdge.model.stats;

@Repository
public interface statsRepo extends JpaRepository<stats, Long>{
	
	@Query(value="select today from stats where shortURL=:shortID")
	List<Date> findAllByShortURL(@Param("shortID") String shortID);

}
