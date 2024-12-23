
export default async function wxbot(content) {
  const response = await fetch(process.env.wxhook, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "msgtype": "text",
      "text": {
        "content": `${content}`
      }
    })
  });
  return response;
}