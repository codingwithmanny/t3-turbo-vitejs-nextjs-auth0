// Script
// ========================================================
const getTriggerBindings = async () => {
  console.group("Triggers: getTriggerBindings");

  // pnpm auth0:triggers:bindings -- id="YOUR-ACTION-ID"
  // Example IDs:
  //   - post-login
  //   - credentials-exchange
  //   - pre-user-registration
  //   - post-user-registration
  //   - post-change-password
  //   - send-phone-message
  //   - password-reset-post-challenge
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
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/actions/triggers/${id}/bindings`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        },
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
getTriggerBindings();

// Exports
// ========================================================
export { getTriggerBindings };
