import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import VariableMention from "../extensions/VariableMention";
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Undo, Redo } from "lucide-react";

const VARIABLES = [
  { id: "user_name", label: "User Name", value: "{{user_name}}" },
  { id: "company", label: "Company", value: "{{company}}" },
  { id: "email", label: "Email Address", value: "{{email}}" },
  { id: "date", label: "Current Date", value: "{{date}}" },
  { id: "subscription_plan", label: "Subscription Plan", value: "{{subscription_plan}}" },
  { id: "account_balance", label: "Account Balance", value: "{{account_balance}}" },
  { id: "support_phone", label: "Support Phone", value: "{{support_phone}}" },
  { id: "website_url", label: "Website URL", value: "{{website_url}}" },
];

const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit, VariableMention, TextStyle, Underline],
    content: "<p>Type {{ to insert variables</p>",
    autofocus: true,
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  if (!editor) return <p className="text-gray-400">Loading editor...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="border-4 border-blue-500 rounded-xl shadow-xl bg-white p-5 w-full max-w-3xl">
        
        {/* Toolbar */}
        <div className="flex gap-3 border-b-2 border-gray-300 pb-3 mb-3 items-center">
          <button onClick={() => editor.chain().focus().toggleBold().run()} className="p-2 hover:bg-gray-100 rounded">
            <Bold size={18} />
          </button>
          <button onClick={() => editor.chain().focus().toggleItalic().run()} className="p-2 hover:bg-gray-100 rounded">
            <Italic size={18} />
          </button>
          <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="p-2 hover:bg-gray-100 rounded">
            <UnderlineIcon size={18} />
          </button>
          <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-2 hover:bg-gray-100 rounded">
            <List size={18} />
          </button>
          <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className="p-2 hover:bg-gray-100 rounded">
            <ListOrdered size={18} />
          </button>
          <button onClick={() => editor.chain().focus().undo().run()} className="p-2 hover:bg-gray-100 rounded">
            <Undo size={18} />
          </button>
          <button onClick={() => editor.chain().focus().redo().run()} className="p-2 hover:bg-gray-100 rounded">
            <Redo size={18} />
          </button>

          {/* Variable Dropdown */}
          <select
            onChange={(e) => {
              const variable = VARIABLES.find((v) => v.id === e.target.value);
              if (variable) {
                editor.chain().focus().insertContent(variable.value).run();
              }
            }}
            className="ml-auto p-2 border rounded text-sm bg-white shadow"
          >
            <option value="">Insert Variable</option>
            {VARIABLES.map((variable) => (
              <option key={variable.id} value={variable.id}>
                {variable.label}
              </option>
            ))}
          </select>
        </div>

        {/* Editor */}
        <div className="border-2 border-gray-300 rounded-lg bg-gray-50 p-4 min-h-[250px] shadow-inner">
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
};

export default Editor;
