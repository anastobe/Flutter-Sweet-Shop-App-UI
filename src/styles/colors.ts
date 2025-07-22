export enum ThemeColors {
  // Colors consistent across both themes
  yellow = '#FFDE08', // retained for contrast
  greenColor = '#3cefa1', // consistent green
  starColor = '#ffdd09', // star rating color consistent
  orangeCol = '#EA6228', // bright orange
  red = '#ff0000', // slightly muted but consistent
  blue = '#0077FF', // vibrant blue
  btnColor = '#008080', // teal color remains consistent

  T_White = '#FFF',
  T_Black = '#000',
  darkModeBtnColor = '#099E9E',
  T_txtColor = '#292b34', //designer or ya ha ==> rgb 41,43,52
  btnColordark = '#8E8E9327',
  darkModeBackground = '#303030', // dark gray for dark mode background
  lightModeBackground = '#E1E9EE', // light grayish-blue for light mode background
  darkModeHighlight = '#4A4A4A', // medium-dark gray for dark mode highlight
  lightModeHighlight = '#F2F8FC', // very light blue for light mode highligh

}

export enum LightTheme {
  White = '#FFF',
  Black = '#000',
  WhiteHalfOpacity08 = '#rgba(255,255,255,0.8)', //white color 0.5 opacity added by me
  WhiteHalfOpacity05 = '#rgba(255,255,255,0.5)', //white color 0.5 opacity added by me
  WhiteHalfOpacity04 = '#rgba(255,255,255,0.4)', //white color 0.4 opacity added by me
  WhiteHalfOpacity03 = '#rgba(255,255,255,0.3)', //white color 0.3 opacity added by me
  WhiteHalfOpacity02 = '#rgba(255,255,255,0.2)', //white color 0.2 opacity added by me
  WhiteHalfOpacity01 = '#rgba(26,26,26,0.5)', //white color 0.2 opacity added by me
  ImageBoarder = '#rgba(255, 255, 255, 0.502)',
  BgScreenCol = '#f7f7fa', //ok i added rgb 247,247,250
  lightGrey = '#D9D9D9', //ok i added rgb 247,247,250
  activityCont = '#FAFAFA',
  txtColor = '#292b34', //designer or ya ha ==> rgb 41,43,52
  txtColor05 = '#292b3480', //designer or ya ha ==> rgb 41,43,52 0.5 opacity added by me
  txtColor05_rgba = '#rgba(255,255,255,0.5)', //designer or ya ha ==> rgb 41,43,52 0.5 opacity added by me
  txtColor08 = '#292b34cc',
  txtColor03 = '#dfdfe0', //ok i added rgb 147,148,152
  lineColor = '#bfbfbf4d',
  txtColDarkGrey = '#87888C', //designer or ya ha ==> rgb 26,25,28 opacity 60% and rgb 142, 142, 147, 1
  // Opacity05= #B0B1B47F,
  Opacity08 = '#B0B1B4CC',
  Opacity08_Lighter = '#D0D1D4CC',
  txtColDarkGrey2 = '#278182', //designer or ya ha ==> rgb 26,25,28 opacity 60% and rgb 142, 142, 147, 1
  txtColDarkGrey1 = '#1a191c99', //designer or ya ha ==> rgb 26,25,28 opacity 60%
  txtCol6 = '#5e5d5f', //added not in design add using color picker
  btnColorOpacity10 = '#0080801a',
  disableBtnCol = '#e0ebee',
  disableBtnCol2 = '#d4d4d6',
  disableBtnCol3 = '#e7e7ea',
  disableBtnCol4 = '#efefef',
  modalBackColor = '#1a1a1a80', //back color modal
  binBackCol_only = '#ffe5e6', //single color
  ConfrmBackCol_only = '#e6f2f2', //single color
  txtCol7 = '#1a191c', //single color
  backgroundBtnCol = '#f3f3f4', //single color
}

export enum DarkTheme {
  White = '#2A2C38', // replaced white with dark color
  Black = '#13131B', // kept black as is or can use another dark tone if needed
  WhiteHalfOpacity08 = '#rgba(255,255,255,0.8)', //white color 0.5 opacity added by me    //channged
  WhiteHalfOpacity05 = '#rgba(255,255,255,0.5)', //white color 0.5 opacity added by me    //channged
  WhiteHalfOpacity04 = '#rgba(255,255,255,0.4)', //white color 0.4 opacity added by me    //channged
  WhiteHalfOpacity03 = '#rgba(255,255,255,0.3)', //white color 0.3 opacity added by me    //channged
  WhiteHalfOpacity02 = '#rgba(255,255,255,0.2)', //white color 0.2 opacity added by me    //channged
  ImageBoarder = 'rgba(42, 44, 56, 0.5)', // adjusted color for image border
  BgScreenCol = '#13131B', // dark background color
  lightGrey = '#5e5e5e', // changed to a darker grey tone
  activityCont = '#2A2C38', // changed to darker base color
  txtColor = '#fff', // light text color on dark background
  txtColor05 = 'rgba(255,255,255,0.5)', // light color with 0.5 opacity
  txtColor05_rgba = 'rgba(255,255,255,0.5)', // same as above
  txtColor08 = 'rgba(250,250,250,0.8)', // light color with 0.8 opacity
  txtColor03 = '#BFBFBF', // adjusted to a lighter grey
  lineColor = 'rgba(191,191,191,0.3)', // lighter line color with transparency
  txtColDarkGrey = '#87888C', // kept consistent or could darken further
  Opacity08 = 'rgba(176,177,180,0.8)', // adjusted to match dark theme tone
  Opacity08_Lighter = 'rgba(208,209,212,0.8)', // lighter tone variant
  txtColDarkGrey2 = '#278182', // kept same for contrast purposes
  txtColDarkGrey1 = '#87888C', // adjusted for consistent opacity on dark bg
  txtCol6 = '#f4f4f4', // changes
  btnColorOpacity10 = 'rgba(0,128,128,0.1)', // adjusted for consistent transparency
  disableBtnCol = '#5e5e5e', // darker tone for disabled buttons
  disableBtnCol2 = '#4e4e4e', // further darkened
  disableBtnCol3 = '#3e3e3e', // even darker
  disableBtnCol4 = '#2e2e2e', // darkest disabled state
  modalBackColor = 'rgba(19,19,27,0.5)', // semi-transparent dark background
  binBackCol_only = '#4e4e4e', // adjusted to a darker shade
  ConfrmBackCol_only = '#3e3e3e', // darkened variant
  txtCol7 = '#FAFAFA', // light text for dark mode
  backgroundBtnCol = '#2A2C38', // background color adjusted for dark mode
}