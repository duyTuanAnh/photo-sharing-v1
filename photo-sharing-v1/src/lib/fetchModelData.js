/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
const fetchModel = async (url) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`https://nws8dc-8081.csb.app/api${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export default fetchModel;
