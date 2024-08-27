package com.app.service;

import com.app.repository.LoginRepo;

public class LoginService {
    LoginRepo loginRepo ;
    public LoginService() {
        loginRepo = new LoginRepo();
    }
    public boolean login(String username, String password) {

        return loginRepo.login(username, password);
    }
    public int getUserId(String username){
        return loginRepo.getUserId(username);
    }
}
