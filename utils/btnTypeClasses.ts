export enum BtnTypes {
  CANCEL = 'cancel',
  ICON = 'icon',
  DEFAULT = 'default',
  OUTLINE = 'outline',
  SUBMIT = 'submit'
}

export function btnTypeClasses(type: BtnTypes) {
  let btnClasses;
  let btnBasicClasses = "max-w-fit p-2 rounded-md hover:ring-2 hover:ring-gray-300 shadow-sm transition-all";
  let disabledClasses = "disabled:bg-antiqueBlue-100 disabled:text-gray-600 disabled:border-antiqueBlue-200";
  // "bg-transparent hover:bg-antiqueBlue-100 dark:hover:bg-antiqueBlue-50 transition-all"
  if (type) {
    switch (type) {
      case BtnTypes.DEFAULT:
        btnClasses =
          "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-500 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500 m-5";
        break;
      case BtnTypes.ICON:
        btnClasses =
          "border p-1 hover:bg-antiqueBlue-100";
        break;
      case BtnTypes.OUTLINE:
        btnClasses =
          "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-500 transition-all hover:bg-antiqueBlue-50 hover:border-antiqueBlue-200 hover:text-antiqueBlue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500 m-5 dark:text-white dark:hover:bg-antiqueBlue-700";
        break;
      case BtnTypes.SUBMIT:
        // btnClasses =
        //   "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-100 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500 mr-4 bg-antiqueBlue-400";
        btnClasses = "bg-stoneBlue-400 text-white hover:bg-stoneBlue-600 px-4 py-2";
        break;
      case BtnTypes.CANCEL:
        btnClasses =
          "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-100 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500 mr-4";
        break;

      default:
        break;
    }
  }
  return `${btnBasicClasses} ${btnClasses} ${disabledClasses}`;
}
