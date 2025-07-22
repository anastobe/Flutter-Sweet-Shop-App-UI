// import { Linking } from 'react-native';
// import {Images} from '../config';

// const clientFilterKey =
// [{id: 0, filterKey: 'PLANZEE', name: 'My Planzee'},{id: 1, filterKey: 'NEW', name: 'New'},{id: 2, filterKey: 'TRENDING', name: 'Trending'},{id: 3, filterKey: 'NEARBY', name: 'Nearby'}]

// const HomePostData = [
//   {
//     id: 0,
//     userDetail: {
//       id: '1218201829',
//       userName: 'Audrey',
//       userImage: Images.dummyImage1,
//     },
//     location: 'Eiffel Tower',
//     timeAgo: `2 hour ago`,
//     content:
//       'ivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non mauris. Aenean scelerisque, sem eu dictum commodo, velit nisi blandit magna, quis scelerisque ipsum lectus ut libero. Sed elit diam, dignissim ac congue quis,',
//     likeCount: 2565,
//     commentCount: 202,
//     isLike: false,
//     shareCount: 2,
//     postImage: [
//       { type: 'video', uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnailImage: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
//       { type: 'video', uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnailImage: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
//       { type: 'image', uri: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri: 'https://images.pexels.com/photos/23092320/pexels-photo-23092320/free-photo-of-a-street-with-a-church-tower-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'video', uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", thumbnailImage: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
//       { type: 'image', uri: 'https://images.pexels.com/photos/23285770/pexels-photo-23285770/free-photo-of-man-picking-up-a-woman-while-standing-ankles-deep-in-the-sea.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri: 'https://images.pexels.com/photos/15986593/pexels-photo-15986593/free-photo-of-traffic-in-city.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//     ],
//   },
//   {
//     id: 1,
//     userDetail: {
//       id: '1218201829',
//       userName: 'Drim',
//       userImage: Images.dummyImage1,
//     },
//     location: 'Eiffel Tower',
//     timeAgo: `2 hour ago`,
//     content:
//       'ivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non mauris. Aenean scelerisque, sem eu dictum commodo, velit nisi blandit magna, quis scelerisque ipsum lectus ut libero. Sed elit diam, dignissim ac congue quis,',
//     likeCount: 2565,
//     commentCount: 202,
//     isLike: true,
//     shareCount: 2,
//     postImage: [
//       { type: 'image', uri: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'video', uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4', thumbnailImage: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
//       { type: 'image', uri: 'https://images.pexels.com/photos/23285770/pexels-photo-23285770/free-photo-of-man-picking-up-a-woman-while-standing-ankles-deep-in-the-sea.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri:  'https://images.pexels.com/photos/15986593/pexels-photo-15986593/free-photo-of-traffic-in-city.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri: 'https://images.pexels.com/photos/23092320/pexels-photo-23092320/free-photo-of-a-street-with-a-church-tower-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//     ],
//   },
//   {
//     id: 2,
//     userDetail: {
//       id: '1218201829',
//       userName: 'Audrey H3',
//       userImage: Images.dummyImage2,
//     },
//     location: 'Eiffel Tower',
//     timeAgo: `2 hour ago`,
//     content:
//       'ivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non mauris. Aenean scelerisque, sem eu dictum commodo, velit nisi blandit magna, quis scelerisque ipsum lectus ut libero. Sed elit diam, dignissim ac congue quis,',
//     likeCount: 2565,
//     commentCount: 202,
//     isLike: true,
//     shareCount: 2,
//     postImage: [
//       { type: 'video', uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", thumbnailImage: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
//     ],
//   },
//   {
//     id: 3,
//     userDetail: {
//       id: '1218201829',
//       userName: 'simson',
//       userImage: Images.UserImg,
//     },
//     location: 'Eiffel Tower',
//     timeAgo: `2 hour ago`,
//     content:
//       'ivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non mauris. Aenean scelerisque, sem eu dictum commodo, velit nisi blandit magna, quis scelerisque ipsum lectus ut libero. Sed elit diam, dignissim ac congue quis,',
//     likeCount: 2565,
//     commentCount: 202,
//     isLike: false,
//     shareCount: 2,
//     postImage: [
//       { type: 'image', uri: 'https://images.pexels.com/photos/23092320/pexels-photo-23092320/free-photo-of-a-street-with-a-church-tower-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//     ],
//   },
//   {
//     id: 4,
//     userDetail: {
//       id: '1218201829',
//       userName: 'dreak',
//       userImage: Images.dummyImage1,
//     },
//     location: 'Eiffel Tower',
//     timeAgo: `2 hour ago`,
//     content:
//       'ivamus eget aliquam dui. Integer eu arcu vel arcu suscipit ultrices quis non mauris. Aenean scelerisque, sem eu dictum commodo, velit nisi blandit magna, quis scelerisque ipsum lectus ut libero. Sed elit diam, dignissim ac congue quis,',
//     likeCount: 2565,
//     commentCount: 202,
//     isLike: true,
//     shareCount: 2,
//     postImage: [
//       { type: 'image', uri: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'video', uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", thumbnailImage: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
//       { type: 'image', uri: 'https://images.pexels.com/photos/23285770/pexels-photo-23285770/free-photo-of-man-picking-up-a-woman-while-standing-ankles-deep-in-the-sea.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri:  'https://images.pexels.com/photos/15986593/pexels-photo-15986593/free-photo-of-traffic-in-city.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri: 'https://images.pexels.com/photos/23092320/pexels-photo-23092320/free-photo-of-a-street-with-a-church-tower-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'video', uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', thumbnailImage: 'https://images.pexels.com/photos/22855935/pexels-photo-22855935/free-photo-of-a-blonde-woman-in-a-green-sweater-smiling.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load' },
//       { type: 'image', uri: 'https://images.pexels.com/photos/23285770/pexels-photo-23285770/free-photo-of-man-picking-up-a-woman-while-standing-ankles-deep-in-the-sea.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri:  'https://images.pexels.com/photos/15986593/pexels-photo-15986593/free-photo-of-traffic-in-city.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//       { type: 'image', uri: 'https://images.pexels.com/photos/23092320/pexels-photo-23092320/free-photo-of-a-street-with-a-church-tower-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'},
//     ],

//   },

// ];


// export {
//   clientFilterKey,
//   HomePostData,

// };
