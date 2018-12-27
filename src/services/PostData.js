/* set BaseURL to backend URL
individual routes are passed in as "type"
example, http://mysite.com/route1
BaseURL = http://mysite.com/
type =  route1
*/
export function PostData(type, userData) {
  let BaseURL = process.env.REACT_APP_BACKEND_API_URL;
  return new Promise((resolve, reject) => {
    fetch(BaseURL + type, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(res => {
        resolve(res);
      })
      .catch(error => {
        reject(error);
      });
  });
}
