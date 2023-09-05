// Script
// ========================================================
const listTriggers = async () => {
  console.group("Triggers: listTriggers");

  try {
    const result = await fetch(
      `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/actions/triggers`,
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
listTriggers();

// Exports
// ========================================================
export { listTriggers };
