function quickSort(arr, left=0, right=arr.length-1) {
    if(left < right) {
        let pivotIndex = pivot(arr, left, right);
        quickSort(arr, left, pivotIndex-1);
        quickSort(arr, pivotIndex+1, right);
    }
    return arr;
}

function pivot(arr, start=0, end=arr.length-1) {
    let pivot = arr[start];
    let pivotIndex = start;

    for(let i = start + 1; i <= end; i++) {
        if(pivot > arr[i]) {
            pivotIndex++;
            swap(arr, pivotIndex, i);
        }
    }
    swap(arr, start, pivotIndex);

    return pivotIndex;
}

function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log(quickSort([5, 2, 1, 8, 4, 7, 6, 3]));
console.log(quickSort([4, 6, 9, 1, 2, 5]));