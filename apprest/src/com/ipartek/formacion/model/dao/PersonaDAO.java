package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import com.ipartek.formacion.model.Persona;

public class PersonaDAO implements IDAO<Persona> {

	@Override
	public List<Persona> getAll() {

		ArrayList<Persona> registros = new ArrayList<Persona>();
		String sql = "SELECT id, nombre, avatar, sexo FROM persona ORDER BY id DESC LIMIT 500";

		try (Connection con = ConnectionManager.getConnection();
				PreparedStatement pst = con.prepareStatement(sql);
				ResultSet rs = pst.executeQuery();

		) {

			while( rs.next() ) {
				
				Persona p = new Persona();
				p.setId( rs.getInt("id") );
				p.setNombre( rs.getString("nombre"));
				
				//TODO resto de campos
				
				registros.add(p);
				
			}
			
			
		} catch (SQLException e) {

			e.printStackTrace();
		}

		return registros;
	}

	@Override
	public Persona getById(int id) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Persona delete(int id) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Persona insert(Persona pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Persona update(Persona pojo) throws Exception, SQLException {
		// TODO Auto-generated method stub
		return null;
	}

}
