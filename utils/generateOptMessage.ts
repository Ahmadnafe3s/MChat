import { Message } from "@/components/SendChatInput";

const generateOptMessage = (formData: any) => {
  let JsonData: Message = {} as Message;
  formData.forEach((value: any, key: any) => {
    (JsonData as any)[key] = value;
  });

  return {
    id: Date.now(),
    message_type: "user",
    message_by: "",
    header: JsonData.attachment
      ? {
          filetype: JsonData.type,
          format: JsonData.attachment.type.includes("image")
            ? "png"
            : JsonData.attachment.type.includes("audio")
              ? "ogg"
              : JsonData.attachment.type.includes("video")
                ? "mp4"
                : JsonData.attachment.uri.split(".").pop(),
          link: JsonData.attachment.uri,
        }
      : null,
    body: {
      text: JsonData.message ? JsonData.message : "",
    },
    footer: "",
    button: [],
    status: "delivered",
    datetime: new Date().toISOString(),
  };
};

export default generateOptMessage;
