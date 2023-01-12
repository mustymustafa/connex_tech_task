import { URL } from "../helpers";
import { encode } from "base-64";

const token = 'mysecrettoken'
 let username = "user";
 let password = "password";
 const base64encodedData = encode(`${username}:${password}`)
 
export const getServerTime = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/time`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
    });
    const data = await response.json();
    if (response.ok) {
        console.log(data)
      return data.serverTime;
    } else {
       return alert('ops! something went wrong');
    }
  } catch (error) {
    alert("Network error. try again later");
    console.log("error", error);
  }
};

export const getServerMetrics = async () => {
  try {
    const response = await fetch(`${URL}/api/v1/metrics`, {
      method: "GET",
      headers: new Headers({
        Authorization: `Basic ${base64encodedData}`,
      }),
    });
    const data = await response.text()
    if (response.ok) {
      console.log(data);
      return data;
    } else {
      return alert("ops! something went wrong");
    }
  } catch (error) {
    alert("Network error. try again later");
    console.log("error", error);
  }
};