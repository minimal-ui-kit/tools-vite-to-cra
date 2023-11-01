export function multiReplace(input, replacements) {
  let output = input;

  for (const pattern in replacements) {
    if (replacements.hasOwnProperty(pattern)) {
      const regex = new RegExp(pattern, 'g');
      output = output.replace(regex, replacements[pattern]);
    }
  }
  return output;
}
