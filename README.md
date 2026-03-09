# GitHub-Issues-Tracker


# 1️⃣ What is the difference between var, let, and const?

In JavaScript, **var**, **let**, and **const** are keywords used to declare variables. However, they differ in **scope and the ability to change their values**.

### Explanation :

**var**

* `var` has **function scope**, so it can be accessed anywhere inside the function where it is declared.
* A variable declared with `var` **can be updated and redeclared**.
* It was mostly used in **older versions of JavaScript**.

**let**

* `let` has **block scope**, meaning it only works inside the block `{ }` where it is defined.
* Its value **can be changed**, but it **cannot be redeclared in the same block**.

**const**

* `const` is also **block scoped**.
* Once a value is assigned to a `const` variable, **it cannot be reassigned**.
* It is usually used when the value **should remain fixed**.

### Example

```javascript
var a = 10;
let b = 20;
const c = 30;
```

---

#   2️⃣ What is the spread operator (...)?

The **spread operator (`...`)** in JavaScript is used to **expand elements of an array or properties of an object**.

### Explanation :

* It allows copying an array **without modifying the original array**.
* It can also be used to **merge multiple arrays into one array**.
* This operator often makes the code **shorter and easier to read**.

### Example

```javascript
let arr1 = [1,2,3];
let arr2 = [...arr1,4,5];
```

**Output:**

```
[1,2,3,4,5]
```

---

#  3️⃣ What is the difference between map(), filter(), and forEach()?


`map()`, `filter()`, and `forEach()` are **built-in JavaScript array methods** used to perform operations on array elements.

### Explanation :

**map()**

* Executes a function for **each element of an array**.
* It **returns a new array** containing the modified values.

**filter()**

* Checks every element based on a **specific condition**.
* Returns a **new array with only the elements that satisfy the condition**.

**forEach()**

* Executes a function **for each element in the array**.
* It is commonly used for actions like **displaying or printing values**.
* It **does not return a new array**.

### Example

```javascript
let numbers = [1,2,3];

numbers.map(n => n * 2);
numbers.filter(n => n > 1);
numbers.forEach(n => console.log(n));
```

---

#   4️⃣ What is an arrow function?

An **arrow function** is a modern and shorter syntax for writing functions in JavaScript using the `=>` symbol.

### Explanation :

* It was introduced in **ES6 (ECMAScript 6)**.
* It allows developers to write **more concise and cleaner functions**.
* Arrow functions are **commonly used in modern JavaScript programming**.

### Example

```javascript
const add = (a, b) => a + b;
```

---

# 5️⃣ What are template literals?


**Template literals** are a JavaScript feature used to create strings using **backticks  ( ` ) ** instead of single or double quotes.

### Explanation :

* They allow **variables or expressions to be inserted directly inside a string**.
* This is done using the **`${ }` syntax**.
* Template literals make string creation **more readable and flexible**.

### Example

```javascript
let name = "Rifat";
console.log(`Hello ${name}`);
```

---


