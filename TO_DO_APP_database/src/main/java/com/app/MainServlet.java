package com.app;

import com.app.controller.LoginController;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebServlet("/app")
public class MainServlet extends HttpServlet {
    LoginController loginController = new LoginController();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        HttpSession session = request.getSession(false);

        if (session != null) {
            session.invalidate();
        }
//        System.out.println("doGet");
        response.sendRedirect (request.getContextPath()+"/index.html");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        String username = request.getParameter("username");
        String password = request.getParameter("password");
        Boolean loggedin = loginController.login(username, password);

        if (loggedin) {
            int id=loginController.getUserId(username);
            request.getSession().setAttribute("id", id);
            response.sendRedirect(request.getContextPath()+"/main.html");
        } else {
            response.sendRedirect(request.getContextPath() + "/index.html");
        }
    }

}
