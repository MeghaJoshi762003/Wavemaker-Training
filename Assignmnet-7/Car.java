package com.Main.Vehicle1;

import com.Main.Vehicle1.Vehicle;

public class Car implements Vehicle {
    String color;
    String type;
    int fuelLeft=0;
    String fuelType;
    int gear;
    boolean door=false;
    Car(int speed, String fuelType,int fuelLeft,String color,String type,int gear) {
        this.color = color;
        this.type = type;
        this.fuelType = fuelType;
        this.fuelLeft = fuelLeft;
        this.speed = speed;
        this.gear = gear;
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

    int speed;
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
    public void gearUp(int value){
        if(value>5 || value<1)
            System.out.println("Not possible");
        else
        { gear=value;
            System.out.println("Gear changed");}
    }
    public void openDoor(){
        if(door)
            System.out.println("Door is already open");
        else
        {
            door=true;
            System.out.println("Door is opened");
        }

    }
    public void closeDoor(){
        if(!door)
            System.out.println("Door is already closed");
        else{
            door=false;
            System.out.println("Door closed");
        }
    }
}