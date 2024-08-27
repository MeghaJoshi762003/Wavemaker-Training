package com.app;

import com.app.controller.TaskController;
import com.app.model.Task;
import com.google.gson.Gson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.util.List;

@WebServlet("/addtask")
public class taskServlet extends HttpServlet {
    TaskController taskController = new TaskController();
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

            HttpSession session = request.getSession(false);
            int id = (int) session.getAttribute("id");
            List<Task> tasks = taskController.getAllTask(id);
            Gson gson = new Gson();
            String jsonTasks = gson.toJson(tasks);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(jsonTasks);

    }
   @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String desc=req.getParameter("desc").toLowerCase();
        String priority=req.getParameter("priority");
        String date=req.getParameter("date");
        String time=req.getParameter("time");
        HttpSession session = req.getSession(false);
        int id= (int) session.getAttribute("id");
        int p=0;
        if(priority.equals("Low"))
            p=1;
        else if(priority.equals("Medium"))
            p=2;
        else if(priority.equals("High"))
            p=3;
        Task task=new Task(id,desc,p,false,date,time);
        taskController.addTask(task);
        resp.sendRedirect(req.getContextPath()+"/main.html");

    }
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String desc=req.getParameter("desc").toLowerCase();

        String priority=req.getParameter("priority");
        int p=3;
        if(priority.equals("Low"))
            p=1;
        else if(priority.equals("Medium"))
            p=2;
        String date=req.getParameter("date");
        String time=req.getParameter("time");
        int taskid=Integer.parseInt(req.getParameter("taskid"));
        HttpSession session = req.getSession(false);
        int id= (int) session.getAttribute("id");
        Task task=new Task(id,desc,p,false,date,time);
        task.setId(taskid);
        taskController.updateTask(task);
    }
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        int taskId=Integer.parseInt(req.getParameter("id"));
        taskController.deleteTask(taskId);

    }
}
