// Script
// ========================================================
const updateTriggerBindings = async () => {
  console.group("Triggers: updateTriggerBindings");

  // pnpm auth0:triggers:update -- triggerId="YOUR-ACTION-ID" actionId="YOUR-ACTION-ID"
  // Example triggerIds:
  //   - post-login
  //   - credentials-exchange
  //   - pre-user-registration
  //   - post-user-registration
  //   - post-change-password
  //   - send-phone-message
  //   - password-reset-post-challenge
  let triggerId: string = "";
  let actionId: string = "";
  process.argv.forEach((arg) => {
    if (arg.includes("triggerId=")) {
      triggerId = arg.replace("triggerId=", "");
    }
    if (arg.includes("actionId=")) {
      actionId = arg.replace("actionId=", "");
    }
  });

  console.log({ triggerId, actionId });

  try {
    if (!triggerId || !actionId) {
      throw new Error("Both triggerId and actionId must be provided");
    }

    const action = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/actions/actions/${actionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        },
      },
    );

    if (!action.ok) {
      throw new Error(action.body?.toString());
    }

    const actionJson = await action.json();

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
          bindings: [
            {
              display_name: actionJson.name,
              ref: {
                type: "action_id",
                value: actionJson.id,
              },
            },
          ],
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
updateTriggerBindings();

// Exports
// ========================================================
export { updateTriggerBindings };
