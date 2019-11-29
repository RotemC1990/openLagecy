package com.rotem.rest.webservices.restfulwebservices.catalog;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatalogJpaRepository extends JpaRepository<Catalog, Long>{
	

}
