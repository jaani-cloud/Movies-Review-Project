
export const passwordValidator = {
    required: "Password is required",

    validate: (value) => {
        if (value.includes(" ")) {
            return "Don't use Space.";
        }

        const allowedPattern = /^[a-zA-Z0-9!@#$%^&*]*$/;
        if (!allowedPattern.test(value)) {
            for (let i = 0; i < value.length; i++) {
                const char = value[i];
                if (!/[a-zA-Z0-9!@#$%^&*]/.test(char)) {
                    return `Don't use ${char}`;
                }
            }
        }

        let finalError = "";

        if (value.length < 8) {
            const needed = 8 - value.length;
            const word = needed === 1 ? "character" : "characters";
            finalError = `Password must have ${needed} more ${word}. `;
        }

        let missingItems = [];

        if (!/[a-z]/.test(value)) {
            missingItems.push("lowercase letter");
        }

        if (!/[A-Z]/.test(value)) {
            missingItems.push("uppercase letter");
        }

        if (!/\d/.test(value)) {
            missingItems.push("digit");
        }

        if (!/[!@#$%^&*]/.test(value)) {
            missingItems.push("symbol");
        }

        if (missingItems.length > 0) {
            let useText = "Add 1 ";

            if (missingItems.length === 1) {
                useText += missingItems[0];
            } else if (missingItems.length === 2) {
                const lastItem = missingItems[1];
                const article = (lastItem === "symbol") ? "a" : "an";
                useText += missingItems[0] + " and " + article + " " + lastItem;
            } else {
                for (let i = 0; i < missingItems.length; i++) {
                    if (i === missingItems.length - 1) {
                        const lastItem = missingItems[i];
                        const article = (lastItem === "symbol") ? "a" : "an";
                        useText += "and " + article + " " + lastItem;
                    } else {
                        useText += missingItems[i] + ", ";
                    }
                }
            }

            finalError += useText + ".";
        }

        if (finalError !== "") {
            return finalError;
        }

        return true;
    }
};