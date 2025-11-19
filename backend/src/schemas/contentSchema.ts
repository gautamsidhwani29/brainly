import { z } from "zod";

const allowedContenttype = ["document", "tweet", "youtube", "link"];
const ContentSchema = z.object({
  type: z.enum(allowedContenttype),
  link: z.string(),
  description: z.string().optional(),
  title: z.string().max(100),
  tags: z.array(z.string()),
});

export type ContentType = z.infer<typeof ContentSchema>;
export default ContentSchema;
