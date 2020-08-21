---
title: For..in vs For..of
author: David Quick
date: 2020-08-21
excerpt: Let's clear something up that will hopefully help you understand the when and why of for..in and for..of  
---

Let's clear something up that will hopefully help you understand the when and why of for..in and for..of before we dive into any examples.

In JavaScript, we have something called **iterables**. It's simply a data structure that allows you to access a collection of data sequentially. When we go over that data one by one, its called **iteration**.

Iterables are arrays and strings, as they are collections that have an order.

Under the hood, JavaScript has given a method to these iterables called `Symbol.iterator`. This is all built in and is what allows arrays and strings to be iterables without having to do anything to make them so.
 
Great, now that you know what an iterable is, we can get to the core of this post. 

## for..in  
Used to loop through properties on an object.  
Let's take a look at the syntax and then dive into an example.

```javascript
for (variable in object) {...}
```

The variable (you can name this anything you'd like) is assigned to the current object key in the loop.

The second half is the name of the actual object you want to loop through.

```javascript
let car = {
  make: 'Nissan',
  model: 'Skyline'
}

for (let property in car) {
  console.log(property)
}

// Output --> make model
```

Above, we only retrieved the keys of the object. To retrieve the value, we have to do the following

```javascript
for (let property in car) {
  console.log(car[property])
}

//Output --> Nissan Skyline
```

##for..of
Used to loop over iterable values (cannot be used on objects).
The syntax follows the same convention as **for..in** aside from changing "in" to "of".

```javascript
const people = ['Ashley', 'Mark', 'Jen', 'Devin']

for (const name of people) {
  console.log(name)
}

// Output -->

// Ashley
// Mark
// Jen
// Devin
```

It's easy to get confused when attempting to figure out which one to use. To be fair, I confuse the two all the time.

Hopefully this reference helps:  
##### For..in - Loops over enumerable properties. Use it when you want to loop over objects

##### For..of - Loops over iterable collections. Use it when you want to loop over iterables such as:  
- strings
- map
- array
- TypedArray
- set
- generator