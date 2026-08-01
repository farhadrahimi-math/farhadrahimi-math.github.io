import { PERMISSIONS } from "../config/permissions.js";

export function getMenuItems(role) {

    const items = [

        {
            key: "dashboard",
            title: "داشبورد",
            icon: "layout-dashboard",
            color: "primary",
            route: "dashboard"
        },

        {
            key: "chapter",
            title: "فصل‌های ریاضی",
            icon: "book-open",
            color: "purple",
            route: "chapter"
        },

        {
            key: "exam",
            title: "آزمون‌های آنلاین",
            icon: "clipboard-list",
            color: "success",
            route: "exam"
        },

        {
            key: "game",
            title: "بازی‌های آموزشی",
            icon: "gamepad-2",
            color: "warning",
            route: "game"
        },

        {
            key: "report",
            title: "کارنامه",
            icon: "chart-column",
            color: "info",
            route: "report"
        },

        {
            key: "users",
            title: "کاربران",
            icon: "users",
            color: "primary",
            route: "admin"
        },

        {
            key: "contents",
            title: "مدیریت محتوا",
            icon: "folder-kanban",
            color: "purple",
            route: "admin"
        },

        {
            key: "settings",
            title: "تنظیمات",
            icon: "settings",
            color: "text",
            route: "settings"
        },

        {
            key: "logout",
            title: "خروج",
            icon: "log-out",
            color: "danger",
            route: "logout"
        }

    ];

    const allowed = PERMISSIONS[role] || [];

    return items.filter(item =>
        allowed.includes(item.key)
    );

}
