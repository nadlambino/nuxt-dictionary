export const useCookie = () => {
    
    function set(key, value, h: number = 24, m: number = 0, s: number = 0) {
        if (!value) {
            return;
        }

        if (typeof value === 'object') {
            value = JSON.stringify(value)
        }

        const now = new Date();
        const midnight = new Date();
        midnight.setHours(h, m, s, 0);

        const timeUntilExpiration = midnight.getTime() - now.getTime();
        const expires = new Date(now.getTime() + timeUntilExpiration);

        document.cookie = `${key}=${value}; expires=${expires.toUTCString()}; path=/`;
    }

    function get(name) {
        const cookies = document.cookie.split(";");

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            if (cookie.startsWith(name + "=")) {
                const valueStartIndex = name.length + 1;
                const value = decodeURIComponent(cookie.substring(valueStartIndex));

                try {
                    return JSON.parse(value);
                } catch (error) {
                    return value;
                }
            }
        }

        return null;
    }

    return {
        set,
        get
    }
}
