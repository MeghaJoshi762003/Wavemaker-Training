package com.Main;

import java.util.Scanner;
public class GuessGame {
    public static void main(String[] args) {
        int rdm=(int)(Math.random()*50);
        while(true) {
            System.out.println("Guess a Number between 0 to 50");
            Scanner sc=new Scanner(System.in);
            int guess=sc.nextInt();

//            if(guess<0||guess>50)
//            {
//                System.out.println("Invalid Number");
//            }
//            else if(guess==rdm)
//                System.out.println("Congrats you guessed correctly!");
//            else if(Math.abs(guess-rdm)<=10)
//                System.out.println("You are near to it");
//            else
//                System.out.println("Good luck next time");
            if(guess==rdm) {
                System.out.println("Congratulations! You win!");
            }
            else if(guess<rdm) {
                System.out.println("increase value");
                continue;
            }
            else if(guess>rdm) {
                System.out.println("decrease value");
                continue;
            }
            System.out.println("Do you want to play again? \n if yes then enter y else n");
            char c=sc.next().charAt(0);
            if(c!='y')
                break;

        }



    }
}
