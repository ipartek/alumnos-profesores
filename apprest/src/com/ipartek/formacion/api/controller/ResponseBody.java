package com.ipartek.formacion.api.controller;

import java.io.Serializable;
import java.util.ArrayList;

public class ResponseBody implements Serializable {
	

	private static final long serialVersionUID = 1L;
	
	private String informacion;
	private Object data;
	private ArrayList<String> errores;	
	private ArrayList<Hipermedia> hypermedias;
	
	public ResponseBody() {
		super();
		this.data = null;
		this.errores = new ArrayList<String>();
		this.informacion = "";
		this.hypermedias = new ArrayList<Hipermedia>();
	}

	public ArrayList<String> getErrores() {
		return errores;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public void setErrores(ArrayList<String> errores) {
		this.errores = errores;
	}

	
	public String getInformacion() {
		return informacion;
	}

	public void setInformacion(String informacion) {
		this.informacion = informacion;
	}

	public ArrayList<Hipermedia> getHypermedias() {
		return hypermedias;
	}

	public void setHypermedias(ArrayList<Hipermedia> hypermedias) {
		this.hypermedias = hypermedias;
	}

	public void addError(String error) {
		this.errores.add(error);
	}

	@Override
	public String toString() {
		return "ResponseBody [informacion=" + informacion + ", data=" + data + ", errores=" + errores + ", hypermedias="
				+ hypermedias + "]";
	}
	
	
	

}
