// Imports
// ========================================================
import fs from "fs";
import path from "path";

// Script
// ========================================================
const createAction = async () => {
  console.group("Actions: createAction");

  // Alter this as needed to pull in your own code
  //   - post-login
  //   - credentials-exchange
  //   - pre-user-registration
  //   - post-user-registration
  //   - post-change-password
  //   - send-phone-message
  const triggerCode: string = "post-user-registration";
  let code: string = "";

  switch (triggerCode) {
    case "post-user-registration":
      code = fs.readFileSync(
        path.join(__dirname, "../code/postUserRegistration.example.js"),
        "utf8",
      );
      break;
    case "post-login":
      code = fs.readFileSync(
        path.join(__dirname, "../code/postLogin.example.js"),
        "utf8",
      );
      break;
    case "credentials-exchange":
      code = fs.readFileSync(
        path.join(__dirname, "../code/credentialsExchange.example.js"),
        "utf8",
      );
      break;
    case "pre-user-registration":
      code = fs.readFileSync(
        path.join(__dirname, "../code/preUserRegistration.example.js"),
        "utf8",
      );
      break;
    case "post-change-password":
      code = fs.readFileSync(
        path.join(__dirname, "../code/postChangePassword.example.js"),
        "utf8",
      );
      break;
    case "send-phone-message":
      code = fs.readFileSync(
        path.join(__dirname, "../code/sendPhoneMessage.example.js"),
        "utf8",
      );
      break;
    default:
      throw new Error("No code provided");
  }

  console.log({ code });

  try {
    /**
     * Compatible triggers
     * When no version is specified it takes the latest version
     */
    const supported_triggers = [
      { id: "post-user-registration", version: "" },
      // { id: "post-login", version: "" },
      // { id: "credentials-exchange", version: "" },
      // { id: "pre-user-registration", version: "" },
      // { id: "post-user-registration", version: "" },
      // { id: "post-change-password", version: "" },
      // { id: "send-phone-message", version: "" },
      // { id: "password-reset-post-challenge", version: "" },
    ];

    console.log({ supported_triggers });

    const payload = {
      name: `Hello Test Action - ${triggerCode}`,
      supported_triggers,
      // JS code that will be executed when the action is triggered.
      code,
      runtime: "node18-actions",
      // The list of third party npm modules, and their versions, that this action depends on.
      dependencies: [
        // {
        //   name: "string", // tsx
        //   version: "string", // 3.12.8
        //   registry_url: "string" // https://www.npmjs.com/package/tsx
        // }
      ],
      // The list of secrets that are included in an action or a version of an action.
      secrets: [
        // {
        //   name: "MY_SECRET",
        //   value: "MY_VALUE",
        // }
      ],
    };

    console.log({ payload });

    const result = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/actions/actions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        },
        body: JSON.stringify(payload),
        redirect: "follow",
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
createAction();

// Exports
// ========================================================
export { createAction };
