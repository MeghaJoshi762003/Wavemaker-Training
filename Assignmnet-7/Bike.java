package com.Main.Vehicle1;

public class Bike implements Vehicle {
    String color;
    String type;
    int fuelLeft=0;
    int speed;
    Bike(int speed,int fuelLeft,String color,String type) {
        this.color = color;
        this.type = type;
        this.fuelLeft = fuelLeft;
        this.speed = speed;
    }
    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setType(String type) {
        this.type = type;
    }

    public int getFuelLeft() {
        return fuelLeft;
    }

    public int getSpeed() {
        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public void setFuelLeft(int fuelLeft) {
        this.fuelLeft = fuelLeft;
    }

    public String getType() {
        return type;
    }

    @Override
    public void horn(){
        System.out.println("pip-pip!!!!");
    };
    @Override
    public void breaks(){
        speed=0;
        System.out.println("Vehicle stops");
    };
    @Override
    public void increaseSpeed(int by){
        speed+=by;
    };
    @Override
    public void decreaseSpeed(int by){
        speed-=by;
    };

    public void fuelUsed(int quantity){
        fuelLeft-=quantity;
    };

    public void fuelFill(int quantity){
        fuelLeft+=quantity;
    };


}
