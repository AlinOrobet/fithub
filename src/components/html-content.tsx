import DOMPurify from "isomorphic-dompurify";

interface HTMLContentProps {
  content: string;
}
export const HTMLContent = ({content}: HTMLContentProps) => {
  const clean = DOMPurify.sanitize(content);

  return <div dangerouslySetInnerHTML={{__html: clean}}></div>;
};
