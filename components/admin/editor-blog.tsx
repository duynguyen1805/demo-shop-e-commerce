import React, { useCallback, useState } from "react";
// Import the Slate editor factory.
import {
  createEditor,
  Descendant,
  Editor,
  Transforms,
  Element,
  Node,
} from "slate";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

// ---------------CUSTOM ELEMENT AND TEXT FOR TYPESCRIPT---------------
// This example is for an Editor with `ReactEditor` and `HistoryEditor`
import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";
// export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;
const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });
    return !!match;
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n: any) => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  },
};
export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};
export type CodeElement = {
  type: "code";
  children: CustomText[];
};
export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};
export type CustomElement = ParagraphElement | HeadingElement | CodeElement;
export type FormattedText = { text: string; bold?: true };
export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
// ---------------END CUSTOM ELEMENT AND TEXT FOR TYPESCRIPT-------------

const Editor_blog = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const [valueEdit, setValueEdit] = useState<Descendant[]>([
    {
      type: "paragraph",
      children: [{ text: "A line of text in a paragraph." }],
    },
  ]);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);
  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Slate
      editor={editor}
      initialValue={valueEdit}
      onChange={(value) => {
        const isAstChange = editor.operations.some(
          (op) => "set_selection" !== op.type
        );
        if (isAstChange) {
          // Save the value to Local Storage.
          const content = JSON.stringify(value);
          localStorage.setItem("content", content);
        }
      }}
    >
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleCodeBlock(editor);
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        className="h-full w-full outline-none text-wrap"
        // Pass in the `renderElement` function.
        renderElement={renderElement}
        // Pass in the `renderLeaf` function.
        renderLeaf={renderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
            return;
          }
          // switch (event.key) {
          //   // When "`" is pressed, keep our existing code block logic.
          //   case "`": {
          //     event.preventDefault();
          //     const [match]: any = Editor.nodes(editor, {
          //       match: (n: any) => n.type === "code",
          //     });
          //     Transforms.setNodes(
          //       editor,
          //       { type: match ? "paragraph" : "code" },
          //       {
          //         match: (n) =>
          //           Element.isElement(n) && Editor.isBlock(editor, n),
          //       }
          //     );
          //     break;
          //   }

          //   // When "B" is pressed, bold the text in the selection.
          //   case "b": {
          //     event.preventDefault();
          //     Editor.addMark(editor, "bold", true);
          //     break;
          //   }
          // }

          // Replace the `onKeyDown` logic with our new commands.
          switch (event.key) {
            case "`": {
              event.preventDefault();
              CustomEditor.toggleCodeBlock(editor);
              break;
            }

            case "b": {
              event.preventDefault();
              CustomEditor.toggleBoldMark(editor);
              break;
            }
          }

          // replace "&" with "and"
          if (event.key === "&") {
            event.preventDefault();
            editor.insertText("and");
          }
        }}
      />
    </Slate>
  );
};

const CodeElement = (props: any) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props: any) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
    >
      {props.children}
    </span>
  );
};

export default Editor_blog;
