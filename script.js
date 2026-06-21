function calculateMinCost() {
  // 1. Fetch the input value from the DOM
  const inputElement = document.getElementById("rope-lengths");
  const resultElement = document.getElementById("result");
  
  const inputText = inputElement.value.trim();
  
  // Handle empty input case
  if (!inputText) {
    resultElement.innerText = "Please enter some rope lengths.";
    return;
  }

  // 2. Parse the comma-separated string into an array of numbers
  let ropes = inputText.split(",")
                       .map(num => parseInt(num.trim(), 10))
                       .filter(num => !isNaN(num));

  // If there are fewer than 2 ropes, no cost is incurred
  if (ropes.length <= 1) {
    resultElement.innerText = "0";
    return;
  }

  // 3. Sort the ropes initially in ascending order
  ropes.sort((a, b) => a - b);

  let totalCost = 0;

  // 4. Repeatedly combine the two smallest ropes until only one remains
  while (ropes.length > 1) {
    // Take the two smallest ropes
    const first = ropes.shift();
    const second = ropes.shift();

    // The cost to connect them
    const cost = first + second;
    totalCost += cost;

    // Insert the newly formed rope back into the sorted array
    // Binary search insertion to keep it efficient, or simple findIndex
    let insertIndex = ropes.findIndex(num => num > cost);
    if (insertIndex === -1) {
      ropes.push(cost); // If it's the largest, push to the end
    } else {
      ropes.splice(insertIndex, 0, cost); // Insert at the correct sorted position
    }
  }

  // 5. Output the result to the DOM
  resultElement.innerText = totalCost;
}