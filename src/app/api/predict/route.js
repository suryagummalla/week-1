export async function GET(request) {
  const hour = new Date().getHours();
  console.log("Fetching prediction for hour:", hour);

  try {
    const response = await fetch("http://localhost:8002/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hour: hour }),
    });
    console.log("Fetch response status:", response.status);

    if (!response.ok) {
      console.error("ML service error:", response.status);
      return new Response(
        JSON.stringify({ error: "ML service error", status: response.status }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const prediction = await response.json();
    return new Response(JSON.stringify(prediction), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response(
      JSON.stringify({ error: "Fetch failed", message: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


