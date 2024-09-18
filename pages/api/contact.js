import { supabase } from "@/lib/supabase";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({
      success: false,
      message: "Please make a post request",
    });
  }

  //   const contactData = {
  //     fullName: "Jonas",
  //     email: "Jonas@email.com",
  //     subject: "booking",
  //     message: "Hey!",
  //   };
  const contactData = JSON.parse(req.body);

  const { error } = await supabase.from("contacts").insert([contactData]);
  if (error) {
    res.status(500).json({
      success: false,
      message: "Could not sent your message. Please try again",
    });
  }

  res.status(200).json({
    success: true,
    message: "Thanks for your message! We will be in touch soon:)",
  });
}
