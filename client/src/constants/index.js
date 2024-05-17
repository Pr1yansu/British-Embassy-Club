import Member_icon from "../assets/icons/Member_icon.png";
import Coupon_icon from "../assets/icons/Coupon_icon.png";
import Settings_icon from "../assets/icons/Settings_icon.png";
import Profile_icon from "../assets/icons/Profile_icon.png";

import member from "../assets/icons/member.png";
import dashboard from "../assets/icons/dashboard.png";
import coupone from "../assets/icons/coupone.png";
import settings from "../assets/icons/settings.png";
import profile from "../assets/icons/profile.png";
import member_bold from "../assets/icons/member_bold.png";
import dashboard_bold from "../assets/icons/dashboard_bold.png";
import coupone_bold from "../assets/icons/coupone_bold.png";
import settings_bold from "../assets/icons/settings_bold.png";
import profile_bold from "../assets/icons/profile_bold.png";

export const cardData = [
  {
    img: Member_icon,
    title: "Member",
    subtitle: "Add or remove members",
    position: "justify-self-end",
    posV: "self-end",
    shadow: "hover:shadow-[8px_8px_16px_0px_rgba(252,198,56,0.25)]",
    background: "hover:bg-[#FEF3C7]",
    page: "/member"
  },
  {
    img: Coupon_icon,
    title: "Coupon",
    subtitle: "Issue or recieve coupons",
    position: "justify-self-start",
    posV: "self-end",
    shadow: "hover:shadow-[8px_8px_16px_0px_rgba(229,44,84,0.25)]",
    background: "hover:bg-[#FDA4AF]",
    page: "/member"
  },
  {
    img: Settings_icon,
    title: "Settings",
    subtitle: "Account settings and Logout",
    position: "justify-self-end",
    posV: "self-start",
    shadow: "hover:shadow-[8px_8px_16px_0px_rgba(140,57,214,0.25)]",
    background: "hover:bg-[#D8B4FE]",
    page: "/member"
  },
  {
    img: Profile_icon,
    title: "Profile",
    subtitle: "Change your profile settings",
    position: "justify-self-start",
    posV: "self-start",
    shadow: "hover:shadow-[8px_8px_16px_0px_rgba(51,203,107,0.25)]",
    background: "hover:bg-[#BBF7D0]",
    page: "/profile"
  },
];

export const sidebarItem1 = [
  { icon: dashboard, title: "Dashboard", iconBold: dashboard_bold },
  { icon: member, title: "Member", iconBold: member_bold },
  { icon: coupone, title: "Coupone", iconBold: coupone_bold },
  { icon: settings, title: "Settings", iconBold: settings_bold },
  { icon: profile, title: "Profile", iconBold: profile_bold },
];
export const sidebarItem2 = [
  { icon: dashboard, alter: "dashboard", iconBold: dashboard_bold },
  { icon: member, alter: "member", iconBold: member_bold },
  { icon: coupone, alter: "coupone", iconBold: coupone_bold },
  { icon: settings, alter: "settings", iconBold: settings_bold },
  { icon: profile, alter: "profile", iconBold: profile_bold },
];

export const memberItem = [
  {
    img: profile,
    name: "John Deo",
    email: "@username",
    info: "info",
    member_ID: "BEC20240201DEM1",
    membership: "Expires on 21.10.24",
    mobile: "+91 1234567890",
    balance: "450.00",
  },
];

 export const managementData = [
   { id: 1, name: "John Doe", roles: "Admin" },
   { id: 2, name: "Jane Smith", roles: "Operator" },
   { id: 3, name: "Mike Johnson", roles: "Auditor" },
 ];