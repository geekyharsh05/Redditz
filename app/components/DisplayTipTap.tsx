"use client";

import React from "react";
import { JSONContent } from "@tiptap/react";

// A basic node renderer
function renderNode(node: any, index: number = 0): React.ReactNode {
  const children =
    node.content?.map((child: any, idx: number) => (
      <React.Fragment key={idx}>{renderNode(child, idx)}</React.Fragment>
    )) ?? [];

  switch (node.type) {
    case "doc":
      return <React.Fragment key={index}>{children}</React.Fragment>;
    case "paragraph":
      return <p key={index}>{children}</p>;
    case "text":
      let text = node.text;

      if (node.marks) {
        node.marks.forEach((mark: any) => {
          switch (mark.type) {
            case "bold":
              text = <strong key={index}>{text}</strong>;
              break;
            case "italic":
              text = <em key={index}>{text}</em>;
              break;
            case "strike":
              text = <s key={index}>{text}</s>;
              break;
            case "code":
              text = <code key={index}>{text}</code>;
              break;
          }
        });
      }

      return text;
    case "heading": {
      const level = node.attrs?.level || 1;
      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      return <Tag key={index}>{children}</Tag>;
    }
    case "bulletList":
      return <ul key={index}>{children}</ul>;
    case "orderedList":
      return <ol key={index}>{children}</ol>;
    case "listItem":
      return <li key={index}>{children}</li>;
    case "blockquote":
      return <blockquote key={index}>{children}</blockquote>;
    case "horizontalRule":
      return <hr key={index} />;
    case "hardBreak":
      return <br key={index} />;
    default:
      return <React.Fragment key={index}>{children}</React.Fragment>;
  }
}

export function TipTapJSONRenderer({ content }: { content: JSONContent }) {
  if (!content || typeof content !== "object") return null;

  return (
    <div className="prose dark:prose-invert px-2 pt-2">
      {renderNode(content)}
    </div>
  );
}
