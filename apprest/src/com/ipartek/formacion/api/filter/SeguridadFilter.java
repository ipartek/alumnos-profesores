package com.ipartek.formacion.api.filter;

import java.io.IOException;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.Provider;



@Provider
public class SeguridadFilter implements ContainerRequestFilter {

	private static final Logger LOGGER = Logger.getLogger(SeguridadFilter.class.getCanonicalName());
	
	@Context
    private HttpServletRequest request;
	
	@Override
	public void filter(ContainerRequestContext requestContext) throws IOException {
		
		final String method = requestContext.getMethod();
		final String path = requestContext.getUriInfo().getAbsolutePath().getPath();
		
		LOGGER.info("entramos method=" + method + " uriPath=" + path);
		
		
		if ( !"/apprest/api/login/".equalsIgnoreCase(path) ) {
				
		
				HttpSession session = request.getSession(false);
			    if (null == session || null == session.getAttribute("usuarioLogeado")) {
			    	LOGGER.info("SIN PERMISOS");
			    	
			    	Response response = Response.status(Status.UNAUTHORIZED).entity(null).build();
					requestContext.abortWith(response );
			    }
		}	    
		
	    LOGGER.info("termina filtro");
	    
	}

}
