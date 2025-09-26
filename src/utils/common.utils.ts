import moment from "moment";
import { Alert, NativeScrollEvent, NativeSyntheticEvent } from "react-native";
// import { CommonUtils, SD } from "../../utils";
// import Text from "../components/text";
// import { useTheme } from "../hooks";
import apis from "../services";
// import { NavigationService } from "../config";
import { HOME_ROUTES } from "../constants";

// const {AppTheme} = useTheme()

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

/**
 * Will convert an array of objects into an object with
 * desired value as the key, can optianlly add or delete
 * values from original object as well while converting.
 */
function getObjectByKeys(
  arr: Array<Record<string, any>>,
  key: string = "id",
  deleteKey: string | null = null,
  addKeys: Record<string, any> | null = null
) {
  const obj: any = {};
  arr.forEach((val) => {
    obj[val[key]] = val;
    if (deleteKey) {
      delete obj[val[key]][deleteKey];
    }
    if (addKeys) {
      obj[val[key]] = {
        ...obj[val[key]],
        ...addKeys,
      };
    }
  });
  return obj;
}

/**
 * we can use Promise.allSettled as well but
 * due to less browser support added custom one.
 */
const promiseAllSettled = (promises: any) =>
  Promise.all(
    promises.map((p: any) =>
      p
        .then((value: any) => ({
          status: "fulfilled",
          value,
        }))
        .catch((reason: any) => ({
          status: "rejected",
          reason,
        }))
    )
  );

const RegEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const getSelectedIds = (array: any) => {
  return array
      .filter((tag: any) => tag.selected) // Filter objects where selected is true
      .map((tag: any )=> tag.id); // Map to get the ids of the filtered objects
};


const getSelectedInvitedFriendsIds = (array: any) => {
  return array
      .filter((tag: any) => tag.selected) // Filter objects where selected is true
      .map((tag: any )=> tag.friendId); // Map to get the ids of the filtered objects
};


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


// const handleDynamicLinks = async (link: any) => {
//   if (link) {
//     console.log('Foreground link handling:', link.url);

//     if (link.url.includes('PostPreview')) {
//       const ID = link.url.split('/').pop();  // Extract ID from the URL
//       let res = await apis.getPostDetail(ID)
//       NavigationService.navigate(HOME_ROUTES.PostPreview,{ openSheet: false, postObjectData: res?.data, objectId: ID  })
//     } 
//     else {
//       Alert.alert("will do")
//       // NavigationService.navigate(HOME_ROUTES.AddReviews);
//     }
//   }
// };


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

function removeTypeAndName(array) {
  return array.map(item => {
      const { type, name, ...rest } = item; // Destructure to remove type and name
      return rest;
  });
}


export default {
  objectContainsKey,
  handleScrollToBottom,
  getObjectByKeys,
  promiseAllSettled,
  RegEmail,
  getSelectedIds,
  getSelectedInvitedFriendsIds,
  timeHumanize,
  // handleDynamicLinks,
  formatDateTime,
  updateThumbnailUrls,
  removeTypeAndName
};