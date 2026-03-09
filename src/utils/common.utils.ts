import {  NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import * as Keychain from "react-native-keychain";
import moment from "moment";
// import { CommonUtils, SD } from "../../utils";
// import Text from "../components/text";
// import { useTheme } from "../hooks";
import apis from "../services";
// import { NavigationService } from "../config";
import { HOME_ROUTES } from "../constants";
import ReactNativeBlobUtil from 'react-native-blob-util';
import { Platform, Alert } from 'react-native';
import ReactNativeBiometrics from "react-native-biometrics";

// const {AppTheme} = useTheme()

const IBAN_BASIC_REGEX = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/i;
const SWIFT_REGEX = /^[A-Z]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/;

const MAX_LENGTH_10 = 10;

  const rnBiometrics = new ReactNativeBiometrics();

const objectContainsKey = (
  object: Record<string | number, any>,
  key: number | string
) => {
  return typeof object === "object" && object && object[key] !== undefined;
};

const handleScrollToBottom = (
  event: NativeSyntheticEvent<NativeScrollEvent>,
  onEndReached: () => void
) => {
  const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
  const scrollThreshold = 0.9; // 10% before reaching the bottom
  if (
    contentOffset.y + layoutMeasurement.height >=
    scrollThreshold * contentSize.height
  ) {
    onEndReached();
  }
};

function formatDate(date: any) {
  if (!date) return '';

  const d = new Date(date); // 👈 STRING → DATE

  const formattedDate = d.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return formattedDate;
}

// function formatTime(date: any) {
//   if (!date) return '';

//   const d = new Date(date);

//   return d.toLocaleTimeString('en-US', {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//   });
// }

function formatTime(date: any) {
  if (!date) return '';

  const d = new Date(date); // 👈 VERY IMPORTANT

  const formattedDate = d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  return formattedDate;
}

export const saveToKeychain = async (service: string, value: string) => {
  await Keychain.setGenericPassword("app", value, {
    service, // 👈 different slot
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
  });
};

export const getFromKeychain = async (service: string) => {
  const creds = await Keychain.getGenericPassword({ service });
  return creds ? creds.password : null;
};

export const checkDeviceBiometric = async () => {
  try {
    const result = await rnBiometrics.isSensorAvailable();

    if (!result.available) {
      return {
        hardware: false,
        configured: false,
        type: null,
      };
    }

    return {
      hardware: true,
      configured: true,
      type: result.biometryType,
    };
  } catch (e) {
    return {
      hardware: false,
      configured: false,
      type: null,
    };
  }
};

export const getCurrencySymbol = (
  currencyCode: string,
  locale: string = 'en-US',
) => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    })
      .formatToParts(1)
      .find(part => part.type === 'currency')?.value ?? currencyCode;
  } catch (e) {
    // fallback if invalid code / locale
    return currencyCode;
  }
};


function capitalizeFirstLetter(string: any) {
  if (!string) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function smallFirstLetter(string: any) {
  if (!string) {
    return "";
  }
  return string.charAt(0).toLowerCase() + string.slice(1);
}

const firstCapitaAllSmall = (text?: string) => {
  if (!text) return '';
  return text[0].toUpperCase() + text.slice(1).toLowerCase();
};

const RegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const RegixNumbersOnly = /^[0-9]+$/

const timeHumanize = (time: string): string => {
  const now = moment();
  const then = moment(time);
  const diffInMinutes = now.diff(then, 'minutes');

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}m${diffInMinutes === 1 ? '' : ''}`;
  } else if (diffInMinutes < 1440) {
    const hours = Math.floor(diffInMinutes / 60);
    return `${hours}h${hours === 1 ? '' : ''} `;
  } else if (now.clone().subtract(7, 'days').isSameOrBefore(then, 'day')) {
    return `${now.diff(then, 'd')}d${now.diff(then, 'days') === 1 ? '' : ''}`;
  } else if (now.year() === then.year()) {
    return then.format('MMM D');
  } else {
    return then.format('MMM D, YYYY');
  }
};

export const getRemainingMs = (expiryISO: string) => {
  const now = Date.now();
  const expiry = new Date(expiryISO).getTime();
  return Math.max(expiry - now, 0);
};


export const isTimeRemaining = (
  challenge_expiry_datetime?: string,
  debug = true
): boolean => {
  if (!challenge_expiry_datetime) {
    // debug && console.log('EXPIRY CHECK ❌ no expiry provided');
    return false;
  }

  const now = Date.now();
  const expiryTime = new Date(challenge_expiry_datetime).getTime();

  if (isNaN(expiryTime)) {
    // debug && console.log('EXPIRY CHECK ❌ invalid date');
    return false;
  }

  const isValid = now <= expiryTime;

  // debug &&
  //   console.log('EXPIRY CHECK ✅', {
  //     now: new Date(now).toLocaleString(),
  //     expiry: new Date(expiryTime).toLocaleString(),
  //     valid: isValid,
  //   });

  return isValid;
};

function formatDateTime(inputTime: any) {
  const date = new Date(inputTime);

  // Define month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Extract date components
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  

  // Extract time components
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0'); // Extract and format seconds
  const ampm = hours >= 12 ? 'pm' : 'am';

  // Convert hours from 24-hour to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'

  // Format time string
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  let dayWithZero = day < 10 ? `0${day}` : `${day}`
  let monthWithZero = month < 10 ? `0${month}` : `${month}`

  // Return formatted date and time string
  return `${monthWithZero}-${dayWithZero}-${year}    ${formattedTime}`;
}


function updateThumbnailUrls(array) {
  // Separate video and image items
  const videos = array.filter(item => item.type === 'VIDEO');
  const images = array.filter(item => item.type === 'IMAGE');

  // Iterate over each image item to update the corresponding video
  images.forEach(image => {
      // Extract the relevant name part to search for
      const imageNameParts = image.name.split('---');
      if (imageNameParts.length > 1) {
          const imageNamePart = imageNameParts[1];
          // Find the matching video
          const foundVideo = videos.find(video => video.name.includes(imageNamePart));

          if (foundVideo) {
              // Update the thumbnail URL of the video
              foundVideo.thumbNaillUrl = image.thumbNaillUrl;
          }
      }
  });

  // Find images that did not match any videos
  const unmatchedImages = images.filter(image => {
      const imageNameParts = image.name.split('---');
      if (imageNameParts.length > 1) {
          const imageNamePart = imageNameParts[1];
          return !videos.some(video => video.name.includes(imageNamePart));
      }
      return true;
  });

  // Concatenate updated videos with unmatched images
  return [...videos, ...unmatchedImages];
}

const formatExpiry = (expiry: string) => {
  const month = expiry.slice(0, 2);
  const year = expiry.slice(2, 4);

  return `${month} / ${year}`;
};


const getInitials = (text: String) => {
  if (!text?.trim()) return "";

  const parts = text?.trim()?.split(" ");
  const firstInitial = parts[0]?.[0]?.toUpperCase() || "";
  const secondInitial = parts[1]?.[0]?.toUpperCase() || "";

  return firstInitial + secondInitial;
};


function ibanClean(input: any) {
  return (input || '').replace(/\s+/g, '').toUpperCase();
}

function ibanToNumericString(iban: any) {
  // Move first 4 chars to end
  const rearr = iban.slice(4) + iban.slice(0,4);
  // Replace letters with numbers: A=10, B=11, ... Z=35
  let result = '';
  for (let ch of rearr) {
    if (ch >= 'A' && ch <= 'Z') {
      result += (ch.charCodeAt(0) - 55).toString(); // 'A'.charCodeAt(0)=65 -> 65-55=10
    } else {
      result += ch;
    }
  }
  return result;
}

// compute mod97 on a very large number present as string
function mod97(numberString: any) {
  let remainder = 0;
  for (let i = 0; i < numberString.length; i += 7) {
    // take chunk of up to 7 digits to keep number small
    const chunk = remainder.toString() + numberString.substring(i, i + 7);
    remainder = parseInt(chunk, 10) % 97;
  }
  return remainder;
}

export function validateIBAN(input: any) {
  const iban = ibanClean(input);
  // console.log("play==>",input);
  
  if (!IBAN_BASIC_REGEX.test(iban)) return false;
  const numeric = ibanToNumericString(iban);
  return mod97(numeric) === 1;
}

export function validateBIC(input: string) {
  if (!input) return false;

  const bic = input.trim().toUpperCase();
  return SWIFT_REGEX.test(bic);
}

const downloadFile = async (
  url: string,
  onSuccess?: () => void,
  onError?: () => void,
) => {
  try {
    const { fs, config } = ReactNativeBlobUtil;

    const fileName =
      url.split('/').pop()?.split('?')[0] || `file_${Date.now()}`;

    const downloadPath =
      Platform.OS === 'android'
        ? `${fs.dirs.DownloadDir}/${fileName}`
        : `${fs.dirs.DocumentDir}/${fileName}`;

    const res = await config({
      fileCache: true,
      path: downloadPath,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: downloadPath,
        title: fileName,
        description: 'Downloading attachment...',
        mediaScannable: true,
      },
    }).fetch('GET', url);

    // console.log('Download success:', res.path());

    Alert.alert('Success', `File downloaded to:\n${res.path()}`);
    onSuccess?.();
  } catch (error) {
    // console.log('Download error:', error);
    Alert.alert('Error', 'Download failed');
    onError?.();
  }
};


export default {
  objectContainsKey,
  handleScrollToBottom,
  RegEmail,
  RegixNumbersOnly,
  timeHumanize,
  // handleDynamicLinks,
  formatDateTime,
  updateThumbnailUrls,
  capitalizeFirstLetter,
  smallFirstLetter,
  getInitials,
  validateIBAN,
  isTimeRemaining,
  getRemainingMs,
  validateBIC,
  MAX_LENGTH_10,
  formatDate,
  formatTime,
  getCurrencySymbol,
  firstCapitaAllSmall,
  downloadFile,
  saveToKeychain,
  getFromKeychain,
  checkDeviceBiometric,
  formatExpiry

};

