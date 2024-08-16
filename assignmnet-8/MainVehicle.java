package com.Main;

 interface Vehicle {
   void horn();
   void breaks();
   void decreaseSpeed(int by);
   void increaseSpeed(int by);
 }
class Car implements Vehicle {
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
class Bike implements Vehicle {
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
 abstract class ElectricVehile implements Vehicle{

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
class ElectricBike extends ElectricVehile{
    ElectricBike(String color,String model,int batteryLeft,int range,int batteryCapacity) {
        super.color=color;
        super.model=model;
        super.batteryLeft=batteryLeft;
        super.batteryCapacity=batteryCapacity;
        super.range=range;
    }

}
class ElectricCar extends ElectricVehile {
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
public class MainVehicle{
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