// calculate array of means of array values every interval_length steps: 
export function groupby_intervals_mean(arr, interval_length) {
    const res_len = Math.ceil(arr.length / interval_length);
    let res = new Array(res_len).fill(0);
    // in case the last few intervals are less than n:
    let n_ints = new Array(res_len).fill(0);
    for (let i = 0; i < arr.length; i++) {
        let res_idx = Math.floor(i / interval_length);
        res[res_idx] += arr[i];
        n_ints[res_idx] += 1;
    }
    return divide_arrays(res, n_ints);
}

// cellwise arr1 / arr2:
function divide_arrays(arr1, arr2) {
    return arr1.map(function (num, idx) {
        return num / arr2[idx];
      });
}

// https://stackoverflow.com/a/12987776
export function sampleWithoutReplace(array) {
    var randomIndex = Math.floor(Math.random() * array.length);
    return array.splice(randomIndex, 1)[0];

}