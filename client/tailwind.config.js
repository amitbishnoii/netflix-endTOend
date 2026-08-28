module.exports = {
    theme: {
        extend: {
            keyframes: {
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                fadeOut: {
                    "0%": { opacity: "1" },
                    "100%": { opacity: "0" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.94)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
            },
        },
    },
};
