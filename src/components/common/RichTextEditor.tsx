import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  ContentEditableEvent,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

function RichTextEditor({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (event: ContentEditableEvent) => void;
  label?: string;
}) {
  return (
    <div>
      {label && <label className="font-medium">{label}</label>}
      <EditorProvider>
        <Editor value={value} onChange={(e) => onChange(e)}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
