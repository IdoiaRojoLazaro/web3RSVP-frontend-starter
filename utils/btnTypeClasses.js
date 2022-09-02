export function btnTypeClasses(type) {
  let btnClasses;
  if (type) {
    switch (type) {
      case "submit":
        btnClasses =
          "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-500 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500 m-5";
        break;
      case "cancel":
        btnClasses =
          "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-100 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500 mr-4";
        break;

      default:
        break;
    }
  }
  return btnClasses;
}
