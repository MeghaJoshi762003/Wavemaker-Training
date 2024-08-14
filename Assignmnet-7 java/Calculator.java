package com.Main;

import java.math.BigInteger;
import java.util.Scanner;

public class Calculator {
    public static void main(String[] args) {
        System.out.println("Enter the operation you want to perform + - * / %(remainder)  |(for power)");
        Scanner sc = new Scanner(System.in);
        char c=sc.next().charAt(0);
        System.out.println("Enter the two number");
        BigInteger a = new BigInteger("1");
        BigInteger b = new BigInteger("2");
        a=sc.nextBigInteger();
        b=sc.nextBigInteger();

        switch (c) {
            case '+':
                    System.out.println(a.add(b));
                    break;
            case '-':
                    System.out.println(a.subtract(b));
                    break;
            case '*':
                System.out.println(a.multiply(b));
                break;
            case '/':
                System.out.println(a.divide(b));
                break;
            case '%':
                System.out.println(a.mod(b));
                break;
            case '|':
                System.out.println(a.pow(b.intValue()));
                break;
        }

    }
}
