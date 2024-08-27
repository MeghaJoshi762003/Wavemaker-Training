package com.app.repository;

import com.app.model.Task;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class TaskRepo {
    Connection connection;
    public TaskRepo()
    {
        try {

            Class.forName("com.mysql.cj.jdbc.Driver");

            String url = "jdbc:mysql://localhost:3306/TODO";
            String user = "root";
            String password = "87707@";
            connection = DriverManager.getConnection(url, user, password);

        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
    public void addTask(Task task){
        try{
//             String username=session.getAttribute();


            int userId= task.getUserId();


            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO TASK (TASKDESC,TASKPRIORITY,DATE,TIME,USERID) VALUES(?,?,?,?,?)");
            preparedStatement.setString(1, task.getTaskDescription());
            preparedStatement.setInt(2, task.getTaskPriority());
            preparedStatement.setString(3, task.getDate());
            preparedStatement.setString(4, task.getTime());
            preparedStatement.setInt(5, userId);
            preparedStatement.executeUpdate();
            preparedStatement.close();

        }
        catch(SQLException e){
            e.printStackTrace();
        }

    }

    public List<Task> getAllTask(int id) {
        try{

            PreparedStatement p1=connection.prepareStatement("SELECT * FROM  TASK WHERE USERID=? ");
            p1.setInt(1,id);
            ResultSet rs2=p1.executeQuery();
            List<Task> tasks=new ArrayList<Task>();
            while (rs2.next()) {
                Boolean status=rs2.getBoolean("STATUS");
                String desc=rs2.getString("TASKDESC");
                int priority=rs2.getInt("TASKPRIORITY");
                String date=rs2.getString("DATE");
                String time=rs2.getString("TIME");
                int taskid=rs2.getInt("ID");
                Task t=new Task(id,desc,priority,status,date,time);
                t.setId(taskid);
                tasks.add(t);

            }
            return tasks;

        }
        catch(SQLException e)
        {
            e.printStackTrace();
        }
        return null;
    }

    public void deleteTask(int taskId) {
        try{
            PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM TASK WHERE ID=?");
            preparedStatement.setInt(1, taskId);
            preparedStatement.executeUpdate();
            preparedStatement.close();
        }
        catch(SQLException e)
        {
            e.printStackTrace();
        }


    }

    public void updatetask(Task task) {
        try{
            PreparedStatement preparedStatement=connection.prepareStatement("UPDATE TASK SET TASKDESC=? ,TASKPRIORITY=? , DATE=? , TIME=? WHERE ID=? ");
            preparedStatement.setInt(5, task.getId());
            preparedStatement.setString(1, task.getTaskDescription());
            preparedStatement.setInt(2, task.getTaskPriority());
            preparedStatement.setString(3, task.getDate());
            preparedStatement.setString(4, task.getTime());
            preparedStatement.executeUpdate();
            preparedStatement.close();

        }
        catch(SQLException e)
        {
            e.printStackTrace();
        }
    }
}
