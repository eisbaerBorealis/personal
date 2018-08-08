//  Challenge: https://www.reddit.com/r/dailyprogrammer/comments/3ofsyb/20151012_challenge_236_easy_random_bag_system/

import java.util.ArrayList;
import java.util.Random;

public class RandomBag
{
	public static void main(String[] args)
	{
		final String TETROMINOS = "IJLOSTZ";
		
		ArrayList<Character> bag = new ArrayList();
		
		Random rand = new Random();
		
		StringBuilder output = new StringBuilder();
		int nextPick;
		for(int i = 0; i < 50; i++)
		{
			if(i % 7 == 0)
			{
				//  Refill bag
				for(int j = 0; j < 7; j++)
				{
					bag.add(TETROMINOS.charAt(j));
				}
			}
			
			nextPick = Math.abs(rand.nextInt() % bag.size());
			output.append(bag.get(nextPick));
			bag.remove(nextPick);
		}

		System.out.println(output.toString());
	}

	private static boolean checkSequenceValidity(String sequence)
	{
		boolean valid = true;
		
		int endIndex;
		for(int i = 0; i < 50; i += 7)
		{
			if(valid)
			{
				endIndex = i + 7;
				if(endIndex > 49)
				{
					endIndex = 49;
				}
				
				valid = !hasRepeats(sequence.substring(i, endIndex));
				}
		}
		return valid;
	}
	
	private static boolean hasRepeats(String s)
	{
		boolean result = false;
		
		char c;
		for(int i = 0; i < s.length()-1; i++)
		{
			c = s.charAt(i);
			for(int j = i+1; j < s.length(); j++)
			{
				if(c == s.charAt(j))
				{
					result = true;
				}
			}
		}
		return result;
	}
}
