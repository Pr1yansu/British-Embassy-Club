import Member_icon from "../assets/icons/Member_icon.png";
import Coupon_icon from "../assets/icons/Coupon_icon.png";
import Settings_icon from "../assets/icons/Settings_icon.png";
import Profile_icon from "../assets/icons/Profile_icon.png";

export const cardData = [
    {
        img : Member_icon,
        title : "Member",
        subtitle: "Add or remove members",
        position: "justify-self-end",
        posV: "self-end",
        shadow: "hover:shadow-[8px_8px_16px_0px_rgba(252,198,56,0.25)]",
        background: "hover:bg-[#FEF3C7]",
    },
    {
        img : Coupon_icon,
        title : "Coupon",
        subtitle: "Issue or recieve coupons",
        position: "justify-self-start",
        posV: "self-end",
        shadow: "hover:shadow-[8px_8px_16px_0px_rgba(229,44,84,0.25)]",
        background: "hover:bg-[#FDA4AF]",
    },
    {
        img : Settings_icon,
        title : "Settings",
        subtitle: "Account settings and Logout",
        position: "justify-self-end",
        posV: "self-start",
        shadow: "hover:shadow-[8px_8px_16px_0px_rgba(140,57,214,0.25)]",
        background: "hover:bg-[#D8B4FE]",

    },
    {
        img : Profile_icon,
        title : "Profile",
        subtitle: "Change your profile settings",
        position: "justify-self-start",
        posV: "self-start",
        shadow: "hover:shadow-[8px_8px_16px_0px_rgba(51,203,107,0.25)]",
        background: "hover:bg-[#BBF7D0]",

    }
]