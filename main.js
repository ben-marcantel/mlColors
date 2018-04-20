// "use strict";
let brain =require('brain.js');

console.log("here")
const input = document.getElementById("input");
const output = document.getElementById("output");
const example = document.getElementById("example");
const intro = document.getElementById("intro")


intro.innerHTML = "This simple machine learning app is built on brain.js. Depending on the background color, it will select a text color of either black or white. Please use the color picker to change the background color."


let trainingDataArray = [
    { input: { r: 1, g: 0, b: 0 }, output: { light: 1} },
    { input: { r: 0, g: 0.24, b: 0.95 }, output: { light: 1} },
    { input: { r: 0.92, g: 0.91, b: 0 }, output: { dark: 1} }  
]
    //regex to get rgb values!
const  getRgb = (hex)=> {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });
  
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: Math.round(parseInt(result[1], 16) / 2.55) / 100,
        g: Math.round(parseInt(result[2], 16) / 2.55) / 100,
        b: Math.round(parseInt(result[3], 16) / 2.55) / 100,
    } : null;
}


input.addEventListener("input", (event) => {

let rgb = getRgb(event.target.value);

const network = new brain.NeuralNetwork()
network.train(trainingDataArray)

const result = brain.likely(rgb, network)

example.innerHTML= `The text should be ${result}!`
example.style.background = event.target.value
intro.style.color = event.target.value
example.style.color = result === "dark" ?  "black" : "white" 
// intro.style.color = result === "dark" ? "black" : "white"

});














