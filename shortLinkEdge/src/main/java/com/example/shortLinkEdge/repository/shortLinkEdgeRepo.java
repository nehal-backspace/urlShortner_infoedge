package com.example.shortLinkEdge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.shortLinkEdge.model.Links;

@Repository
public interface shortLinkEdgeRepo extends JpaRepository<Links, String>{

}
