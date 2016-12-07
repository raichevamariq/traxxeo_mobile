package com.example.mframe;



    import java.sql.DriverManager;
    import java.sql.Connection;
    import java.sql.SQLException;
import java.sql.*;

    public class DbConnection {
        public void connect(){

            try {

                Class.forName("oracle.jdbc.driver.OracleDriver");

            } catch (ClassNotFoundException e) {

                System.out.println("Where is your Oracle JDBC Driver?");
                e.printStackTrace();
                return;

            }

            System.out.println("Oracle JDBC Driver Registered!");

            Connection connection = null;

            try {

                connection = DriverManager.getConnection(
                        "jdbc:oracle:thin:@212.166.57.102:1521:FLEET", "OF_OWNER",
                        "OFO");

            } catch (SQLException e) {

                System.out.println("Connection Failed! Check output console");
                e.printStackTrace();
                return;

            }

            if (connection != null) {
                System.out.println("You made it, take control your database now!");
                // Statement stmt = null;
                //stmt = connection.createStatement();
                //  String query = "select brand from vehicle";
               /* try {
                    stmt = connection.createStatement();
                    ResultSet rs = stmt.executeQuery(query);
                    while (rs.next()) {
                        String vehicleBrand = rs.getString("brand");
                        System.out.println(vehicleBrand);

                     }
                }
                catch (SQLException e ) {
                    System.out.println("Sql exception");
                } finally {
                        if (stmt != null) { stmt.close(); }
                } */
            }
            else {
                System.out.println("Failed to make connection!");
            }
        }



        public static void main(String[] argv) throws SQLException {

            System.out.println("-------- Oracle JDBC Connection Testing ------");



    }}

