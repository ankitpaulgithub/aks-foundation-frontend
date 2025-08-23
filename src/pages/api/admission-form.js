import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  const filePath = path.join(process.cwd(), "public/form.html");
  let html = fs.readFileSync(filePath, "utf-8");

  // Replace placeholders with real data
  const data = {
    name: "Rahul Kumar",
    father: "Suresh Kumar",
    dob: "15/08/2000"
  };

  Object.keys(data).forEach(key => {
    html = html.replace(`{{${key}}}`, data[key]);
  });

  res.setHeader("Content-Type", "text/html");
  res.send(html);
}