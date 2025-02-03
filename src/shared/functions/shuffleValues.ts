import { IAnswer } from "../types";

export function shuffleValues(
  array: IAnswer[],
): IAnswer[] {
  // Step 1: Extract all 'value' properties
  const values = array.map((item) => item.value);

  // Step 2: Shuffle the values using Fisher-Yates algorithm
  for (let i = values.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [values[i], values[j]] = [
      values[j],
      values[i],
    ];
  }

  // Step 3: Assign shuffled values back to the original keys
  return array.map((item, index) => ({
    ...item,
    value: values[index],
  }));
}
