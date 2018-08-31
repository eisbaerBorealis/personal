// https://www.spoj.com/problems/PRIME1/

import java.util.Scanner;

class PrimeGenerator
{
    public static void main(String[] args)
    {
        //  Rules for testing if a number is prime
        // Rule 1: You only need to test already known primes
        // Rule 2: You only need to test up to the square root of the number
        // The maximum number for this problem is 1,000,000,000, so the highest prime I need to find is 31,623

        int[] knownPrimes = new int[3402];
        int knownPrimeCount = 0;

        for(int i = 2; i < 31623; i++)
        {
            boolean isPrime = true;

            for(int j = 0; i > knownPrimes[j] && knownPrimes[j] > 0; j++)
            {
                if(i % knownPrimes[j] == 0)
                {
                    isPrime = false;
                }
            }

            if(isPrime)
            {
                knownPrimes[knownPrimeCount] = i;
                knownPrimeCount++;
            }
        }

        Scanner scanner = new Scanner(System.in);

        String input;
        String[] bounds;

        int testCount = Integer.parseInt(scanner.nextLine());
        int lowerBound, upperBound;

        for(int i = 0; i < testCount; i++)
        {
            input = scanner.nextLine();
            bounds = input.split(" ");

            lowerBound = Integer.parseInt(bounds[0]);
            upperBound = Integer.parseInt(bounds[1]);

            for(int j = lowerBound; j <= upperBound; j++)
            {
                if(j < 2)
                {
                    j = 2;
                }
                boolean factorFound = false;
                int k = 2;
                int maxFactor = (int)(Math.ceil(Math.sqrt(j)));
                while(!factorFound && k <= maxFactor)
                {
                    if(j != 2 && j % k == 0)
                    {
                        factorFound = true;
                    }
                    k++;
                }
                if(!factorFound)
                {
                    System.out.println(j);
                }
            }

            if(i + 1 < testCount)
            {
                System.out.println();
            }
        }
    }
}
