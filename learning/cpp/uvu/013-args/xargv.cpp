#include <iostream>
#include <string>
#include <fstream>

int wordCount = 0;

std::string getWordsFromFile(std::string fileName, std::string oldWords) {
   std::ifstream file;
   file.open(fileName);

   std::string word;
   while (file >> word) {
      if(word.at(0) != '@') {
         if(oldWords.length() > 0) {
            oldWords.append("\n");
         }
         oldWords.append(word);
         wordCount++;
      } else {
         oldWords = getWordsFromFile(word.substr(1), oldWords);
      }
   }
   file.close();
   return oldWords;
}

int main(int argc, char* argv[]) {
   std::string words = "";
   for(int i = 1; i < argc; i++) {
      std::string nextStr = argv[i];
      if(nextStr.at(0) != '@') {
         if(words.length() > 0) {
            words.append("\n");
         }
         words.append(argv[i]);
         wordCount++;
      } else {
         words = getWordsFromFile(nextStr.substr(1), words);
      }
   }
   std::cout << wordCount << " items:\n\n" << words;
   
   return 0;
}