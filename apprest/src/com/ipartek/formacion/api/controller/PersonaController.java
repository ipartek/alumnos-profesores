package com.ipartek.formacion.api.controller;

import java.util.ArrayList;
import java.util.logging.Logger;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import com.ipartek.formacion.model.Persona;

@Path("/personas")
@Produces("application/json")
@Consumes("application/json")
public class PersonaController {

	private static final Logger LOGGER = Logger.getLogger(PersonaController.class.getCanonicalName());
	
	private static int id = 1;
	
	@Context
	private ServletContext context;
	
	private static ArrayList<Persona> personas = new ArrayList<Persona>();
	
	
	static {
		personas.add( new Persona(1,"Arantxa","avatar1.png", "m") );
		personas.add( new Persona(2,"Idoia","avatar2.png", "m") );
		personas.add( new Persona(3,"Iker","avatar3.png", "h") );
		personas.add( new Persona(4,"Hodei","avatar4.png", "h") );
		id = 5;
	}
	
	public PersonaController() {
		super();		
	}




	@GET
	public ArrayList<Persona> getAll() {	
		LOGGER.info("getAll");
		return personas;
	}
	
	
	@POST
	public Response insert(Persona persona) {
		LOGGER.info("insert(" + persona + ")");

		//TODO validar datos de la Persona javax.validation
		persona.setId(id);
		id++;
		personas.add(persona);

		return Response.status(Status.CREATED).entity(persona).build();
	}
	
	
	
}
