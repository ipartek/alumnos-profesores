package com.ipartek.formacion.api.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;
import com.ipartek.formacion.model.dao.CursoDAO;
import com.ipartek.formacion.model.dao.PersonaDAO;

@Path("/login")
@Produces("application/json")
@Consumes("application/json")
public class LoginController {
	
	@Context
	private ServletContext context;
	
	@Context
    private HttpServletRequest request;

	private static final Logger LOGGER = Logger.getLogger(LoginController.class.getCanonicalName());
	
	

	@GET
	public Response login() {
		
		LOGGER.info("login correcto");
		
		HttpSession session = request.getSession(true);
		session.setAttribute("usuarioLogeado", true);
		
		Response response = Response.status(Status.OK).entity(null).build();
		
		return response;
	}

	

}
