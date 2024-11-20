import { KEY } from "../data";

export const fetchTokenPage = () => {
  return new Promise((resolve, reject) => {
    const url = `${KEY.BACKEND_URL}/v1/request-page-token`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Request-Page-Token": KEY.SECRET_USER,
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
