import empty from "@/assets/images/no-result.png";
import onboarding1 from "@/assets/images/onboarding1.png";
import onboarding2 from "@/assets/images/onboarding2.png";
import onboarding3 from "@/assets/images/onboarding3.png";
import logo from "@/assets/images/splash.png";

// ICONS
import filter from "@/assets/icons/funnel.png";
import key from "@/assets/icons/key-round.png";
import mail from "@/assets/icons/mail.png";
import search from "@/assets/icons/search.png";

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
