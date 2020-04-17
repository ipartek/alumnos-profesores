package com.ipartek.formacion.api.controller;

import java.io.Serializable;

public class Hipermedia implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String info;
	private String method;
	private String url;
	
	public Hipermedia(String info,String method, String url) {
		super();
		this.info = info;
		this.method = method;
		this.url = url;
	}

	public String getInfo() {
		return info;
	}

	public String getMethod() {
		return method;
	}

	public void setMethod(String method) {
		this.method = method;
	}

	public void setInfo(String info) {
		this.info = info;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	@Override
	public String toString() {
		return "Hipermedia [info=" + info + ", method=" + method + ", url=" + url + "]";
	}

	
	
	
}