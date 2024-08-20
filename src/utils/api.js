const CACHE_KEY = 'cachedImages';
const CACHE_EXPIRY_KEY = 'cachedImagesExpiry';
const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

async function getImagesFromAPI() {
    // Check if cached data exists and is still valid
    const cachedImages = localStorage.getItem(CACHE_KEY);
    const cachedExpiry = localStorage.getItem(CACHE_EXPIRY_KEY);
    const now = new Date().getTime();

    if (cachedImages && cachedExpiry && now < parseInt(cachedExpiry, 10)) {
        return JSON.parse(cachedImages);
    }

    try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/images`);

        const images = await response.json();

        if (!Array.isArray(images.fileUrls)) {
            return [];
        }

        const mappedImages = images.fileUrls.map((url, index) => ({
            id: index + 1,
            url: url,
        }));

        // Cache the result in localStorage with an expiry time
        localStorage.setItem(CACHE_KEY, JSON.stringify(mappedImages));
        localStorage.setItem(CACHE_EXPIRY_KEY, (now + CACHE_DURATION).toString());

        return mappedImages;
    } catch (error) {
        return [];
    }
}

export { getImagesFromAPI };
