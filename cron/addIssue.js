/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

require("dotenv").config({ path: __dirname + "/" + ".env" });
const fetch = require("node-fetch");
const { faker } = require("@faker-js/faker");

const DEMO_USER_NAME = process.env.DEMO_USER_NAME;
const DEMO_USER_PW = process.env.DEMO_USER_PW;
const DEMO_URL = process.env.DEMO_URL;

const login = async (username, password) => {
  const authHeader = `Basic ${Buffer.from(username + ":" + password).toString(
    "base64"
  )}`;

  const response = await fetch(DEMO_URL + "/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  });

  const data = await response.json();
  const token = data.data.token;

  return token;
};

const addIssue = async (token, title, description, status) => {
  const authToken = `Token ${token}`;

  const response = await fetch(DEMO_URL + "/issues", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
      data: JSON.stringify({
        title: title,
        description: description,
        status: status,
      }),
    },
  });

  const data = await response.json();
  const success = data.success;

  return success;
};

const dateNow = (timezone) =>
  new Date().toLocaleString("en-us", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
    timeZoneName: "short",
    hour12: false,
  });

const init = async () => {
  try {
    const shouldAdd = faker.datatype.boolean();

    if (!shouldAdd) {
      console.log(dateNow("Asia/Qatar"), "Skip adding this time");
      return;
    }

    console.log(
      dateNow("Asia/Qatar"),
      "Loading env from",
      __dirname + "/" + ".env"
    );
    console.log(dateNow("Asia/Qatar"), "Adding issue for", DEMO_URL);
    console.log(
      dateNow("Asia/Qatar"),
      "Using creds of",
      DEMO_USER_NAME,
      DEMO_USER_PW
    );

    const token = await login(DEMO_USER_NAME, DEMO_USER_PW);
    const success = await addIssue(
      token,
      faker.commerce.productName(),
      faker.lorem.sentence(6),
      "todo"
    );

    console.log(dateNow("Asia/Qatar"), "Success");
  } catch (error) {
    console.error(dateNow("Asia/Qatar"), "Error", error.message);
  }
};

init();
