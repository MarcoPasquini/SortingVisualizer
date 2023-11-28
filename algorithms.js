function SelectionSort(array){
    const swaps = [];
    let min, k=0, tmpValue;
    for(let i=0; i<array.length; i++){
        min = Infinity;
        k=0;
        for(let j=i; j<array.length; j++){
            if(array[j]<min){
                min = array[j];
                k=j;
            }
        }
        swaps.push([i, k]);
        tmpValue = array[k];
        array[k] = array[i];
        array[i] = tmpValue;
    }
    return swaps;
}
function BubbleSort(array) {
    let swapped = false;
    const swaps = [];
    do{
      swapped = false;
      for(let i=1; i<array.length; i++){
        if(array[i] < array[i-1]){
          swapped = true;
          [array[i], array[i-1]] = [array[i-1], array[i]];
          swaps.push([i,i-1]);
        }
      }
    }while(swapped);
    return swaps;
}
function HeapSort(array){
    const swaps = [];
    buildMaxHeap(array, swaps);
    let tmpValue;
    for(let i=array.length-1; i>0; i--){
      tmpValue = array[i];
      array[i] = array[0];
      array[0] = tmpValue;
      swaps.push([0, i]);
      maxHeapify(array, 0, i-1, swaps);
    }
    return swaps;
}
function buildMaxHeap(array, swaps){
    for(let i=Math.floor(array.length/2)+1; i>=0;i--){
      maxHeapify(array, i, array.length-1, swaps);
    }
}
function maxHeapify(array, node, l, swaps){
    let left = node*2, right = (node*2)+1, maxIdx = node;
    if(left <=l && array[left]>array[node])
      maxIdx = left;
    if(right <=l && array[right]>array[maxIdx])
      maxIdx = right;
    if(maxIdx != node){
      let tmpValue = array[node];
      array[node] = array[maxIdx];
      array[maxIdx] = tmpValue;
      swaps.push([maxIdx, node]);
      maxHeapify(array, maxIdx, l, swaps);
    }
}
function QuickSort(array, start=0, end=array.length-1, swaps=[]){
    if(start<end){
      const pivot = partition(array, start, end, swaps);
      QuickSort(array, start, pivot-1, swaps);
      QuickSort(array, pivot+1, end, swaps);
    }
    return swaps;
}
function partition(array, start, end, swaps){
    let pivot = array[end], tmpValue;
    let i = start-1;
    for(let j=start; j<end; j++){
      if(array[j] <= pivot){
        i++;
        tmpValue = array[i];
        array[i] = array[j];
        array[j] = tmpValue;
        swaps.push([i, j]);
      }
    }
    tmpValue = array[i+1];
    array[i+1] = array[end];
    array[end] = tmpValue;
    swaps.push([i+1, end]);
    return i+1;
}
function MergeSort(array, start=0, end=array.length-1, swaps=[]){
    if(start<end){
      const mid = Math.floor((start+end)/2);
      MergeSort(array, start, mid, swaps);
      MergeSort(array, mid+1, end, swaps);
      merge(array, start, end, mid, swaps);
    }
    return swaps;
}
function merge(array, start, end, mid, swaps){
    let i=start, j=mid+1, tmpValue;
    while(i<j && j<=end){
      if(array[i] <= array[j])
        i++;
      else{
        tmpValue = array[j];
        for(let x = j; x>i; x--){
          array[x] = array[x-1];
          swaps.push([x, x-1]);
        }
        array[i] = tmpValue;
        j++;
      }
    }
}
function isSorted(arr){
    return arr.every((v,i,a) => !i || a[i-1] <= v);
}
function animate(swaps, arrayBars, animationDelay, state){
    if(swaps.length == 0){
        state.isReady = true;
        return;
    }
    const [i, j] = swaps.shift();
    let tmpHeight = arrayBars[i].style.height;
    arrayBars[i].style.height = arrayBars[j].style.height;
    arrayBars[j].style.height = tmpHeight;
    setTimeout(function(){
      animate(swaps, arrayBars, animationDelay, state);
    }, animationDelay);
}