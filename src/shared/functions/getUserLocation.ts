export async function getUserLocation(
  language: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(
        "Geolocation is not supported by this browser.",
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } =
          position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=${language}`;
        try {
          const response = await fetch(url, {
            headers: {
              "User-Agent": process.env
                .APP_SITE_NAME as string,
            }, // Required by Nominatim
          });
          const data = await response.json();

          if (data.address) {
            const country = data.address.country;
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state;
            resolve(`${country}/${city}`);
          } else {
            reject("Location not found.");
          }
        } catch (error) {
          reject(
            `Error fetching location data: ${error}`,
          );
        }
      },
      (error) =>
        reject(
          `Geolocation error: ${error.message}`,
        ),
    );
  });
}
