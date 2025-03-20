// Function to truncate text to a specified number of words
// Function to truncate text to a specified number of words while preserving HTML tags
export const truncateText = (html, limit) => {

  const regex = /(<([^>]+)>)/gi; // Regex to match HTML tags
  const plainText = html.replace(regex, " ").trim(); // Remove HTML tags and trim whitespace
  const words = plainText.split(" ");
  
  if (words.length > limit) {
    return words.slice(0, limit).join(" ") + " ...";
  } else {
    return html;
  }

};
