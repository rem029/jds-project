/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

const fetch = require("node-fetch");
const { faker } = require("@faker-js/faker");

const DEMO_USER_NAME = "test@gmail.com";
const DEMO_USER_PW = "123";

const login = async (username, password) => {
  const authHeader = `Basic ${Buffer.from(username + ":" + password).toString(
    "base64"
  )}`;

  const response = await fetch("http://localhost:6060/login", {
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

  const response = await fetch("http://localhost:6060/issues/", {
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

const init = async () => {
  try {
    const token = await login(DEMO_USER_NAME, DEMO_USER_PW);
    const success = await addIssue(
      token,
      faker.commerce.productName(),
      faker.lorem.sentence(6),
      "todo"
    );

    console.log(success);
  } catch (error) {
    console.error(error.message);
  }
};

init();
