package com.rotem.rest.webservices.restfulwebservices.catalog;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class catalogHardCodedService {
	
	private static List<Catalog> catalog = new ArrayList();
	private static long idCounter=0;
	
	/*static {
		catalog.add(new Catalog(++idCounter, "ball", 1, 123));
		catalog.add(new Catalog(++idCounter, "cup", 4, 122));
		catalog.add(new Catalog(++idCounter, "table", 5, 124));
		catalog.add(new Catalog(++idCounter, "tv", 2, 125));
	}*/
	
	public List<Catalog> findAll() {
		return catalog;
	}
	
	public Catalog save(Catalog catalogItem) {
		if(catalogItem.getItemNumber()==-1 || catalogItem.getItemNumber()==0) {
			catalogItem.setItemNumber(++idCounter);
			catalog.add(catalogItem);
		}
		else {
			deleteById(catalogItem.getItemNumber());
			catalog.add(catalogItem);
		}
		return catalogItem;
	}
	
	public Catalog deleteById(long id) {
		Catalog catalogToDelete = findByItemNumber(id);
		if(catalogToDelete == null)
			return null;
		if(catalog.remove(catalogToDelete))
			return catalogToDelete;
		return null;
		
	}

	public Catalog findByItemNumber(long itemNum) {
		for(Catalog catalogInLoop:catalog) {
			if(catalogInLoop.getItemNumber() == itemNum)
				return catalogInLoop;
		}
		return null;
	}
}
