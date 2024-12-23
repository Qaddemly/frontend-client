type EditJobCardItemProps = {
  title?: string;
  content?: string;
};

function EditJobCardItem({ title, content }: EditJobCardItemProps) {
  return (
    <p className="pl-1 text-sm text-gray-600">
      <span className="font-medium">{title}</span> {truncateText(`${content}`)}
    </p>
  );
}

export default EditJobCardItem;

function truncateText(text: string): string {
  const words = text.split(" ");
  return words.length > 5 ? words.slice(0, 5).join(" ") + " ..." : text;
}
