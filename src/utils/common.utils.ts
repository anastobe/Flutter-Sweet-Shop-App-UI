import moment from "moment";
import { Alert, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
// import { CommonUtils, SD } from "../../utils";
// import Text from "../components/text";
// import { useTheme } from "../hooks";
import apis from "../services";
// import { NavigationService } from "../config";
import { HOME_ROUTES } from "../constants";

// const {AppTheme} = useTheme()

const IBAN_BASIC_REGEX = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/i;

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


function capitalizeFirstLetter(string: any) {
  if (!string) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const RegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


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
  return `${monthWithZero}-${dayWithZero}-${year}---${formattedTime}`;
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


const getInitials = (text: String) => {
  if (!text.trim()) return "";

  const parts = text?.trim().split(" ");
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
  console.log("play==>",input);
  
  if (!IBAN_BASIC_REGEX.test(iban)) return false;
  const numeric = ibanToNumericString(iban);
  return mod97(numeric) === 1;
}



export default {
  objectContainsKey,
  handleScrollToBottom,
  RegEmail,
  timeHumanize,
  // handleDynamicLinks,
  formatDateTime,
  updateThumbnailUrls,
  capitalizeFirstLetter,
  getInitials,
  validateIBAN
};