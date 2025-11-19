"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchSharedContent = exports.toggleShare = exports.deleteContent = exports.editContent = exports.getContent = exports.getContents = exports.addContent = void 0;
const contentModel_1 = __importDefault(require("../models/contentModel"));
const contentSchema_1 = __importDefault(require("../schemas/contentSchema"));
const tagsModel_1 = __importDefault(require("../models/tagsModel"));
const addContent = async (req, res) => {
    try {
        const result = contentSchema_1.default.partial().safeParse(req.body);
        if (!result.success)
            return res.status(400).json({ message: result.error.issues });
        const content = result.data;
        const tags = [];
        for (const tagName of content.tags) {
            let tag = await tagsModel_1.default.findOne({ title: tagName });
            if (!tag) {
                let newTag = new tagsModel_1.default({
                    title: tagName,
                });
                await newTag.save();
                tag = newTag;
            }
            tags.push(tag.title);
        }
        const newContent = new contentModel_1.default({
            type: content.type,
            title: content.title,
            description: content.description,
            link: content.link,
            tags: tags,
            userId: req.user._id,
        });
        await newContent.save();
        return res.status(201).json({ message: "Content Added!" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addContent = addContent;
const getContents = async (req, res) => {
    try {
        const userId = req.user._id;
        const contents = await contentModel_1.default.find({ userId: userId }).select("title type link description tags shareable shareableId createdAt");
        if (!contents)
            return res.status(200).json({ message: "No Contents Available!" });
        return res.status(200).json({ contents });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
exports.getContents = getContents;
const getContent = async (req, res) => {
    var _a;
    try {
        const contentId = req.params.contentId;
        let content = await contentModel_1.default.findById(contentId);
        if (!content) {
            return res.status(404).json({ message: "Content not found!" });
        }
        if (((_a = content.userId) === null || _a === void 0 ? void 0 : _a.toString()) === String(req.user._id)) {
            return res.status(200).json({
                title: content.title,
                type: content.type,
                link: content.link,
                description: content.description,
                tags: content.tags,
                shareable: content.shareable,
                shareableId: content.shareableId,
            });
        }
        if (!content.shareable) {
            return res.status(403).json({ message: "Content is Private" });
        }
        return res
            .status(200)
            .json({ content, shareableLink: content.shareableLink });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
exports.getContent = getContent;
const editContent = async (req, res) => {
    try {
        const result = contentSchema_1.default.partial().safeParse(req.body);
        const contentId = req.params.contentId;
        if (!result.success)
            return res.status(400).json({ message: result.error.issues });
        let content = result.data;
        let tags = [];
        if (content.tags) {
            for (const tagName of content.tags) {
                let tag = await tagsModel_1.default.findOne({ title: tagName });
                if (!tag) {
                    let newTag = new tagsModel_1.default({ title: tagName });
                    await newTag.save();
                    tag = newTag;
                }
                tags.push(tag.title);
            }
        }
        if (tags.length > 0)
            content.tags = tags;
        let updatedContent = await contentModel_1.default.findOneAndUpdate({ _id: contentId, userId: req.user._id }, content, { new: true });
        return res
            .status(200)
            .json({ message: "Updated Content!", content: updatedContent });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
exports.editContent = editContent;
const deleteContent = async (req, res) => {
    try {
        let contentId = req.params.contentId;
        let content = await contentModel_1.default.findOne({ _id: contentId });
        if (!content)
            return res.status(404).json({ message: "Content not found!" });
        let deletedContent = await contentModel_1.default.findByIdAndDelete(contentId);
        if (!deletedContent)
            return res.status(400).json({ message: "Error Deleting Content" });
        return res.status(200).json({ message: "Deleted Content" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.deleteContent = deleteContent;
const toggleShare = async (req, res) => {
    try {
        const contentId = req.params.contentId;
        let content = await contentModel_1.default.findById(contentId);
        if (!content) {
            return res.status(404).json({ message: "Content not found!" });
        }
        content.shareable = !content.shareable;
        await content.save();
        if (content.shareable) {
            return res.status(200).json({ url: content.shareableLink });
        }
        return res.status(200).json({ message: "State Toggled" });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ message: "Internal server error!" });
    }
};
exports.toggleShare = toggleShare;
const watchSharedContent = async (req, res) => {
    try {
        const { shareableId } = req.params;
        const content = await contentModel_1.default.findOne({ shareableId });
        if (!content) {
            return res.status(404).json({ message: "Content not found!" });
        }
        if (!content.shareable) {
            return res.status(403).json({ message: "This content is private." });
        }
        return res.status(200).json({
            _id: content._id,
            type: content.type,
            title: content.title,
            link: content.link,
            tags: content.tags,
            createdAt: content.createdAt,
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
};
exports.watchSharedContent = watchSharedContent;
