import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const CK_TextEditor = ({ onSave }: any) => {
  const [editorData, setEditorData] = useState("");

  const handleSave = () => {
    // Lưu dữ liệu vào database hoặc gọi hàm onSave để xử lý
    onSave(editorData);
  };

  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={editorData}
        onChange={(event, editor) => {
          const data = editor.getData();
          setEditorData(data);
        }}
      />
      <button onClick={handleSave}>Lưu</button>
    </div>
  );
};

export default CK_TextEditor;
