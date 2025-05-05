import Navbar from "../home/Navbar";
import Footer from "../home/Footer";
import NavMessage from "./NavMessage";

// const chats: Chat[] = [
//   {
//     avatar: "https://example.com/avatar1.png",
//     name: "John Doe",
//     website: "https://johndoe.com",
//     isStarred: true,
//     unreadMessages: 0,
//     messages: [
//       {
//         text: "Hello! How can I help you?",
//         sender: "business",
//         time: "10:00 AM",
//       },
//       {
//         text: "I need information about your services.",
//         sender: "user",
//         time: "10:05 AM",
//       },
//       {
//         text: "Sure, let me check and get back to you.",
//         sender: "business",
//         time: "10:10 AM",
//       },
//       {
//         text: "Thanks for your help!",
//         sender: "user",
//         time: "10:15 AM",
//       },
//       {
//         text: "You're welcome!",
//         sender: "business",
//         time: "10:20 AM",
//       },
//       {
//         text: "Have a great day!",
//         sender: "business",
//         time: "10:25 AM",
//       },
//       {
//         text: "Goodbye!",
//         sender: "user",
//         time: "10:30 AM",
//       },
//       {
//         text: "See you later!",
//         sender: "business",
//         time: "10:35 AM",
//       },
//       {
//         text: "Bye!",
//         sender: "user",
//         time: "10:40 AM",
//       },
//       {
//         text: "How are you!",
//         sender: "business",
//         time: "11:00 PM",
//       },
//       {
//         text: "I'm good, how about you?",
//         sender: "user",
//         time: "11:05 PM",
//       },
//     ],
//   },
//   {
//     avatar: "https://example.com/avatar2.png",
//     name: "Jane Smith",
//     website: "https://janesmith.com",
//     isStarred: false,
//     unreadMessages: 1,
//     messages: [
//       { text: "Can I place an order?", sender: "user", time: "9:30 AM" },
//       {
//         text: "Sure! What would you like to order?",
//         sender: "business",
//         time: "9:35 AM",
//       },
//     ],
//   },
//   {
//     avatar: "https://example.com/avatar3.png",
//     name: "Mike Johnson",
//     website: "https://mikejohnson.com",
//     isStarred: true,
//     unreadMessages: 3,
//     messages: [
//       { text: "Do you offer discounts?", sender: "user", time: "11:15 AM" },
//       {
//         text: "Yes, we have seasonal discounts available.",
//         sender: "business",
//         time: "11:20 AM",
//       },
//     ],
//   },
//   {
//     avatar: "https://example.com/avatar4.png",
//     name: "Sarah Lee",
//     website: "https://sarahlee.com",
//     isStarred: false,
//     unreadMessages: 0,
//     messages: [
//       {
//         text: "Your customer service is excellent!",
//         sender: "user",
//         time: "12:45 PM",
//       },
//       {
//         text: "Thank you! We appreciate your feedback.",
//         sender: "business",
//         time: "12:50 PM",
//       },
//     ],
//   },
//   {
//     avatar: "https://example.com/avatar5.png",
//     name: "David Kim",
//     website: "https://davidkim.com",
//     isStarred: true,
//     unreadMessages: 0,
//     messages: [
//       {
//         text: "I have a question about your products.",
//         sender: "user",
//         time: "1:30 PM",
//       },
//       {
//         text: "Sure! What can I help you with?",
//         sender: "business",
//         time: "1:35 PM",
//       },
//     ],
//   },
//   {
//     avatar: "https://example.com/avatar6.png",
//     name: "Emily Davis",
//     website: "https://emilydavis.com",
//     isStarred: false,
//     unreadMessages: 0,
//     messages: [
//       {
//         text: "I need to cancel my subscription.",
//         sender: "user",
//         time: "2:15 PM",
//       },
//       {
//         text: "Sure! What is your subscription plan?",
//         sender: "business",
//         time: "2:20 PM",
//       },
//     ],
//   },
//   {
//     avatar: "https://example.com/avatar7.png",
//     name: "Robert Wilson",
//     website: "https://robertwilson.com",
//     isStarred: true,
//     unreadMessages: 0,
//     messages: [
//       {
//         text: "How can I track my order?",
//         sender: "user",
//         time: "3:00 PM",
//       },
//     ],
//   },
//   {
//     avatar: "https://example.com/avatar8.png",
//     name: "Jessica Brown",
//     website: "https://jessicabrown.com",
//     isStarred: false,
//     unreadMessages: 0,
//     messages: [
//       {
//         text: "Can I return an item?",
//         sender: "user",
//         time: "4:30 PM",
//       },
//       {
//         text: "Yes, we accept returns within 30 days.",
//         sender: "business",
//         time: "4:35 PM",
//       },
//       {
//         text: "What is your return policy?",
//         sender: "user",
//         time: "4:40 PM",
//       },
//     ],
//   },
// ];

function Message() {
  return (
    <>
      <Navbar />
      <div className="flex min-h-[calc(100vh-200px)] flex-col bg-background px-1 py-7 sm:px-8 md:px-14">
        <div className="flex h-full flex-col gap-4 rounded-xl bg-white p-4">
          <NavMessage chatType="USER" />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Message;
