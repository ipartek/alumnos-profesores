package com.ipartek.formacion.model.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

import com.ipartek.formacion.model.Curso;
import com.ipartek.formacion.model.Persona;
import com.ipartek.formacion.model.Rol;
import com.ipartek.formacion.model.dao.ConnectionManager;
import com.ipartek.formacion.model.dao.IPersonaDAO;

public class PersonaDAO implements IPersonaDAO {
	
	private static final Logger LOGGER = Logger.getLogger(PersonaDAO.class.getCanonicalName());
	
	private static PersonaDAO INSTANCE = null;
	
	private static String SQL_GET_ALL   = "SELECT \n" + 
											"	p.id as persona_id,\n" + 
											"	p.nombre as persona_nombre,\n" + 
											"	p.avatar as persona_avatar,\n" + 
											"	p.sexo as persona_sexo,\n" + 
											"	c.id as curso_id,\n" + 
											"	c.nombre as curso_nombre,\n" + 
											"	c.precio as curso_precio,\n" + 
											"	c.imagen  as curso_imagen\n" + 
											" FROM (persona p LEFT JOIN persona_has_curso pc ON p.id = pc.id_persona)\n" + 
											"     LEFT JOIN curso c ON pc.id_curso = c.id LIMIT 500;  ";
	
	private static String SQL_GET_BY_ID = "SELECT \n" + 
											"	p.id as persona_id,\n" + 
											"	p.nombre as persona_nombre,\n" + 
											"	p.avatar as persona_avatar,\n" + 
											"	p.sexo as persona_sexo,\n" + 
											"	c.id as curso_id,\n" + 
											"	c.nombre as curso_nombre,\n" + 
											"	c.precio as curso_precio,\n" + 
											"	c.imagen  as curso_imagen\n" + 
											" FROM (persona p LEFT JOIN persona_has_curso pc ON p.id = pc.id_persona)\n" + 
											"     LEFT JOIN curso c ON pc.id_curso = c.id WHERE p.id = ? ;   ";
	
	
	private static String SQL_DELETE    = "DELETE FROM persona WHERE id = ?; ";
	private static String SQL_INSERT    = "INSERT INTO persona ( nombre, avatar, sexo) VALUES ( ?, ?, ? ); ";
	private static String SQL_UPDATE    = "UPDATE persona SET nombre = ?, avatar = ?,  sexo = ? WHERE id = ?; ";
	private static String SQL_ASIGNAR_CURSO    = "INSERT INTO persona_has_curso (id_persona, id_curso) VALUES ( ?, ?); ";
	private static String SQL_ELIMINAR_CURSO    = "DELETE FROM persona_has_curso WHERE id_persona = ? AND id_curso = ?;  ";
	

	private PersonaDAO() {
		super();		
	}
	
	public synchronized static PersonaDAO getInstance() {
        if (INSTANCE == null) {
        	INSTANCE = new PersonaDAO();
        }
        return INSTANCE;
    }
	

	@Override
	public List<Persona> getAll() {

		LOGGER.info("getAll");
		
		ArrayList<Persona> registros = new ArrayList<Persona>();
		HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_ALL);
				ResultSet rs = pst.executeQuery();

		) {

			LOGGER.info(pst.toString());
			
			while( rs.next() ) {				
				 mapper(rs, hmPersonas );			
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		// convert hashmap to array
		registros = new ArrayList<Persona> ( hmPersonas.values() );
		return registros;
	}

	@Override
	public Persona getById(int id) throws Exception {
		
		Persona registro = null;
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_GET_BY_ID);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			try( ResultSet rs = pst.executeQuery() ){
			
				HashMap<Integer, Persona> hmPersonas = new HashMap<Integer, Persona>();
				if( rs.next() ) {					
					registro = mapper(rs, hmPersonas);
				}else {
					throw new Exception("Registro no encontrado para id = " + id);
				}
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registro;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		Persona registro = null;
		
		//recuperar persona antes de eliminar
		registro = getById(id);
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_DELETE);
		) {

			pst.setInt(1, id);
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows != 1) {
				throw new Exception("No se puede eliminar registro " + id);
			}
			
		} catch (SQLException e) {

			throw new SQLException("No se puede eliminar registro " + e.getMessage() );
		}

		return registro;
	}

	@Override
	public Persona insert(Persona pojo) throws Exception, SQLException {
		
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_INSERT, PreparedStatement.RETURN_GENERATED_KEYS);
		) {

			pst.setString(1, pojo.getNombre() );
			pst.setString(2, pojo.getAvatar() );
			pst.setString(3, pojo.getSexo() );
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows == 1) {
				//recuperar ID generado automaticamente
				ResultSet rs = pst.getGeneratedKeys();
				if( rs.next()) {
					pojo.setId( rs.getInt(1) );
				}	
				
			}else {
				throw new Exception("No se puede crear registro " + pojo);
			}
			
		} catch (SQLException e) {

			throw new Exception("No se puede crear registro " + e.getMessage() );
		}

		return pojo;
	}

	@Override
	public Persona update(Persona pojo) throws Exception, SQLException {
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_UPDATE);
		) {

			pst.setString(1, pojo.getNombre() );
			pst.setString(2, pojo.getAvatar() );
			pst.setString(3, pojo.getSexo() );
			pst.setInt(4, pojo.getId() );
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows != 1) {				
				throw new Exception("No se puede modificar registro " + pojo);
			}
			
		} catch (SQLException e) {

			throw new Exception("No se puede modificar registro " + e.getMessage() );
		}

		return pojo;
	}
	
	@Override
	public boolean asignarCurso( int idPersona, int idCurso ) throws Exception, SQLException {
		boolean resul = false;
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_ASIGNAR_CURSO);
		) {

			pst.setInt(1, idPersona);
			pst.setInt(2, idCurso);
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows == 1) {
				resul = true;
			}else {
				resul = false;		
			}
		}
		
		return resul;
	}
	
	@Override
	public boolean eliminarCurso( int idPersona, int idCurso ) throws Exception, SQLException {
		boolean resul = false;
		
		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(SQL_ELIMINAR_CURSO);
		) {

			pst.setInt(1, idPersona);
			pst.setInt(2, idCurso);
			LOGGER.info(pst.toString());
			
			//eliminamos la persona
			int affetedRows = pst.executeUpdate();	
			if (affetedRows == 1) {
				resul = true;
			}else {
				throw new Exception("No se encontrado registro id_persona =" + idPersona + " id_curso=" + idCurso );		
			}
		}
		
		return resul;
	}
	
	
	@Override
	public List<Persona> getAllByRol(Rol rol) throws Exception {
		// TODO Auto-generated method stub
		throw new Exception("sin implemntar");
	}
	
	
	
	
	private Persona mapper( ResultSet rs, HashMap<Integer, Persona> hm ) throws SQLException {
		
		
		int key = rs.getInt("persona_id"); 
		
		Persona p = hm.get(key);
		
		// si no existe en el hm se crea
		if ( p == null ) {
			
			p = new Persona();
			p.setId( key  );
			p.setNombre( rs.getString("persona_nombre"));
			p.setAvatar( rs.getString("persona_avatar"));
			p.setSexo( rs.getString("persona_sexo"));
						
		}
		
		// se añade el curso
		int idCurso = rs.getInt("curso_id");
		if ( idCurso != 0) {
			Curso c = new Curso();
			c.setId(idCurso);
			c.setNombre(rs.getString("curso_nombre"));
			c.setPrecio( rs.getFloat("curso_precio"));
			c.setImagen(rs.getString("curso_imagen"));			
			p.getCursos().add(c);
			
			//TODO meter el profesor del curso
			Persona profesor = new Persona();
			
			
		}	
		
		//actualizar hashmap
		hm.put(key, p);
		
		return p;
	}

	


}
