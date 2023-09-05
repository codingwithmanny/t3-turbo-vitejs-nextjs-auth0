// Imports
// ========================================================
import fs from "fs";
import path from "path";

// Script
// ========================================================
const testAction = async () => {
  console.group("Actions: testAction");

  // Example: your-project.us.auth0.com -> your-project
  const tenant = `${process.env.AUTH0_DOMAIN}`.split(".")[0];

  // Alter this as needed to pull in your own code
  //   - post-login
  //   - credentials-exchange
  //   - pre-user-registration
  //   - post-user-registration
  //   - post-change-password
  //   - send-phone-message
  const triggerCode: string = "post-user-registration";
  let payload = "{}";

  switch (triggerCode) {
    case "post-user-registration":
      payload = fs.readFileSync(
        path.join(__dirname, "../test/postUserRegistration.json"),
        "utf8",
      );
      break;
    case "post-login":
      payload = fs.readFileSync(
        path.join(__dirname, "../test/postLogin.json"),
        "utf8",
      );
      break;
    case "credentials-exchange":
      payload = fs.readFileSync(
        path.join(__dirname, "../test/credentialsExchange.json"),
        "utf8",
      );
      break;
    case "pre-user-registration":
      payload = fs.readFileSync(
        path.join(__dirname, "../test/preUserRegistration.json"),
        "utf8",
      );
      break;
    case "post-change-password":
      payload = fs.readFileSync(
        path.join(__dirname, "../test/postChangePassword.json"),
        "utf8",
      );
      break;
    case "send-phone-message":
      payload = fs.readFileSync(
        path.join(__dirname, "../test/sendPhoneMessage.example.js"),
        "utf8",
      );
      break;
    default:
      throw new Error("No code provided");
  }

  payload = JSON.parse(payload);
  console.log({ payload });

  // pnpm auth0:actions:get -- id="YOUR-ACTION-ID"
  let id: string = "";
  process.argv.forEach((arg) => {
    if (arg.includes("id=")) {
      id = arg.replace("id=", "");
    }
  });

  console.log({ id });

  try {
    if (!id) {
      throw new Error("No ID provided");
    }

    const result = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/actions/actions/${id}/test`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!result.ok) {
      throw new Error(result.body?.toString());
    }

    const json = await result.json();
    console.log({ json: JSON.stringify(json, null, 2) });

    return json;
  } catch (error: any) {
    console.log({ error });
  }

  console.groupEnd();
};

// Init
// ========================================================
testAction();

// Exports
// ========================================================
export { testAction };
