import { KEY } from "../data";

export const fetchLoketPanggilAntrian = () => {
  return new Promise((resolve, reject) => {
    const url = `${KEY.BACKEND_URL}/v1/loket`;

    var pageToken = localStorage.getItem("Page-Token");

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Page-Token": pageToken,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          return response.text().then((errorText) => {
            throw new Error(errorText || "Error from server");
          });
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
