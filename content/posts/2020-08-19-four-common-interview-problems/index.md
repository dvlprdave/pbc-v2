---
title: Four common JavaScript interview coding problems
author: David Quick
hero: ./images/js-interview.jpg
date: 2020-08-19
---

### Short story 
I recently had a technical interview with an amazing company in which I genuinely knew the answers, but if you had asked me what my name was **during** that interview, I would have struggled. :sob:

I kept apologizing during the interview and my mind was shot with nerves, so here's my self-redemption and help for those currently interviewing or planning to.

**A message to myself and others who might find it useful:**

> Take it easy and breathe. Wiggle your toes to let out the anxiety if you have to. Coding problem sets are concepts you know. You've got this! It's a matter of breaking things down line by line and connecting the pieces.

## 1. Palindrome

> A palindrome is a word that can be read the same backward or forwards.

**Challenge**: Return true if the given string is a palindrome otherwise return false.

**Solution 1**

```js
const isPalindrome = string => {
  let revString = [...string].reverse().join('')
  // create function to check if string argument is equal to the reversed string
  const palindromeCheck = () => string === revString ?  true : false

  return palindromeCheck()
}

console.log(isPalindrome('eye')) // true
console.log(isPalindrome('hello')) // false
```

The first step inside our `isPalindrome` function is to create a variable that will handle the reversal of whatever string we pass in. We do this by spreading our input string into an array and then using the `reverse()` method to reverse the string and add on the `join()` method to turn our array into a string:

```js
let revString = [...string].reverse().join('')
```

Then we create a quick little function that checks if the string we pass in is equal to our string in reverse `revString` by using the ternary operator. If it is, we return true otherwise false: 

```js
const palindromeCheck = () => string === revString ?  true : false
```

The final step is to return the call to the `palindromeCheck()` function.

**Solution 2 / Edge Case**

```js
const isPalindrome = string => {
  let revString = [...string].reverse().join('')

  if(typeof string === 'string' & string === revString) {
    return true
  } else {
    return false
  }
}

console.log(isPalindrome('hello')
```

This solution is nearly identical to the first, but checks for an edge case and uses an `if statement` as a conditional. 

```js
if(typeof string === 'string' & string === revString)
```

Above we are saying if the string we pass in is the type of `string` and our string is equal to our string in reverse, then return true otherwise false. This ensures we pass in a string instead of another data type. 

## 2. Find the sum of n numbers

**Challenge**: Create a function that gets the sum of all numbers passed in as an argument. 

**Solution 1**

```js
function sum() {
  let total = 0

  for (let num of arguments) {
    total += num
  }
  return total
}

console.log(sum(1, 5, 2)) // 8
```

The first thing we need to do is create a variable that will hold our total sum and give it a value of zero.

```js
let total = 0
```

Then we use `for...of` to loop over the function's arguments. We have access to these arguments through the arguments object by calling the `arguments` keyword.

>Excessive use of the word arguments. Sorry, not sorry lol

```js
for (let num of arguments) {
  total += num
}
```

Above we are looping over every item in our arguments array which in our case are numbers and then we add each number to our `total` on every iteration.  

**Solution 2**

```js
  const sum = (...args) => [...args].reduce((acc, num) => acc + num, 0)

  console.log(sum(5, 5, 2)) // 12
```

In this solution, we're using the `reduce` method to get our total sum. The `reduce` method takes in an accumulator and an item you wish to reduce followed by the reducer which is the action you want to perform to give us a single value. 

We create a function called `sum` that spreads all the arguments we pass in. Our arguments are then spread into an array with `[...args]` followed by the `reduce` method.

Reduce takes in a callback function followed by an initial value which is zero. The callback function in our instance is:

```js
(acc, num) => acc + num
```

`acc` is our accumulator (you can name this whatever you'd like) which stores our value through each iteration and `num` is simply a variable for each item in our array (in our case, a number).

The reduce method will iterate over our arguments and add each number to the accumulator giving us a final sum. 

> This is my go-to article whenever I'm having trouble remembering the details of reduce. [Alligator.io Understanding the JavaScript Reduce Method](https://alligator.io/js/finally-understand-reduce/)

## 3. FizzBuzz

**Challenge**: Create a function that prints numbers from 1 to 100. For multiples of three print "Fizz" instead of the number and for the multiples of five print "Buzz". For numbers which are multiples of both three and five print "FizzBuzz".

**Solution**

```js
const fizzBuzz = () => {
  for (let i = 1; i <= 100; i++) {
    let output = '';

    if (i % 3 === 0) {output += 'Fizz'}
    if (i % 5 === 0) {output += 'Buzz'}
    if (output === '') {output = i}

    console.log(output)
  }
}

fizzBuzz()
```
First, we create a `for loop` to iterate from 1 to 100. We then create a variable called `output` that will store each element. 

> It's easy to slip up when writing for loops, so be sure to check that you are within the correct bounds of the number range you are given. For example, make sure you're iterating from 1 - 100 and not 0 - 100 or 0 - 99. 

Using an `if statement` and the modulos operator we check for the remainder as we need to print a string for multiples of 3 and 5. 

```js 
if (i % 3 === 0) {output += 'Fizz'}
``` 
The above line of code says, if the current element I'm on (`i`) is divided by 3 and returns a remainder of 0, then add `Fizz` to the `output`. We use the same logic for 5 to print `Buzz`. 

```js
if (output === '') {output = i}
```

Here, we are testing the string of text rather than the number. If it's empty, meaning that we haven't added `Fizz` or `Buzz` then we can simply make the `output` the value of `i` which is the current number of the index the loop is on. Then we log the output: 

```js
1
2
Fizz 
4
Buzz 
Fizz 
7
8
Fizz 
Buzz 
11
Fizz 
13
14
FizzBuzz 
```

> There are a ton of ways to handle FizzBuzz, but I found this to be my favorite because if you're asked to print something for multiples of another number, you would simply have to tac on another `if statement` with that number and whatever output you're asked without worrying about changing any other line of code. 

## 4. Capitalize each word

**Challenge**: Write a function that takes in a sentence and returns that sentence with every first letter of each word capitalized.

**Solution / Edge Case**

```js 
const captilizeAllWords = sentence => {
  if (typeof sentence !== "string") return sentence

  return sentence.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

console.log(captilizeAllWords('every first letter will be capitalized'))
```

We first tackle the edge case being that we should input a string so we use the following line to do so: 

```js
if (typeof sentence !== "string") return sentence;
```
This states that if our input `sentence` isn't a type of string then we want to simply return the `sentence` as is. You could return a personal error if you'd like. 

If our edge case passes then we want to return our capitalized words using method chaining. 

Taking our `sentence` we use the `split(' ')` method to turn our `sentence` into an array of substrings. The empty string within `split()` must have an empty space as we want to separate each word, not each character. 

```js
sentence.split(' ')
```

Then we add on `map()` to iterate over each word, grab the first character of each word using `charAt(0)` and then capitalize that character (letter) using the `toUpperCase()` method. Currently, our `map()` is **only** returning the first letter of each sentence capitalized in an array: 

```js
//  our sentence is  --> 'every first letter will be capitalized'

sentence.split(' ').map(word => word.charAt(0).toUpperCase()) 
// ["E", "F", "L", "W", "B", "C"]
```

What we need to do now is append the sentence onto our array of capitalized letters and turn it back into a string: 

```js
map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
```

When we initially append our sentence to the array, it looks like this: 
```js
["Eevery", "Ffirst", "Lletter", "Wwill", "Bbe", "Ccapitalized"]
```

So we use the `slice()` method passing it the number 1 to remove the letter at that index which in each of our words is the duplicate letter in lowercase. We then use `join(' ')` which must include a space within the passed in string to turn our array into string format. 

```js
console.log(captilizeAllWords('every first letter will be capitalized'))
// Every First Letter Will Be Capitalized 
```

## Closing

There are a ton of ways you can go about solving each of these problems so feel free to find alternate solutions that you feel comfortable with. The key is to understand what you're doing and avoid memorizing solutions. It could come back and bite you in the long run. :see_no_evil:

Hope you found this article helpful!