// react-navigation.d.ts
import '@react-navigation/native';

declare module '@react-navigation/native' {
  export interface Theme {
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;

      // default colors
      yellow: string;
      greenColor: string;
      starColor: string;
      orangeCol: string;
      red: string;
      blue: string;
      btnColor: string;
      T_White: string;
      darkModeBtnColor: string;
      T_txtColor: string;
      btnColordark: string;
      darkModeBackground: string;
      lightModeBackground: string;
      darkModeHighlight: string;
      lightModeHighlight: string;


      //dark and light mode colors
      White: string;
      Black: string;
      WhiteHalfOpacity08: string;
      WhiteHalfOpacity05: string;
      WhiteHalfOpacity04: string;
      WhiteHalfOpacity03: string;
      WhiteHalfOpacity02: string;
      WhiteHalfOpacity01: string;
      ImageBoarder: string;
      BgScreenCol: string;
      lightGrey: string;
      activityCont: string;
      txtColor: string;
      txtColor05: string;
      txtColor05_rgba: string;
      txtColor08: string;
      txtColor03: string;
      lineColor: string;
      txtColDarkGrey: string;
      Opacity08: string;
      Opacity08_Lighter: string;
      txtColDarkGrey2: string;
      txtColDarkGrey1: string;
      txtCol6: string;
      btnColorOpacity10: string;
      disableBtnCol: string;
      disableBtnCol2: string;
      disableBtnCol3: string;
      disableBtnCol4: string;
      modalBackColor: string;
      binBackCol_only: string;
      ConfrmBackCol_only: string;
      txtCol7: string;
      backgroundBtnCol: string;
      
    };
    dark: boolean; // Ensure the `dark` property is included
  }
}
