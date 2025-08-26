async function test() {
  try {
    const fetch = (await import("node-fetch")).default;

    const response = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hour: 10 }),
    });

    const data = await response.json();
    console.log("Fetch success:", data);
  } catch (error) {
    console.error("Fetch test failed:", error);
  }
}

test();
