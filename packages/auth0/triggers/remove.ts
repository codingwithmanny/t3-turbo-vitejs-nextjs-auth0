// Script
// ========================================================
const removeTriggerBindings = async () => {
  console.group("Triggers: removeTriggerBindings");

  // pnpm auth0:triggers:update -- triggerId="YOUR-ACTION-ID"
  // Example triggerIds:
  //   - post-login
  //   - credentials-exchange
  //   - pre-user-registration
  //   - post-user-registration
  //   - post-change-password
  //   - send-phone-message
  //   - password-reset-post-challenge
  let triggerId: string = "";
  process.argv.forEach((arg) => {
    if (arg.includes("triggerId=")) {
      triggerId = arg.replace("triggerId=", "");
    }
  });

  console.log({ triggerId });

  try {
    if (!triggerId) {
      throw new Error("triggerId must be provided");
    }

    const result = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/actions/triggers/${triggerId}/bindings`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        },
        body: JSON.stringify({
          // Empty removes all bindings
          bindings: [],
        }),
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
removeTriggerBindings();

// Exports
// ========================================================
export { removeTriggerBindings };
