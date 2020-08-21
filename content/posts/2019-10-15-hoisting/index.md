---
title: Hoisting in JavaScript
author: David Quick
date: 2019-10-15
excerpt: I feel it's safe to say that hoisting in JavaScript leads to a lot of confusion.
---

I feel it's safe to say that hoisting in JavaScript leads to a lot of confusion and it's mainly due to how it's explained and our condition to take words immediately for what they are. 

Hoisting is the physical act of moving something right? Yes, but not in this case. Yet, you may have heard "Hoisting is when declarations are moved to the top of your code". Well... not really. 

## Function Hoisting 

Let's look at a basic example of a function declaration.


```js
function getName(name) {
  console.log(`My name is ${name}`)
}

getName('Dave') // My name is Dave
```

Above, we declared a function named `getName` and then call it.

Now, let's flip it and call the function before it's declared. 

```js
getName('Dave') // My name is Dave

function getName(name) {
  console.log(`My name is ${name}`)
}
```

You might be surprised, but our output is exactly the same without any errors. Let's see why. 

> Keep in mind, this behavior only applies to function declarations. Function expressions **are not** hoisted. 

##Under the hood

When the JavaScript engine runs your code, it sets up something called the **Global Execution Context**. In this, there are two phases, the **creation phase** and **execution phase**. During the creation phase, JavaScript has done the following to your variable and function declarations:

- Created space in memory to store variables and functions
- Set variables to have a value of undefined.

 **NOTE**: There are two other steps before this (global object and the "this" keyword) but to avoid confusion, I have left those out as a seperate topic.

## The simple breakdown

JavaScript looked through our code, grabbed the `getName` function in it's entirety and placed it in memory during the creation phase. It then moved onto the execution phase where it went through our code line by line and once it hit the `getName()` call, it checked it's memory space and found the `getName` function to use.

## Variable hoisting

Earlier, we learned that during the creation phase variables are set to `undefined`. Let's look at an example to better understand that. 

```js
var fruit = "apple"

console.log(fruit) // "apple"
```

Let's see what happens when we declare our variable after we call it. 

```js
console.log(fruit) // undefined

var fruit = "apple"
```

Why do we get `undefined` and not an error? Let's drill it in one more time. Variables are set to `undefined` and put in memory during the creation phase. 

The above code behind the scenes really looks like this


```js
var fruit = undefined

console.log(fruit) // undefined

fruit = "apple"
```

> As for ES6, `let` & `const` are not hoisted. 

## Closing

Hopefully you have a better understanding of what hoisting is and what it isn't. The next time someone asks, you'll be able to confidently say:

 > Hoisting is when the JavaScript engine puts function declarations into memory and sets variables to undefined during the creation phase. 