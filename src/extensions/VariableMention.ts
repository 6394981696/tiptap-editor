import { Node, mergeAttributes } from "@tiptap/core";
import { ChainedCommands } from "@tiptap/react";

export interface VariableAttrs {
  id: string;
  label: string;
  value: string;
}

// ✅ Correctly extend Tiptap Commands
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    insertVariable: (variable: VariableAttrs) => ReturnType;
  }
}

const VariableMention = Node.create({
  name: "variableMention",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      id: { default: null },
      label: { default: null },
      value: { default: null },
    };
  },

  parseHTML() {
    return [{ tag: "span[data-variable]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes, { "data-variable": HTMLAttributes.value }), HTMLAttributes.label];
  },

  addCommands() {
    return {
      insertVariable:
        (variable: VariableAttrs) =>
        ({ chain }: { chain: () => ChainedCommands }) => {
          return chain()
            .insertContent({
              type: "variableMention",
              attrs: variable,
            })
            .run();
        },
    };
  },
});

export default VariableMention;
