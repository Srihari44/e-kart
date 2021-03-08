export default function FindColor(category) {
  let colorObj = {
    blue: ["#eff7ff", "#4c75f2"],
    pink: ["#db558120", "#db5581"],
    purple: ["#e3e2f3", "#201aa2dd"],
    orange: ["#ffefe2", "#fd7e14"],
    green: ["#28a74520", "#28a745"],
    brown: ["#b6854d10", "#b6854d"],
    yellow: ["#fff7e0", "#ffc107"],
  };
  let randNo = Math.floor(Math.random() * 7);
  switch (category) {
    case "Men Clothing":
      return [colorObj.blue[0], colorObj.blue[1]];
    case "Women Clothing":
      return [colorObj.pink[0], colorObj.pink[1]];
    case "Electronics":
      return [colorObj.purple[0], colorObj.purple[1]];
    case "Jewelery":
      return [colorObj.orange[0], colorObj.orange[1]];
    default:
      return [
        colorObj[Object.keys(colorObj)[randNo]][0],
        colorObj[Object.keys(colorObj)[randNo]][1],
      ];
  }
}
