const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/leetcode", async (req, res) => {
  try {
    const response = await fetch("https://leetcode.com/graphql/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (data.errors) {
      console.error("❌ GraphQL errors:", data.errors);
      return res.status(400).json({ error: data.errors });
    }

    res.json(data);
  } catch (error) {
    console.error("❌ Fetch failed:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
