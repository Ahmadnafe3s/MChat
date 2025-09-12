import empty from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import logo from "@/assets/images/splash.png";

// ICONS
import moveLeft from "@/assets/icons/arrow-left.png";
import doubleCheck from "@/assets/icons/check-double.png";
import check from "@/assets/icons/check.png";
import error_bug from "@/assets/icons/error-bug.png";
import filter from "@/assets/icons/funnel.png";
import company from "@/assets/icons/house-building.png";
import key from "@/assets/icons/key-round.png";
import mail from "@/assets/icons/mail.png";
import more from "@/assets/icons/menu-dots-vertical.png";
import phone from "@/assets/icons/mobile-notch.png";
import send from "@/assets/icons/paper-plane-top.png";
import search from "@/assets/icons/search.png";
import star_filled from "@/assets/icons/solid_star.png";
import star from "@/assets/icons/star.png";
import user from "@/assets/icons/user.png";
import avatar from "@/assets/images/avatar.png";

export const images = {
  onboarding1,
  onboarding2,
  onboarding3,
  logo,
  empty,
};

export const icons = {
  mail,
  key,
  filter,
  search,
  error_bug,
  moveLeft,
  user,
  avatar,
  phone,
  company,
  star,
  star_filled,
  more,
  check,
  doubleCheck,
  send,
};

export const onboarding = [
  {
    id: 1,
    title: "Connect instantly with anyone!",
    description:
      "Start real-time conversations and stay close to the people who matter most.",
    image: onboarding1,
  },
  {
    id: 2,
    title: "Secure and reliable messaging",
    description:
      "Your chats are private and protected, so you can talk with confidence.",
    image: onboarding2,
  },
  {
    id: 3,
    title: "Chat your way, anytime, anywhere!",
    description:
      "Send texts, share media, and enjoy seamless communication on the go.",
    image: onboarding3,
  },
];





export const conversations = [
  { "id": "1", "senderID": 19, "text": "Hey, how are you?", "timestamp": "2025-09-12T09:00:00Z", "status": "read" },
  { "id": "2", "senderID": 20, "text": "I'm good, thanks! How about you?", "timestamp": "2025-09-12T09:01:00Z", "status": "read" },
  { "id": "3", "senderID": 19, "text": "Doing great! What have you been up to?", "timestamp": "2025-09-12T09:02:30Z", "status": "read" },
  { "id": "4", "senderID": 20, "text": "Just working on a new project.", "timestamp": "2025-09-12T09:03:15Z", "status": "read" },
  { "id": "5", "senderID": 19, "text": "Sounds interesting, tell me more!", "timestamp": "2025-09-12T09:04:00Z", "status": "read" },
  { "id": "6", "senderID": 20, "text": "It's a React Native app for chatting.", "timestamp": "2025-09-12T09:05:00Z", "status": "read" },
  { "id": "7", "senderID": 19, "text": "Nice! I'd love to see it when it's done.", "timestamp": "2025-09-12T09:06:00Z", "status": "read" },
  { "id": "8", "senderID": 20, "text": "How's your weekend looking?", "timestamp": "2025-09-12T09:07:00Z", "status": "read" },
  { "id": "9", "senderID": 19, "text": "Pretty packed, but I might squeeze in some gaming.", "timestamp": "2025-09-12T09:08:00Z", "status": "read" },
  { "id": "10", "senderID": 20, "text": "Great! Let's play sometime then.", "timestamp": "2025-09-12T09:09:00Z", "status": "read" },
  { "id": "11", "senderID": 19, "text": "Absolutely!", "timestamp": "2025-09-12T09:10:00Z", "status": "read" },
  { "id": "12", "senderID": 20, "text": "Catch you later!", "timestamp": "2025-09-12T09:11:00Z", "status": "sent" },
  { "id": "13", "senderID": 19, "text": "Bye!", "timestamp": "2025-09-12T09:12:00Z", "status": "sent" },
  { "id": "14", "senderID": 20, "text": "Are you coming to the meetup?", "timestamp": "2025-09-12T10:00:00Z", "status": "read" },
  { "id": "15", "senderID": 19, "text": "Yes, I'll be there around 6 PM.", "timestamp": "2025-09-12T10:01:00Z", "status": "read" },
  { "id": "16", "senderID": 20, "text": "Awesome! See you there.", "timestamp": "2025-09-12T10:02:00Z", "status": "read" },
  { "id": "17", "senderID": 19, "text": "Did you check the new update?", "timestamp": "2025-09-12T10:10:00Z", "status": "read" },
  { "id": "18", "senderID": 20, "text": "Not yet, planning to this weekend.", "timestamp": "2025-09-12T10:11:00Z", "status": "read" },
  { "id": "19", "senderID": 19, "text": "You should! It's really cool.", "timestamp": "2025-09-12T10:12:00Z", "status": "read" },
  { "id": "20", "senderID": 20, "text": "Will do, thanks!", "timestamp": "2025-09-12T10:13:00Z", "status": "read" },
  { "id": "21", "senderID": 19, "text": "Have you tried the new cafe downtown?", "timestamp": "2025-09-12T10:20:00Z", "status": "read" },
  { "id": "22", "senderID": 20, "text": "Yes, the coffee is amazing!", "timestamp": "2025-09-12T10:21:00Z", "status": "read" },
  { "id": "23", "senderID": 19, "text": "Glad you liked it.", "timestamp": "2025-09-12T10:22:00Z", "status": "read" },
  { "id": "24", "senderID": 20, "text": "We should go there together.", "timestamp": "2025-09-12T10:23:00Z", "status": "read" },
  { "id": "25", "senderID": 19, "text": "Absolutely!", "timestamp": "2025-09-12T10:24:00Z", "status": "read" },
  { "id": "26", "senderID": 20, "text": "Are you free tomorrow?", "timestamp": "2025-09-12T10:30:00Z", "status": "read" },
  { "id": "27", "senderID": 19, "text": "Yes, what's the plan?", "timestamp": "2025-09-12T10:31:00Z", "status": "read" },
  { "id": "28", "senderID": 20, "text": "Maybe hiking?", "timestamp": "2025-09-12T10:32:00Z", "status": "read" },
  { "id": "29", "senderID": 19, "text": "Sounds good!", "timestamp": "2025-09-12T10:33:00Z", "status": "read" },
  { "id": "30", "senderID": 20, "text": "I'll bring snacks.", "timestamp": "2025-09-12T10:34:00Z", "status": "read" },
  { "id": "31", "senderID": 19, "text": "Perfect, see you then!", "timestamp": "2025-09-12T10:35:00Z", "status": "read" },
  { "id": "32", "senderID": 20, "text": "Hey, did you watch the game?", "timestamp": "2025-09-12T10:40:00Z", "status": "read" },
  { "id": "33", "senderID": 19, "text": "Yeah, it was amazing!", "timestamp": "2025-09-12T10:41:00Z", "status": "read" },
  { "id": "34", "senderID": 20, "text": "What a finish!", "timestamp": "2025-09-12T10:42:00Z", "status": "read" },
  { "id": "35", "senderID": 19, "text": "Totally!", "timestamp": "2025-09-12T10:43:00Z", "status": "read" },
  { "id": "36", "senderID": 20, "text": "Lunch tomorrow?", "timestamp": "2025-09-12T10:50:00Z", "status": "read" },
  { "id": "37", "senderID": 19, "text": "Sure, where?", "timestamp": "2025-09-12T10:51:00Z", "status": "read" },
  { "id": "38", "senderID": 20, "text": "The new Italian place.", "timestamp": "2025-09-12T10:52:00Z", "status": "read" },
  { "id": "39", "senderID": 19, "text": "Looking forward to it!", "timestamp": "2025-09-12T10:53:00Z", "status": "read" },
  { "id": "40", "senderID": 20, "text": "See you!", "timestamp": "2025-09-12T10:54:00Z", "status": "unread" }
];