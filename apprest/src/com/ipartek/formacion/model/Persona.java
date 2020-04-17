package com.ipartek.formacion.model;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

public class Persona {

	private int id;	
	
	@Size( min=2, max = 50, message = "minimo 2 maximo 50 carcateres" )
	private String nombre;	
	
	@NotEmpty
	private String avatar;
	
	//TODO regexp para "h" o "m"
	// @Pattern(regexp = "" )
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
