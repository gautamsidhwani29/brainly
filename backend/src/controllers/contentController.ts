import Content from "../models/contentModel";
import { type Request, type Response } from "express";
import ContentSchema from "../schemas/contentSchema";
import { type ContentType } from "../schemas/contentSchema";
import Tags from "../models/tagsModel";
type PartialContent = {
  type?: string | undefined;
  link?: string | undefined;
  title?: string | undefined;
  tags?: string[] | undefined;
  description?: string | undefined;
};

export const addContent = async (req: Request, res: Response) => {
  try {
    const result = ContentSchema.partial().safeParse(req.body);
    if (!result.success)
      return res.status(400).json({ message: result.error.issues });
    const content: PartialContent = result.data;
    const tags: string[] = [];
    for (const tagName of content.tags as []) {
      let tag = await Tags.findOne({ title: tagName });
      if (!tag) {
        let newTag = new Tags({
          title: tagName,
        });
        await newTag.save();
        tag = newTag;
      }
      tags.push(tag.title as string);
    }
    const newContent = new Content({
      type: content.type,
      title: content.title,
      description: content.description,
      link: content.link,
      tags: tags,
      userId: req.user._id,
    });
    await newContent.save();
    return res.status(201).json({ message: "Content Added!" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getContents = async (req: Request, res: Response) => {
  try {
    const userId = req.user._id;
    const contents = await Content.find({ userId: userId }).select(
      "title type link description tags shareable shareableId createdAt"
    );
    if (!contents)
      return res.status(200).json({ message: "No Contents Available!" });
    return res.status(200).json({ contents });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const getContent = async (req: Request, res: Response) => {
  try {
    const contentId = req.params.contentId;

    let content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: "Content not found!" });
    }

    if (content.userId?.toString() === String(req.user._id)) {
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
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const editContent = async (req: Request, res: Response) => {
  try {
    const result = ContentSchema.partial().safeParse(req.body);

    const contentId = req.params.contentId;
    if (!result.success)
      return res.status(400).json({ message: result.error.issues });
    let content: PartialContent = result.data;
    let tags: string[] = [];
    if (content.tags) {
      for (const tagName of content.tags) {
        let tag = await Tags.findOne({ title: tagName });
        if (!tag) {
          let newTag = new Tags({ title: tagName });
          await newTag.save();
          tag = newTag;
        }
        tags.push(tag.title as string);
      }
    }
    if (tags.length > 0) content.tags = tags;

    let updatedContent = await Content.findOneAndUpdate(
      { _id: contentId, userId: req.user._id },
      content,
      { new: true }
    );

    return res
      .status(200)
      .json({ message: "Updated Content!", content: updatedContent });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  try {
    let contentId = req.params.contentId;
    let content = await Content.findOne({ _id: contentId });
    if (!content)
      return res.status(404).json({ message: "Content not found!" });

    let deletedContent = await Content.findByIdAndDelete(contentId);
    if (!deletedContent)
      return res.status(400).json({ message: "Error Deleting Content" });

    return res.status(200).json({ message: "Deleted Content" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const toggleShare = async (req: Request, res: Response) => {
  try {
    const contentId = req.params.contentId;
    let content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: "Content not found!" });
    }
    content.shareable = !content.shareable;
    await content.save();
    if (content.shareable) {
      return res.status(200).json({ url: content.shareableLink });
    }
    return res.status(200).json({ message: "State Toggled" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

export const watchSharedContent = async (req: Request, res: Response) => {
  try {
    const { shareableId } = req.params;

    const content = await Content.findOne({ shareableId });
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
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};
