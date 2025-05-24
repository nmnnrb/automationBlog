"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Bold, Italic, List, ListOrdered, UnderlineIcon } from "lucide-react";
import clsx from "clsx";

import "../fonts/global.css"; // Import global styles with Tailwind directives

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [, setUpdate] = useState(0); // for force re-render

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      ListItem,
      BulletList,
      OrderedList,
      Underline,
      Highlight,
      TextStyle,
      Color,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
      setUpdate((u) => u + 1); // force update to re-render toolbar styles
    },
    onSelectionUpdate: () => {
      setUpdate((u) => u + 1); // force update on selection change
    },
  });

  if (!editor) return null;

  return (
    <div
      className={clsx(
        "rounded-md p-3 border transition-shadow",
        isFocused ? "border-blue-500 shadow ring-1 ring-blue-300" : "border-gray-300"
      )}
    >
      {/* Toolbar */}
      <div className="mb-2 flex flex-wrap  gap-2 border-b pb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={clsx(
            "p-1 rounded hover:bg-blue-100 transition",
            editor.isActive("bold") ? "font-bold text-blue-600 bg-blue-50" : "text-gray-700"
          )}
          title="Bold"
        >
          <Bold size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={clsx(
            "p-1 rounded hover:bg-blue-100 transition",
            editor.isActive("italic") ? "italic text-blue-600 bg-blue-50" : "text-gray-700"
          )}
          title="Italic"
        >
          <Italic size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={clsx(
            "p-1 rounded hover:bg-blue-100 transition",
            editor.isActive("bulletList") ? "text-blue-600 bg-blue-50" : "text-gray-700"
          )}
          title="Bullet List"
        >
          <List size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={clsx(
            "p-1 rounded hover:bg-blue-100 transition",
            editor.isActive("orderedList") ? "text-blue-600 bg-blue-50" : "text-gray-700"
          )}
          title="Ordered List"
        >
          <ListOrdered size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={clsx(
            "p-1 rounded hover:bg-blue-100 transition",
            editor.isActive("underline") ? "underline text-blue-600 bg-blue-50" : "text-gray-700"
          )}
          title="Underline"
        >
          <UnderlineIcon size={16} />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={clsx(
            "p-1 rounded hover:bg-yellow-100 transition",
            editor.isActive("highlight")
              ? "bg-yellow-200 text-yellow-800 font-bold"
              : "text-gray-700"
          )}
          title="Highlight"
        >
          HL
        </button>
      </div>

      {/* Editor content */}
<EditorContent
  editor={editor}
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  className="editor-content  bg-white rounded-md px-4 py-2 outline-none focus:outline-none focus:ring-0 text-gray-900"
/>
    </div>
  );
};

export default RichTextEditor;
