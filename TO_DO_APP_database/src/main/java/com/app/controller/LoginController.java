package com.app.controller;

import com.app.model.Task;
import com.app.service.LoginService;

public class LoginController {
    LoginService loginService ;
    public LoginController() {
        loginService=new LoginService();
    }
    public boolean login(String username, String password) {
        return loginService.login(username,password);
    }
    public int getUserId(String username) {
        return loginService.getUserId(username);
    }

}
