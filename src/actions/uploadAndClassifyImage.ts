"use server";

export async function uploadAndClassifyImage(formData: FormData) {
  const imageFile = formData.get("image") as File;

  if (!imageFile) {
    return { error: "No image uploaded" };
  }

  const buffer = await imageFile.arrayBuffer();
  const HF_API_URL = "https://api-inference.huggingface.co/models/google/vit-base-patch16-224";

  const response = await fetch(HF_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
      "Content-Type": imageFile.type,
    },
    body: buffer,
  });

  if (!response.ok) {
    const errorText = await response.text();
    return { error: `Hugging Face Error (${response.status}): ${errorText}` };
  }

  const result = await response.json();
  console.log(result)
  const topPrediction = result[0]?.label || "Breed not identified";

  return { breed: topPrediction };
}
