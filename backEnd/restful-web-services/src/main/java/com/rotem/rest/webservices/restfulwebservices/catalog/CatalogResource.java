package com.rotem.rest.webservices.restfulwebservices.catalog;

import java.net.URI;
import java.util.List;

import javax.servlet.Servlet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.rotem.rest.webservices.restfulwebservices.catalog.Catalog;

@CrossOrigin(origins = "http://localhost")
@RestController
public class CatalogResource {
	
	@Autowired
	private catalogHardCodedService catalogService;
	
	@GetMapping("/catalog/{id}")
	public Catalog getCatalogItem(@PathVariable long id){
		return catalogService.findByItemNumber(id);
		
	}
	
	@GetMapping("/catalog")
	public List<Catalog> getCatalog(){
		return catalogService.findAll();
		
	}
	
	@DeleteMapping("/catalog/{id}")
	public ResponseEntity<Void> deleteCatalogItem(@PathVariable long id) {
		Catalog DeletedCatalog = catalogService.deleteById(id);
		if(DeletedCatalog!=null) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.notFound().build();
	}
	
	@PutMapping("/catalog/{id}")
	public ResponseEntity<Catalog> UpdateCatalogItem(@PathVariable long id , @RequestBody Catalog catalogItem) {
		
		catalogService.save(catalogItem);
		
		return new ResponseEntity<Catalog>(catalogItem,HttpStatus.OK);
		
	}
	
	@PostMapping("/catalog")
	public ResponseEntity<Void> SaveNewCatalogItem( @RequestBody Catalog catalogItem) {
		
		Catalog createdItem = catalogService.save(catalogItem);
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdItem.getItemNumber()).toUri();
		
		return ResponseEntity.created(uri).build();
		
	}
	
	

}
