package com.Main.Vehicle1;

import com.Main.Vehicle1.ElectricVehicle;

class ElectricCar extends ElectricVehicle {
    ElectricCar(String color,String model,int batteryLeft,int range,int batteryCapacity) {
        super.color=color;
        super.model=model;
        super.batteryLeft=batteryLeft;
        super.batteryCapacity=batteryCapacity;
        super.range=range;
    }
    boolean door=false;
    void openDoor(){
        if(door)
            System.out.println("Door is already open");
        else
        {
            door=true;
            System.out.println("Door is opened");
        }

    }
    void closeDoor(){
        if(!door)
            System.out.println("Door is already closed");
        else{
            door=false;
            System.out.println("Door closed");
        }
    }

}