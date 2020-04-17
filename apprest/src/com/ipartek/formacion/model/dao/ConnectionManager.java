package com.ipartek.formacion.model.dao;

import java.sql.Connection;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.naming.InitialContext;
import javax.sql.DataSource;


public class ConnectionManager {

	private static final Logger LOGGER = Logger.getLogger(ConnectionManager.class.getCanonicalName());
	private static Connection conn;

	public static Connection getConnection() {

		
		conn = null;

		try {
			InitialContext ctx = new InitialContext();
			DataSource ds = (DataSource) ctx.lookup("java:comp/env/jdbc/mydb");

			if (ds == null) {
				LOGGER.log( Level.SEVERE, "Data source no encontrado!");
				throw new Exception("Data source no encontrado!");
			}

			conn = ds.getConnection();
			LOGGER.log( Level.INFO, "conexion establecida");

		} catch (Exception e) {

			LOGGER.log( Level.SEVERE, "Exception", e );
			e.printStackTrace();
		}

		return conn;

	}
}
