const PREFIX = "RSS_";

const parseEnv = () => {
    const result = [];

    for (const [key, value] of Object.entries(process.env)) {
        if (key.startsWith(PREFIX)) {
            result.push(`${key}=${value}`);
        }
    }

    console.log(result.join("; "));
};

parseEnv();
