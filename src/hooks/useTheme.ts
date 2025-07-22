// import {DarkTheme, LightTheme, ThemeColors} from '../styles';

// import {ThemeTypes} from '../constants';
// import dataHandlerService from '../APICall/dataHandler.service';
// // import { useTypedSelector } from "./useTypedSelected";

// const useTheme = () => {
//   // const themeType: ThemeTypes = useTypedSelector(
//   //   (state) => state.theme.themeType
//   // );
//   let isDarkTheme = dataHandlerService?.getStore()?.getState()
//     ?.AuthReducer?.themeType;

//   // console.log("-=----======>",isDarkTheme);

//   // const isDarkThemevalue: boolean = isDarkTheme === ThemeTypes.Dark;
//   // const isDarkTheme = ThemeTypes.Dark;

//   const AppTheme = {
//     ...(isDarkTheme
//       ? {...DarkTheme, ...ThemeColors}
//       : {...LightTheme, ...ThemeColors}),
//     // ...ThemeColors,
//     // ...DarkTheme,
//   };

//   // const AppLogo = require("../assets/images/app-logo.png");

//   // return { isDarkTheme, AppTheme, themeType };
//   return {isDarkTheme, AppTheme};
// };

// export {useTheme};
