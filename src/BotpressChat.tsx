import { useEffect } from "react";

declare global {
    interface Window {
        botpress?: any;
    }
}

export default function BotpressChat() {
    useEffect(() => {
        // Load Botpress core
        const injectScript = document.createElement("script");
        injectScript.src =
            "https://cdn.botpress.cloud/webchat/v3.6/inject.js";
        injectScript.async = true;

        injectScript.onload = () => {
            // Load your bot config
            const botScript = document.createElement("script");
            botScript.src =
                "https://files.bpcontent.cloud/2026/05/26/03/20260526030540-3UPJIPDG.js";
            botScript.defer = true;

            botScript.onload = () => {
                // Wait for webchat init
                window.botpress?.on("webchat:initialized", () => {
                    window.botpress.config({
                        configuration: {
                            botName: "JMJ Assistant",
                            botDescription: "How can we help?",
                            color: "#111111",
                            themeMode: "light",
                            radius: 1.8,
                            variant: "soft",
                            fontFamily: "Inter",
                            headerVariant: "solid",
                            showPoweredBy: false,
                            botAvatar: "/white.png"

                        }
                    });
                });
            };

            document.body.appendChild(botScript);
        };

        document.body.appendChild(injectScript);
    }, []);

    return null;
}