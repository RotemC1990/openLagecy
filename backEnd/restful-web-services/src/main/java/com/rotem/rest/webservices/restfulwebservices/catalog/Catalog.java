package com.rotem.rest.webservices.restfulwebservices.catalog;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Catalog {
	@Id
	@GeneratedValue
	private Long itemNumber;
	
	private String itemName;
	private long amount;
	private long inventoryCode;
	
	protected Catalog() {}
	
	public Catalog(long itemNumber, String itemName, long amount, long inventoryCode) {
		super();
		this.itemNumber = itemNumber;
		this.itemName = itemName;
		this.amount = amount;
		this.inventoryCode = inventoryCode;
	}
	
	
	public Long getItemNumber() {
		return itemNumber;
	}
	public void setItemNumber(Long itemNumber) {
		this.itemNumber = itemNumber;
	}
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public long getAmount() {
		return amount;
	}
	public void setAmount(long amount) {
		this.amount = amount;
	}
	public long getInventoryCode() {
		return inventoryCode;
	}
	public void setInventoryCode(long inventoryCode) {
		this.inventoryCode = inventoryCode;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (itemNumber ^ (itemNumber >>> 32));
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Catalog other = (Catalog) obj;
		if (itemNumber != other.itemNumber)
			return false;
		return true;
	}
	
}
