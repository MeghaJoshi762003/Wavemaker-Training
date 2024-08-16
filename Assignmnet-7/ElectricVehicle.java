package com.Main.Vehicle1;

public abstract class ElectricVehicle implements Vehicle{

    String color;
    String model;
    int batteryLeft;
    int range;
    int batteryCapacity;
    int speed=0;

    public int getSpeed() {

        return speed;
    }

    public void setSpeed(int speed) {
        this.speed = speed;
    }

    public int getBatteryCapacity() {
        return batteryCapacity;
    }

    public void setBatteryCapacity(int batteryCapacity) {
        this.batteryCapacity = batteryCapacity;
    }

    public int getRange() {
        return range;
    }

    public void setRange(int range) {
        this.range = range;
    }

    public int getBatteryLeft() {
        return batteryLeft;
    }

    public void setBatteryLeft(int batteryLeft) {
        this.batteryLeft = batteryLeft;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    @Override
    public void horn() {
        System.out.println("pip-pip!!!!");
    }

    @Override
    public void breaks() {
        speed=0;
        System.out.println("Vehicle stops");
    }

    @Override
    public void decreaseSpeed(int by) {
        speed-=by;
    }

    @Override
    public void increaseSpeed(int by) {
        speed+=by;
    }
}