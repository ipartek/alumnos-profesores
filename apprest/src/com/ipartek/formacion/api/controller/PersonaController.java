package com.ipartek.formacion.api.controller;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Set;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
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
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.ResponseBuilder;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Persona;
import com.ipartek.formacion.model.dao.PersonaDAO;

@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());
	private static PersonaDAO personaDAO = PersonaDAO.getInstance();

	private ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
	private Validator validator = factory.getValidator();

	@Context
	private ServletContext context;

	
	public PersonaController() {
		super();
	}

	@GET
	public ArrayList<Persona> getAll() {
		LOGGER.info("getAll");		
		// return personas;
		ArrayList<Persona> registros = (ArrayList<Persona>) personaDAO.getAll(); 
		return registros;
	}

	@POST
	public Response insert(Persona persona) {
		LOGGER.info("insert(" + persona + ")");
		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();

		// validar pojo
		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);

		if (violations.isEmpty()) {

			try {
				personaDAO.insert(persona);
				response = Response.status(Status.CREATED).entity(persona).build();
				
			}catch (Exception e) {
				response = Response.status(Status.CONFLICT).entity(persona).build();
			}	

		} else {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}

			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
		}

		return response;

	}

	@PUT
	@Path("/{id: \\d+}")
	public Response update(@PathParam("id") int id, Persona persona) {
		LOGGER.info("update(" + id + ", " + persona + ")");		
		Response response = Response.status(Status.NOT_FOUND).entity(persona).build();

		Set<ConstraintViolation<Persona>> violations = validator.validate(persona);
		if (!violations.isEmpty()) {
			ArrayList<String> errores = new ArrayList<String>();
			for (ConstraintViolation<Persona> violation : violations) {
				errores.add(violation.getPropertyPath() + ": " + violation.getMessage());
			}
			response = Response.status(Status.BAD_REQUEST).entity(errores).build();
			
		}else {
			
			try {
				personaDAO.update(persona);
				response = Response.status(Status.OK).entity(persona).build();
			}catch (Exception e) {
				response = Response.status(Status.CONFLICT).entity(persona).build();
			}	
			
		}	

		return response;
	}

	@DELETE
	@Path("/{id: \\d+}")
	public Response eliminar(@PathParam("id") int id) {
		LOGGER.info("eliminar(" + id + ")");

		Response response = Response.status(Status.INTERNAL_SERVER_ERROR).entity(null).build();
		Persona persona = null;
		
		try {
			personaDAO.delete(id);
			response = Response.status(Status.OK).entity(persona).build();
			
		}catch (SQLException e) {
			response = Response.status(Status.CONFLICT).entity(persona).build();
			
		}catch (Exception e) {
			response = Response.status(Status.NOT_FOUND).entity(persona).build();
		}
		return response;
	}

}
