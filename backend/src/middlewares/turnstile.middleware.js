import axios from "axios";

export async function verifyTurnstile(req, res, next) {
  const token = req.body.turnstileToken;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Captcha token missing",
    });
  }

  try {
    const response = await axios.post(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
        remoteip: req.ip,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (!response.data?.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    next();
  } catch (err) {
    console.error("Turnstile error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Captcha verification error",
    });
  }
}
