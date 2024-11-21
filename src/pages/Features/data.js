// servicesData.js
import {
  MdDeliveryDining,
  MdAccessTime,
  MdEco,
  MdPayment,
} from "react-icons/md"; // Import all icons

export const servicesData = [
  {
    id: 1,
    title: "Fast Delivery",
    description:
      "Get your food delivered within 30 minutes, guaranteed hot and fresh.",
    icon: MdDeliveryDining, // Directly assign the icon
  },
  {
    id: 2,
    title: "24/7 Service",
    description: "We’re here to serve you anytime, day or night.",
    icon: MdAccessTime, // Directly assign the icon
  },
  {
    id: 3,
    title: "Fresh Ingredients",
    description: "We use only the freshest ingredients for all our meals.",
    icon: MdEco, // Directly assign the icon
  },
  {
    id: 4,
    title: "Multiple Payment Options",
    description:
      "We accept all major cards, mobile payments, and online transactions.",
    icon: MdPayment, // Directly assign the icon
  },
];
