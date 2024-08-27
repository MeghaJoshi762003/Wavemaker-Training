package com.app.repository;

import java.sql.*;

public class LoginRepo {
    Connection connection;
public LoginRepo()
{
    try {

        Class.forName("com.mysql.cj.jdbc.Driver");

        String url = "jdbc:mysql://localhost:3306/TODO";
        String user = "root";
        String password = "87707@";
        connection = DriverManager.getConnection(url, user, password);

    } catch (ClassNotFoundException| SQLException e) {
        e.printStackTrace();
    }
}
public int getUserId(String username)
{
    try{
        PreparedStatement p=connection.prepareStatement("SELECT ID FROM USER WHERE USERNAME=?");
        p.setString(1,username);
        ResultSet rs=p.executeQuery();
        if(rs.next())
        {
            return rs.getInt("ID");
        }

    }
    catch(SQLException e)
    {
        e.printStackTrace();
    }
    return -1;

}

public Boolean login(String username, String password)
{
    try{
        PreparedStatement preparedStatement = connection.prepareStatement("Select * from USER WHERE USERNAME=? AND PASSWORD=?");
        preparedStatement.setString(1, username);
        preparedStatement.setString(2, password);
        ResultSet resultSet = preparedStatement.executeQuery();
        if(resultSet.next())
            return true;
        else return false;

    }
    catch(SQLException e)
    {
        e.printStackTrace();
    }
return false;
}

}
