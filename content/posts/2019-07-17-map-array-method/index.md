---
title: Immutable objects with preventExtensions(), seal(), and freeze()
author: David Quick
date: 2019-10-27
hero: ./images/immutable-objects.jpg
excerpt: There are times where you'll have an object and want to preserve it's properties and restrict its behavior.
---

There are times where you'll have an object and want to preserve it's properties and restrict its behavior. This is when we can reach for `preventExtensions`, `seal`, or `freeze`. 

Let's create an object with several properties. We'll be working with the same object as to avoid confusion. 

```js
const village = {
 elder: "Greybeard",
 population: 120
}

```

##preventExtensions()

`Object.preventExtensions()` prevents new properties from being added to the object that's passed as its argument. Let's see how that works.   

```js
Object.preventExtensions(village)

village.group = "outsiders" // TypeError: can't define property "group": Object is not extensible
```

Above, we attempted to add a new property to our object. By using `preventExtensions`, we prevented a group of outsiders from entering our `village` object.

##seal()

`Object.seal()` borrows from `preventExtensions` by not allowing new properties to be added to an object and also preventing properties from being deleted. 

```js
Object.seal(village)

village.group = "outsiders" // TypeError: can't define property "group": Object is not extensible

delete village.elder // TypeError: property "elder" is non-configurable and can't be deleted

```

We see that we cannot add a group or remove our existing elder from the `village` object. However, we can still change our `elder` because our properties are writable. Let's see what that means.

```js
Object.seal(village)

village.elder = "Blackbeard" 

console.log(village.elder) // "Blackbeard" 
```
Our `elder` has now become Blackbeard.

##freeze()

`Object.freeze()` takes from both `preventExtensions` and `seal` in that We cannot add new properties and we cannot delete existing properties. The new addition is that it also prevents existing properties and their values from being changed.

Remember the writable issue with `seal`?

```js
Object.freeze(village)

village.elder = "Redbeard" 

console.log(village.elder) // TypeError: "elder" is read-only
```
NOTE: `Object.freeze()` only does a shallow freeze. Nested objects will not be frozen. 

##Overview 

Each method has its own use case and I don't blame you for not remembering them off the bat (I sure as heck didn't and still get confused from time to time). What helps me is to start from the least restrictive and work my way up from there. Also, breaking down the actual syntax is what helped me the most. 

Here's my odd rationale behind remembering them.

You have three sisters with superhuman abilities. From the oldest down, each sister gets a new ability while maintaining the ability of the other. 

- Oldest sister - `Object.preventExtensions()`: You can't (extend) add more properties. 

- Middle sister - `Object.seal()`: Seals an object, preventing properties from being deleted (What's inside cannot get out). Acquires the same ability from `preventExtensions`.

- Youngest - `Object.freeze()`: Freezes an object (nothing can be altered) and borrows the abilities from `preventExtensions` and `seal`.