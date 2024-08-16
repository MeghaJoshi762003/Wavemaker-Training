package com.Main.Vehicle1;

import com.Main.Vehicle1.ElectricVehicle;

public class ElectricBike extends ElectricVehicle {
    ElectricBike(String color,String model,int batteryLeft,int range,int batteryCapacity) {
        super.color=color;
        super.model=model;
        super.batteryLeft=batteryLeft;
        super.batteryCapacity=batteryCapacity;
        super.range=range;
    }

}
