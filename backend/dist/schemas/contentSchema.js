"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const allowedContenttype = ["document", "tweet", "youtube", "link"];
const ContentSchema = zod_1.z.object({
    type: zod_1.z.enum(allowedContenttype),
    link: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    title: zod_1.z.string().max(100),
    tags: zod_1.z.array(zod_1.z.string()),
});
exports.default = ContentSchema;
