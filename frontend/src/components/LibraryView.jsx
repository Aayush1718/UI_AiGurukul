import { Upload, FileText, Image as ImageIcon, File, MoreVertical, Trash2, Download } from "lucide-react";
import { useState } from "react";

const MOCK_FILES = [
  { id: 1, name: "Site_Survey.pdf", size: "2.4 MB", type: "pdf", date: "Today, 10:24 AM" },
  { id: 2, name: "Elevation_Sketch.jpg", size: "1.1 MB", type: "image", date: "Yesterday" },
  { id: 3, name: "Structural_Requirements.docx", size: "845 KB", type: "doc", date: "Oct 24, 2023" },
  { id: 4, name: "Zoning_Map.png", size: "3.2 MB", type: "image", date: "Oct 22, 2023" },
  { id: 5, name: "Client_Brief.pdf", size: "1.8 MB", type: "pdf", date: "Oct 20, 2023" },
];

export default function LibraryView() {
  const [files, setFiles] = useState(MOCK_FILES);

  const getIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-400" size={24} />;
      case 'image': return <ImageIcon className="text-blue-400" size={24} />;
      case 'doc': return <FileText className="text-blue-500" size={24} />;
      default: return <File className="text-muted-foreground" size={24} />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="border-b border-border px-4 md:px-6 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Project Library</h2>
          <p className="text-sm text-muted-foreground mt-1 hidden sm:block">Manage uploaded files, references, and photos.</p>
        </div>
        <button className="flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-2 text-sm font-medium text-foreground transition hover:bg-violet-500">
          <Upload size={16} />
          Upload
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
          {files.map(file => (
            <div key={file.id} className="group relative flex items-start gap-4 rounded-2xl border border-border bg-muted p-4 transition hover:border-zinc-700 hover:bg-muted/50">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-card border border-border">
                {getIcon(file.type)}
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="truncate font-medium text-zinc-200" title={file.name}>{file.name}</h3>
                <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{file.size}</span>
                  <span className="h-1 w-1 rounded-full bg-zinc-700"></span>
                  <span>{file.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-muted-foreground hover:text-foreground transition opacity-100 lg:opacity-0 group-hover:opacity-100 p-1">
                  <Download size={18} />
                </button>
                <button className="text-muted-foreground hover:text-red-400 transition opacity-100 lg:opacity-0 group-hover:opacity-100 p-1">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {files.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
              <Upload size={32} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground">No files uploaded</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm">Upload documents, photos, or references to keep your project organized.</p>
          </div>
        )}
      </div>
    </div>
  );
}
