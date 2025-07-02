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
import GenerateOrEnhanceButton from "./GenerateOrEnhanceButton.tsx";

type RichTextEditorProps = {
  value: string;
  onChange: (event: ContentEditableEvent) => void;
  label?: string;
  generateBtn?: boolean;
  generateBtnText?: string;
  generateBtnOnClick?: () => void;
};

function RichTextEditor({
  value,
  onChange,
  label,
  generateBtn = false,
  generateBtnText,
  generateBtnOnClick,
}: RichTextEditorProps) {
  return (
    <div className="relative">
      {label && <label className="font-medium">{label}</label>}
      <EditorProvider>
        <Editor
          className="h-44 w-[30rem] overflow-auto rounded-md"
          value={value}
          onChange={(e) => onChange(e)}
        >
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
        {generateBtn && (
          <GenerateOrEnhanceButton
            className="bottom-3 right-3"
            text={generateBtnText || ""}
            onClick={generateBtnOnClick || (() => {})}
            noAnimation={true}
          />
        )}
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
