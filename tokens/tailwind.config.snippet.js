/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        surface: {
          subtle: "#F7F7F8",
          active: "#EBECEE",
          border: "#ECECEC",
          control: "#E5E7EB",
        },
        brand: {
          dark: "#111827",
          secondary: "#4B5563",
          muted: "#6B7280",
          placeholder: "#9CA3AF",
        },
      },
      boxShadow: {
        "2xs": "0 1px 2px 0 rgba(0, 0, 0, 0.04)",
        "xs": "0 1px 3px 0 rgba(0, 0, 0, 0.06)",
        "popover": "0 10px 30px rgba(0, 0, 0, 0.12)",
        "modal": "0 12px 36px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        "2xl": "1rem", // 16px
        "xl": "0.75rem", // 12px
        "lg": "0.5rem", // 8px
      },
    },
  },
};
