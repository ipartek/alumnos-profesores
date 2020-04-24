package com.ipartek.formacion.model.dao;

import java.sql.SQLException;
import java.util.List;

import com.ipartek.formacion.model.Persona;
import com.ipartek.formacion.model.Rol;

public interface IPersonaDAO extends IDAO<Persona> {

	static final String EXCEPTION_ROL = "No existe el rol o es null";
	static final String EXCEPTION_PERSONA_NO_EXISTE = "No existe la persona";
	static final String EXCEPTION_CURSO_NO_EXISTE = "No existe el curso";
	static final String EXCEPTION_CURSO_PERSONA_DUPLICADO = "Ya esta asociado el curso a la persona";
	
	
	/**
	 * Lsitado de persona, la cual podemos filtrar por su Rol para conseguir los "Alumnos" o "Profesores"
	 * @param rol
	 * @throws Exception Si Rol == null o No existe
	 * @return
	 */
	List<Persona> getAllByRol( Rol rol) throws Exception;

	
	//TODO documentar y decir cuando lanza las posibles Exception, SQLException
	/**
	 * 
	 * @param idPersona
	 * @param idCurso
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	boolean asignarCurso(int idPersona, int idCurso) throws Exception, SQLException;

	/**
	 * 
	 * @param idPersona
	 * @param idCurso
	 * @return
	 * @throws Exception
	 * @throws SQLException
	 */
	boolean eliminarCurso(int idPersona, int idCurso) throws Exception, SQLException; 
	
	
	
	
	
}
