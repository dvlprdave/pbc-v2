---
title: ES6 Debriefing Pt.1
author: David Quick
date: 2020-08-21
hero: ./images/es6-debrief.jpg
excerpt: Let's go over some of the avialable features in ES6 and cover what they do.  
---

ES6 (ECMAScript 6) is a standard (version) of JavaScript. 
People tend to get confused with ES6 and ES2015, but they 
are literally the same thing. 🤷🏽‍♂️

With this new version comes new features and in this series, 
we're going to cover some of the most important ones. 

### let/const

let and const are new variable declarations that allow you to 
write more secure code.

### let 

let variables are block scoped. This means that any let variable 
declared within a pair of **{ }** is secured to that block.  

> let cannot be redeclared but it can be reassigned.

Take a look at the following example: 

```js
let underwaterAnimal = 🐋
if (true) {
  let underwaterAnimal = 🐠
}

console.log(underwaterAnimal) // 🐋
```  
Here, our variables have the same name, but both are scoped differently. 
Although we can **reassign** let, when we log out **underwaterAnimal**, 
we recieve the global reference 🐋 rather than the block reference 🐠. 

However, we can reassign **underwaterAnimal** by doing the following: 

```js
let underwaterAnimal = 🐋

underwaterAnimal = 🐠

console.log(underwaterAnimal) // 🐠
``` 

### const 

const and let are essentially the same. The only difference is that const 
cannot be redeclared or reassiagned.

**NOTE:** The actual name "const" is slightly misleading as it isn't a 
constant variable. There is only a constant reference to the value. 
I'll touch on that in a moment though. Let's take a quick look at the 
basis of const. 

```js
const farmAnimal = 🐓

farmAnimal = 🐤

// SyntaxError: redeclaration of const farmAnimal
``` 

I mentioned before that the name const is slightly misleading. Although 
you aren't able to redeclare or reassign const, the value isn't 
immutable (unchanging). 

```js
const car = {
  type:'Nissan',
  model:'Skyline',
  color:'black'
};

// You can change a property:
car.color = "red";

console.log(car); // the color of the car is now red
```

### Arrow Functions

Arrow functions are by far my favorite part about ES6. They are simply 
a more concise way to writting functions. Let's look at a few of their 
key features: 

1. No need to write the function keyword.  
2. No need to explicitly write the return keyword.  
3. No need for curly braces when there is only one expression. 
4. No parentheses required when there is only one argument.  
5. No need to bind "this" keyword. (I promise to touch on this in 
detail. Pun intended 🙏🏼)

Let's lay out a regular function and then its arrow function 
equivalent.

```js
// Regular function
function policeCar() {
  console.log(🚓)
}

//Arrow function
policeCar() => { console.log(🚓) }

//Arrow function / Function Expression
const policeCar = () => console.log(🚓)

```  

Say we want to multiply the number of a parameter and use the 
shortest written form of an arrow function, we'd do the following:

```js
const doubleNumber = (number) => { number *2 }

// Without parentheses and curly braces
const doubleNumber = number => number * 2
``` 

They key things to note here and I touched on them earlier, are:  
1. If there is only one parameter within the function, you DO NOT 
need parenthesis, BUT if there are no parameters or more than 
one parameter, you NEED to use parenthesis.
2. If you are returning a single line statement from your 
function, you DO NOT need to use brackets "{}" or the 
"return" keyword.

### "this" binding  

To fully grasp the binding of the **this** keyword in arrow 
functions, we need to back up (you can take a moment and 
sigh and/or smash your keyboard) and understand what 
**this** is.  

Any code written in JavaScript hangs out in the 
**Global Execution Context**. Before you type 
a single line of code, the **Global 
Execution Context** has done two things: 

1. Created a global object aka the window object
2. Set the value of **this**to the window object

If you're already confused, don't worry about 
it. Head over to your browser, open up a new 
tab, then open the "inspect element" tool. 
Type the following into the console: 

```js
 console.log(this) // You'll see the window object appear.
 ``` 

Now that we know the **this** keyword isn't some 
mystery word we throw around, let's quickly 
define what it does and how to read it when we see it. 

### Two things: 

1. The **this** keyword simply refers to the object 
a function or method is being invoked upon.
2. Always look at the scope (where something sits) 
of the invoked function or method.

```js
const 🍔 = {
  extraTopping: 'bacon',
  showTopping: function() {
    console.log(this.extraTopping); 
  }
};

🍔.showTopping() // 'bacon' is logged 
``` 

In the example above, we have a hamburger object with 
a **showTopping** method. When we call this method 
(methods are just functions that belong to an object), 
the **this** keyword looks to the object it's being 
invoked upon (🍔 object).  

If we go deeper and add a function to our method and 
try to access **this** let's see what we get. 

```js
const 🍔 = {
  extraTopping: 'bacon',
  sides: ['fries', 'onion rings'],
  showTopping: function() {
    this.sides.forEach(function(side) {
      console.log(this.extraTopping + " and " + side);
    });
  }
};

🍔.showTopping(); 
// undefined and fries
// undefined and onion rings
``` 

We get undefined because when **this** is called on a 
stand-alone function or another method of an object, 
it will always refer to the global window object. 

> **NOTE** : We see undefined rather than the window object 
because when strict mode is enabled in JavaScript, the 
global object is referenced to undefined instead of the window object.  

### Arrow functions to the rescue  
To get around this issue, you either had to call a variable outside 
of the methods inner function and set it to **this**. Or, you'd have 
to use **bind** on the method. We've come upon simpler times, so 
there's no need for all of that. 🙏🏼  

```js
const 🍔 = {
  extraTopping: 'bacon',
  sides: ['fries', 'onion rings'],
  showTopping: function() {
    this.sides.forEach( side => {
      console.log(this.extraTopping + " and " + side);
    });
  }
};

🍔.showTopping(); 
// bacon and fries
// bacon and onion rings
```
 
How does this work? Remember the set of listed rules 
I touched on about the features of arrow functions? 
The last one where I failed miserably at being funny
 was: **No need to bind "this" keyword.**  

Arrow functions DO NOT have it's own **this**. MDN 
explains it fairly well: 

> An arrow function does not have its own **this**; the 
this value of the enclosing lexical context is used i.e. 
Arrow functions follow the normal variable lookup rules. 
So while searching for **this** which is not present in 
current scope they end up finding **this** from its 
enclosing scope.  

So essentially, because we used an arrow function, 
the **this** keyword attached to **extraTopping** 
looks one step up to its parent scope and grabs 
the value of **this** from showTopping, which 
is the hamburger object.