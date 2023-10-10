// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   let word = input.question("Enter a word to score: ");
   let score = oldScrabbleScorer(word);
   console.log(score);
   return score;
};

function simpleScorer(word) {
   word = word.toUpperCase();
   let score = word.length;
   return score;
}

function vowelBonusScorer(word) {
   word = word.toUpperCase();
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   let score = 0;

   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i])) {
         score+= 3;
      } else {
         score += 1;
      }
   }
   return score;
}

function scrabbleScorer(word) {
   word = word.toLowerCase();
      let score = 0;

      for (let letter of word) {
         score += newPointStructure[letter] || 0;
      }
   return score;
}

const scoringAlgorithms = [
   {
      name: "Simple Scorer",
      description: "Single point Letter",
      scorerFunction: simpleScorer
   },
   {
      name: "Vowel Bonus Scorer",
      description: "Tripple Point Vowels",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble Scorer",
      description: "Original Rules",
      scorerFunction: scrabbleScorer
   },
];

function scorerPrompt() {
   console.log("Which scoring system would you like to use?");

   for (let i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i}. ${scoringAlgorithms[i].name}`);
   }

   let selection = input.question("Enter 0, 1, or 2: ");
   return scoringAlgorithms[selection].scorerFunction;
}

function transform(oldPointStructure) {
   let newPointStructure = {};

   for (let pointValue in oldPointStructure) {
      for (let letter of oldPointStructure[pointValue]) {
         newPointStructure[letter.toLowerCase()] = parseInt(pointValue);
      }
   }
   return newPointStructure;
}
let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   let word = input.question("Enter a word to score: ");
   let scoringFunction = scorerPrompt();
   let score = scoringFunction(word);
   console.log(`Score for '${word}': ${score}`);
   return score;
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
