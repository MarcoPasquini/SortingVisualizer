const NUMBER_OF_ARRAY_BARS = 80;

const MINIMUM_VALUE = 5;

const MAXIMUM_VALUE = 700;

const COLOR = '#a1cca5';

let array = [];
let state = {isReady: true};
function inizialize() {
    for(let i=0; i<NUMBER_OF_ARRAY_BARS; i++){
        let val = randomIntFromInterval(MINIMUM_VALUE, MAXIMUM_VALUE);
        let tile = document.createElement("div");
        tile.classList.add("array-bar");
        tile.id = i;
        tile.style.backgroundColor = COLOR;
        tile.style.height = val+"px";
        document.getElementById("array-container").appendChild(tile);
        array.push(val);
    }
}
function resetArray() {
    if(!state.isReady)
        return;
    array = [];
    for(let i=0; i<NUMBER_OF_ARRAY_BARS; i++){
        let val = randomIntFromInterval(MINIMUM_VALUE, MAXIMUM_VALUE);
        let tile = document.getElementById(i);
        tile.id = i;
        tile.style.backgroundColor = COLOR;
        tile.style.height = val+"px";
        array.push(val);
    }
}
function sort(type){
    if(!state.isReady || isSorted(array))
        return;
    state.isReady = false;
    const arrayBars = document.getElementsByClassName('array-bar');
    let swaps;
    let animationDelay = document.getElementById("range").value;
    animationDelay = 21 - animationDelay;
    switch(type){
        case "merge":
            swaps = MergeSort(array);
            break;
        case "quick":
            swaps = QuickSort(array);
            animationDelay+=4;
            break;
        case "heap":
            swaps = HeapSort(array);
            break;
        case "selection":
            swaps = SelectionSort(array);
            animationDelay+=10;
            break;
        case "bubble":
            swaps = BubbleSort(array);
            break;
    }
    animate(swaps, arrayBars, animationDelay, state);
}
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
window.onload = inizialize;