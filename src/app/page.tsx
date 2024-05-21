import Editor from "@/components/Editor";
import Image from "next/image";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Rich Text Editor with Auto-Save</h1>
      <Editor />
    </main>
  );
}
