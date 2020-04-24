package com.ipartek.formacion.model;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class Curso {
	
	private int id;
	private String nombre;
	private String imagen;
	private float precio;
	
	//TODO constructor gettes y setters y toString
	@NotNull
	@Valid // fuerza la validacion de Persona
	private Persona profesor;
	
	public Curso() {
		super();
		this.id = 0;
		this.nombre = "";
		this.imagen = "";
		this.precio = 0;
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

	public String getImagen() {
		return imagen;
	}

	public void setImagen(String imagen) {
		this.imagen = imagen;
	}

	public float getPrecio() {
		return precio;
	}

	public void setPrecio(float precio) {
		this.precio = precio;
	}

	@Override
	public String toString() {
		return "Curso [id=" + id + ", nombre=" + nombre + ", imagen=" + imagen + ", precio=" + precio + "]";
	}
	

}
