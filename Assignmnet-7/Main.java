package com.Main.Vehicle1;

import com.Main.Vehicle1.Bike;
import com.Main.Vehicle1.Car;
import com.Main.Vehicle1.ElectricBike;
import com.Main.Vehicle1.ElectricCar;

public class Main {
    public static void main(String[] args) {
        Car car=new Car(20,"petrol",250,"black","BMW",2);
        Bike bike=new Bike(70,500,"Pink","Apache");
        ElectricCar electricCar=new ElectricCar("White","Kia EV6",75,200,300);
        ElectricBike electricBike=new ElectricBike("Brown","OLA S1 X",80,100,200);
        System.out.println(electricCar.getColor());
        System.out.println(bike.getColor());
        car.horn();


    }
}
