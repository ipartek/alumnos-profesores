package com.ipartek.formacion.model;

public class Persona {

	private int id;
	private String nombre;
	private String avatar;
	private String sexo;
	
	public Persona() {
		super();
		this.id = 0;
		this.nombre = "";		
		this.avatar = "avatar1.png";
		this.sexo = "";
	}

	public Persona(int id, String nombre, String avatar, String sexo) {		
		this();
		this.id = id;
		this.nombre = nombre;
		this.avatar = avatar;
		this.sexo = sexo;
		
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getSexo() {
		return sexo;
	}

	public void setSexo(String sexo) {
		this.sexo = sexo;
	}

	@Override
	public String toString() {
		return "Persona [id=" + id + ", nombre=" + nombre + ", avatar=" + avatar + ", sexo=" + sexo + "]";
	}

	
	
}
