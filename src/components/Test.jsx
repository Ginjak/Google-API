import React, { useEffect, useState } from "react";
import { createPlace } from "../services/apiPlaces";
import toast, { Toaster } from "react-hot-toast";
import { dataObject } from "./data";

export default function Test() {
  // const data = {
  //   address_components: [
  //     {
  //       long_name: "142",
  //       short_name: "142",
  //       types: ["street_number"],
  //     },
  //     {
  //       long_name: "Birkenhead Avenue",
  //       short_name: "Birkenhead Ave.",
  //       types: ["route"],
  //     },
  //     {
  //       long_name: "Kingston upon Thames",
  //       short_name: "Kingston upon Thames",
  //       types: ["postal_town"],
  //     },
  //     {
  //       long_name: "Greater London",
  //       short_name: "Greater London",
  //       types: ["administrative_area_level_2", "political"],
  //     },
  //     {
  //       long_name: "England",
  //       short_name: "England",
  //       types: ["administrative_area_level_1", "political"],
  //     },
  //     {
  //       long_name: "United Kingdom",
  //       short_name: "GB",
  //       types: ["country", "political"],
  //     },
  //     {
  //       long_name: "KT2 6RT",
  //       short_name: "KT2 6RT",
  //       types: ["postal_code"],
  //     },
  //   ],
  //   adr_address:
  //     '<span class="street-address">142 Birkenhead Avenue</span>, <span class="locality">Kingston upon Thames</span> <span class="postal-code">KT2 6RT</span>, <span class="country-name">UK</span>',
  //   business_status: "OPERATIONAL",
  //   current_opening_hours: {
  //     open_now: true,
  //     periods: [
  //       {
  //         close: {
  //           date: "2024-09-15",
  //           day: 0,
  //           time: "2000",
  //         },
  //         open: {
  //           date: "2024-09-15",
  //           day: 0,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           date: "2024-09-16",
  //           day: 1,
  //           time: "2000",
  //         },
  //         open: {
  //           date: "2024-09-16",
  //           day: 1,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           date: "2024-09-17",
  //           day: 2,
  //           time: "2000",
  //         },
  //         open: {
  //           date: "2024-09-17",
  //           day: 2,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           date: "2024-09-18",
  //           day: 3,
  //           time: "2000",
  //         },
  //         open: {
  //           date: "2024-09-18",
  //           day: 3,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           date: "2024-09-19",
  //           day: 4,
  //           time: "2000",
  //         },
  //         open: {
  //           date: "2024-09-19",
  //           day: 4,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           date: "2024-09-20",
  //           day: 5,
  //           time: "2000",
  //         },
  //         open: {
  //           date: "2024-09-20",
  //           day: 5,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           date: "2024-09-21",
  //           day: 6,
  //           time: "2000",
  //         },
  //         open: {
  //           date: "2024-09-21",
  //           day: 6,
  //           time: "0800",
  //         },
  //       },
  //     ],
  //     weekday_text: [
  //       "Monday: 8:00 AM – 8:00 PM",
  //       "Tuesday: 8:00 AM – 8:00 PM",
  //       "Wednesday: 8:00 AM – 8:00 PM",
  //       "Thursday: 8:00 AM – 8:00 PM",
  //       "Friday: 8:00 AM – 8:00 PM",
  //       "Saturday: 8:00 AM – 8:00 PM",
  //       "Sunday: 8:00 AM – 8:00 PM",
  //     ],
  //   },
  //   formatted_address: "142 Birkenhead Ave., Kingston upon Thames KT2 6RT, UK",
  //   formatted_phone_number: "07961 878704",
  //   geometry: {
  //     location: {
  //       lat: 51.4116902,
  //       lng: -0.2931109,
  //     },
  //     viewport: {
  //       northeast: {
  //         lat: 51.4130816802915,
  //         lng: -0.291759769708498,
  //       },
  //       southwest: {
  //         lat: 51.4103837197085,
  //         lng: -0.2944577302915021,
  //       },
  //     },
  //   },
  //   icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png",
  //   icon_background_color: "#7B9EB0",
  //   icon_mask_base_uri:
  //     "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
  //   international_phone_number: "+44 7961 878704",
  //   name: "L.A. Painters and Decorators",
  //   opening_hours: {
  //     open_now: true,
  //     periods: [
  //       {
  //         close: {
  //           day: 0,
  //           time: "2000",
  //         },
  //         open: {
  //           day: 0,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           day: 1,
  //           time: "2000",
  //         },
  //         open: {
  //           day: 1,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           day: 2,
  //           time: "2000",
  //         },
  //         open: {
  //           day: 2,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           day: 3,
  //           time: "2000",
  //         },
  //         open: {
  //           day: 3,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           day: 4,
  //           time: "2000",
  //         },
  //         open: {
  //           day: 4,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           day: 5,
  //           time: "2000",
  //         },
  //         open: {
  //           day: 5,
  //           time: "0800",
  //         },
  //       },
  //       {
  //         close: {
  //           day: 6,
  //           time: "2000",
  //         },
  //         open: {
  //           day: 6,
  //           time: "0800",
  //         },
  //       },
  //     ],
  //     weekday_text: [
  //       "Monday: 8:00 AM – 8:00 PM",
  //       "Tuesday: 8:00 AM – 8:00 PM",
  //       "Wednesday: 8:00 AM – 8:00 PM",
  //       "Thursday: 8:00 AM – 8:00 PM",
  //       "Friday: 8:00 AM – 8:00 PM",
  //       "Saturday: 8:00 AM – 8:00 PM",
  //       "Sunday: 8:00 AM – 8:00 PM",
  //     ],
  //   },
  //   photos: [
  //     {
  //       height: 3024,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q7uixUrmUF9EHTm6L048oyfEfWGT6RtnCuV64f1MuKrkABPseblJoUWbWkZVAmBWc3oFFnJfqlwi-SbaRTXj7QlVovnpo53Yh7zDUa66MyNqwvY8pEIGSW2gHNGMytGLhmKCp1olUEP-e43MK91Pe5l1l0NZzkk3nS6do3OzgrS0qOd",
  //       width: 4032,
  //     },
  //     {
  //       height: 4032,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q7WP5D1rJr7UHU6rAaYS7D36kLFpO3HvbCZ25QUUzqANHLBF60TL9l6qX3GMdwwSl7zIAX5gm6HbotKKMx4ToDYP2xf9gdCsCAwQLmt8zih69jcTk6C480eck078oOnZ0CTljv11PJzR_hkphDNPGTcHOczQT_Q8A7XMmUUERYFz65j",
  //       width: 3024,
  //     },
  //     {
  //       height: 4032,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q6gIsyQ16KndJmjQCCNlX61xUhPrz7ExbC1SQ2MIyQ6KqF-Y5E1r3AvNDFryTfvUEeUt-Ne5dz1UKNYOZ6yXpcoxP98i9elGB-Fbbrf36Gso_QBqw7ZFZ18oeyOlZXWkirutKduwZkYU_OEFM4-MbVOsBMXhfTktO7_jRPKyVEwr-8n",
  //       width: 3024,
  //     },
  //     {
  //       height: 4032,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q6W13qNLLGsSJMWxHksXjlpNJb-PBE8-wTTMw8zHAmbFTr5u-UjIQT9sgAmPqExKhUJ-PA3pQYaktVwiFRqZ9u8YKecr8f2Vft5FiwDwtfk8FM8oP3qWDSWrthWSgx8xx0xheTLiYgof9VbvIE-VJv4RYUoqwrkvMXS6e1CQUNwIlUF",
  //       width: 3024,
  //     },
  //     {
  //       height: 1131,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/103359561296530163750">L Powell</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q6E3ljIfjd11rBbulECPvkATl8yGInqYVLRmjJE06t2aU85v9IQD3FYHzMlh55h4Xc1mn9VEQNrtS8mD2v5g7MR7MntkEW11K-eRROpshMlXXxOcxhk7QzIYaU81b46Wv1YQr73ZFKa70yZUQPFf-7QceKvs1d9dykIHB3EEFQUy1lo",
  //       width: 1131,
  //     },
  //     {
  //       height: 4032,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q6gdkaqTB3MYSqWUaAFT4RxitHjkNPACEoQFqizEcwsxLJK7cb8TPDGxn5gPB5TUektc9DsGgFMHfGp_8ToSTALb158lD3uBWEZGN8yuX2RRoXYf4bfyKyNRVhYFocoXQUTYfm6I8zFf5uLkBin5rv8u8aPx2i8REAHbFRCMzX6xGuz",
  //       width: 3024,
  //     },
  //     {
  //       height: 4032,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q7GXYhLaTxGdhNxOqKxCTXWZKx5s1cIpOqHFcrZjFpa5k2mXvzk5gnoyNQZDD9-vLd407t8fDOCp6kDcrfwTaAPq9Ht2AsSRl5zHXpoBuGbq9tMys6DLQaCkCIlbQEzvMzpNhaphu29gSr3NRmyjG7lsL2yjiw2APOaGCVu3iBVwTxV",
  //       width: 3024,
  //     },
  //     {
  //       height: 4032,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q60mXmtTFiPqGmYMBhpp_3-RSUdJlFEeF48EnBuU3KbQlapxMSHRY9xITHdgMbtXlv3TcCY7oNRzk8YpzTH5SP787o-yCUDSfpJwW2rl5gGlWMct-Dud3cjxdj3j58KV4vQciTeBbNQm_1M0jLU-uLJZAdeZPsTn_X-Ublq9OJGj8Mo",
  //       width: 3024,
  //     },
  //     {
  //       height: 3024,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q7M7eK52Bq0KP-Pu-rU_ti-kS0cxA9iQp27Jd_VKG7mmM1-ov5rREyg1nVCZ-HU6VB7E9IAnp7KJX5b2DlMkw1wH1jh-VROl2v9jHR31a8vixtYTXxNgTBhQCWpB4pYvkotQFfQJBz7tsQezCiV8y4WfbmZOa7uiQvR8dTMHpsKhmIm",
  //       width: 4032,
  //     },
  //     {
  //       height: 4032,
  //       html_attributions: [
  //         '<a href="https://maps.google.com/maps/contrib/110641688974666962504">L.A. Painters and Decorators</a>',
  //       ],
  //       photo_reference:
  //         "AXCi2Q6gTDL-jQg_RsDWAAHNh51DZj5K5NbX6MKsr6sq4MNfzE8QbJlomxWrR5QGIHFa7GpO9MNZwPgfbKA19l0IRgFt0aH3sn8EqCISWWbJPWctnUi4wj2vcecInam78fxw-fJm0SPakZjT3Bd2gLwm60X8Y91g-OfC42rrZNXKfuuy11Jo",
  //       width: 3024,
  //     },
  //   ],
  //   place_id: "ChIJ_cVZhxALdkgRnzD3g2l0hes",
  //   plus_code: {
  //     compound_code: "CP64+MQ Kingston upon Thames, UK",
  //     global_code: "9C3XCP64+MQ",
  //   },
  //   rating: 5,
  //   reference: "ChIJ_cVZhxALdkgRnzD3g2l0hes",
  //   reviews: [
  //     {
  //       author_name: "L Powell",
  //       author_url:
  //         "https://www.google.com/maps/contrib/103359561296530163750/reviews",
  //       language: "en",
  //       original_language: "en",
  //       profile_photo_url:
  //         "https://lh3.googleusercontent.com/a-/ALV-UjVwA63ye17PsnVZxmi_O1YQ-DLiISus4ZSV8qUiLHa_zFSF2iE=s128-c0x00000000-cc-rp-mo",
  //       rating: 5,
  //       relative_time_description: "in the last week",
  //       text: "I used LA Painters and Decorators after they responded to my enquiry email after trying to find a local company for the job. Arkel & his team already had some good reviews which prompted me to book them after receiving their quote which was reasonable and fair for the job.\n\nI had them around to hide cables & an electric  socket into a wall from a previous owner. And put in my own new in and outlets for a tv. I also had them mount a soundbar for me. My property had some work done to it previously and part of Arkel’s brief from me was to ‘make good’ the area and decorate that and the full sitting room after.\n\nBoth the guys turned up on time nice and early and spent almost 1.5 days on site decorating. Their attention to detail was noticed- with the team making sure cracked and holes were filled in, using primer over plaster and tape to protect areas not being painted. Have included some before an after pics in this review.\n\nThe end result is fantastic and I’m very happy with it. Would use again and would recommend.",
  //       time: 1726314260,
  //       translated: false,
  //     },
  //     {
  //       author_name: "Katherine Worlley",
  //       author_url:
  //         "https://www.google.com/maps/contrib/104439965123022186094/reviews",
  //       language: "en",
  //       original_language: "en",
  //       profile_photo_url:
  //         "https://lh3.googleusercontent.com/a/ACg8ocK7RRMoBtl_y1X1Vxt-SpKVurim8AeW8JQQ8QWuatGInu14Qa9c=s128-c0x00000000-cc-rp-mo-ba3",
  //       rating: 5,
  //       relative_time_description: "10 months ago",
  //       text: "I have used Arkel before (3y ago) to do the bathrooms and paint my house. He did an excellent job last time and it lasted so I reached out again when I needed a widnow removed to create a kitchen pass-through and paint job. I continue to be impressed with his attention to detail and pride in his work- he makes sure I am happy with the result and will do his best. Always explains up front what the work requires and gives honest advice with regards to anything  that would not work as imagined. Seems to work with a consistent group of people all of whom are helpful, competend and polite. Never leaves a mess. Aways generous with little things on the side of a big job.",
  //       time: 1698953946,
  //       translated: false,
  //     },
  //     {
  //       author_name: "Claire Whitlie",
  //       author_url:
  //         "https://www.google.com/maps/contrib/115828060580816217312/reviews",
  //       language: "en",
  //       original_language: "en",
  //       profile_photo_url:
  //         "https://lh3.googleusercontent.com/a/ACg8ocI3eKXd9uZoghx_9tXfXxhCvslXKZuoTNLcw3iVI4gKBfGGwQ=s128-c0x00000000-cc-rp-mo",
  //       rating: 5,
  //       relative_time_description: "10 months ago",
  //       text: "This is the third time we have used Arkel and his team for various painting and handyman jobs and all work carried out has been great. They just get on with the job with minimal fuss, help with moving furniture and always clean up afterwards.  Really happy with the work done and will be using again soon.  Would highly recommend.",
  //       time: 1700465846,
  //       translated: false,
  //     },
  //     {
  //       author_name: "Marta Coll",
  //       author_url:
  //         "https://www.google.com/maps/contrib/105071372229117616322/reviews",
  //       language: "en",
  //       original_language: "en",
  //       profile_photo_url:
  //         "https://lh3.googleusercontent.com/a-/ALV-UjVI3sf5sHgmAQzNqR-Zdz21kLbuBH0VjWzJkRBU0fzZm9wAsDf1uw=s128-c0x00000000-cc-rp-mo",
  //       rating: 5,
  //       relative_time_description: "2 years ago",
  //       text: "We are absolutely blown away by the paint job that the L.A. team did in our house. We have a Victorian house and it wasn't an easy job, lots of repairs needed, etc. We can't believe how the rooms look now, they seem new. We are so happy with the service that we have asked them to quote more jobs. Very professional, quick and they left the place cleaner and tidier than it was before. Highly recommended.",
  //       time: 1652031706,
  //       translated: false,
  //     },
  //     {
  //       author_name: "Jennifer Sugden",
  //       author_url:
  //         "https://www.google.com/maps/contrib/113547833860080620334/reviews",
  //       language: "en",
  //       original_language: "en",
  //       profile_photo_url:
  //         "https://lh3.googleusercontent.com/a/ACg8ocIU0aHOj38JMezyfurgmNsNhqJTN-GljX0vKyJOIvU2TZJ2Zw=s128-c0x00000000-cc-rp-mo",
  //       rating: 5,
  //       relative_time_description: "a year ago",
  //       text: "Arkel and his team have painted all our bedrooms and very tricky hallway in our three story Edwardian house. They don't just paint walls but fill holes, neatened cornice moulding, sanded down banisters and provide all the paint. They charge a fair price and are always respectful of floors etc. Honest and effective team!",
  //       time: 1667722005,
  //       translated: false,
  //     },
  //   ],
  //   types: ["painter", "point_of_interest", "establishment"],
  //   url: "https://maps.google.com/?cid=16971098767349985439",
  //   user_ratings_total: 19,
  //   utc_offset: 60,
  //   vicinity: "142 Birkenhead Avenue, Kingston upon Thames",
  //   website: "http://www.lapaintersanddecorators.co.uk/",
  // };

  // const getPlaceId = (places) => {
  //   return places.map((place) => place.place_id);
  // };
  // console.log(getPlaceId(dataObject));

  // const [idOne, setItOne] = useState([]);

  // const one = function (arr) {
  //   const ids = arr.map((place) => place.place_id);
  //   setItOne(ids);
  // };

  // useEffect(() => {
  //   if (dataObject) {
  //     one(dataObject);
  //   }
  // }, [dataObject]);

  // Effect to log idOne when it changes
  // useEffect(() => {
  //   console.log("idOne has been updated:", idOne);
  // }, [idOne]);

  // const postalTown = data.address_components
  //   .filter((component) => component.types.includes("postal_town"))
  //   .map((component) => component.long_name);

  // const latestReview = new Date(
  //   Math.max(...data.reviews.map((review) => review.time)) * 1000
  // ).toLocaleDateString("en-GB");

  // console.log(postalTown);
  // console.log(latestReview);

  // const newPlace = {
  //   place_id: data.reference,
  //   name: data.name,
  //   industry: data.types ? data.types[0] : "Unknown",
  //   city: data?.address_components ? postalTown : "Unknown",
  //   rating_avg: data.rating ? data.rating : "Unknown",
  //   latest_review: data.reviews ? latestReview : "Unknown",
  //   website: data.website ? data.website : "None",
  //   phone: data.formatted_phone_number
  //     ? data.formatted_phone_number
  //     : "Unknown",
  //   archive: false,
  //   notes: null,
  //   reminder_date: null,
  // };

  // const test = [newPlace, newPlace];

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const data = await createPlace(test);
  //     toast.success("Place created successfully!");
  //   } catch (error) {
  //     toast.error("Failed to create place.");
  //   }
  // };

  // console.log(dataObject);
  // console.log(data);
  // console.log(newPlace);
  return <div>{/* <button onClick={handleSubmit}>Submit</button> */}</div>;
}
