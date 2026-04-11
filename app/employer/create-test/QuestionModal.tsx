"use client";

import { useState, useEffect } from "react";
import { 
  Trash2, Undo2, Redo2, Bold, Italic, 
  List, ChevronRight,
  Plus
} from "lucide-react";
import { 
  Dialog, DialogContent, DialogHeader, 
  DialogTitle, DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question, QuestionType, QuestionOption } from "@/store/slices/testSlice";
import { Separator } from "@/components/ui/separator";

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: Question) => void;
  initialData?: Question;
}

const TOOLBAR_BUTTON_CLASS = "p-1.5 rounded hover:bg-gray-100 text-gray-500 transition-colors";

const EditorToolbar = () => (
  <div className="flex items-center gap-1 border-b p-2 bg-gray-50/50 text-slate-800">
    <button className={TOOLBAR_BUTTON_CLASS}><Undo2 size={16} /></button>
    <button className={TOOLBAR_BUTTON_CLASS}><Redo2 size={16} /></button>
    <Separator orientation="vertical" className="h-4 mx-1" />
    <div className="flex items-center gap-1 text-xs font-medium text-gray-600 px-2 cursor-pointer hover:bg-gray-100 rounded p-1">
      Normal text <ChevronRight size={12} className="rotate-90" />
    </div>
    <Separator orientation="vertical" className="h-4 mx-1" />
    <button className={TOOLBAR_BUTTON_CLASS}><List size={16} /></button>
    <Separator orientation="vertical" className="h-4 mx-1" />
    <button className={TOOLBAR_BUTTON_CLASS}><Bold size={16} /></button>
    <button className={TOOLBAR_BUTTON_CLASS}><Italic size={16} /></button>
  </div>
);

export function QuestionModal({ isOpen, onClose, onSave, initialData }: QuestionModalProps) {
  const [type, setType] = useState<QuestionType>(initialData?.type || "MCQ");
  const [title, setTitle] = useState(initialData?.title || "");
  const [score, setScore] = useState(initialData?.score || 1);
  const [options, setOptions] = useState<QuestionOption[]>(
    initialData?.options || [
      { id: "A", text: "", isCorrect: false },
    ]
  );

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setTitle(initialData.title);
      setScore(initialData.score);
      setOptions(initialData.options);
    } else {
      setType("MCQ");
      setTitle("");
      setScore(1);
      setOptions([{ id: "A", text: "", isCorrect: false }]);
    }
  }, [initialData, isOpen]);

  const handleAddOption = () => {
    const nextId = String.fromCharCode(65 + options.length);
    setOptions([...options, { id: nextId, text: "", isCorrect: false }]);
  };

  const handleRemoveOption = (id: string) => {
    setOptions(options.filter(o => o.id !== id));
  };

  const handleOptionTextChange = (id: string, text: string) => {
    setOptions(options.map(o => o.id === id ? { ...o, text } : o));
  };

  const handleToggleCorrect = (id: string) => {
    if (type === "MCQ") {
      setOptions(options.map(o => ({ ...o, isCorrect: o.id === id })));
    } else {
      setOptions(options.map(o => o.id === id ? { ...o, isCorrect: !o.isCorrect } : o));
    }
  };

  const handleSave = (addMore = false) => {
    onSave({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      type,
      title,
      score,
      options: type === "Text" ? [] : options,
    });
    
    if (addMore) {
      setTitle("");
      setOptions([{ id: "A", text: "", isCorrect: false }]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-none shadow-2xl">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full border-2 border-gray-300 flex items-center justify-center text-sm font-bold text-gray-500">1</div>
              <DialogTitle className="text-xl font-bold text-gray-800">Question 1</DialogTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label className="text-sm font-bold text-gray-600">Score:</Label>
                <Input 
                  type="number" 
                  value={score} 
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-16 h-8 text-center font-bold"
                />
              </div>
              <Select value={type} onValueChange={(v) => v && setType(v as QuestionType)}>
                <SelectTrigger className="w-32 h-9 font-semibold text-gray-700">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MCQ">Radio</SelectItem>
                  <SelectItem value="Checkbox">Checkbox</SelectItem>
                  <SelectItem value="Text">Text</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400">
                <Trash2 size={20} />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 py-4 space-y-6">
          {/* Question Text Editor Area */}
          <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 transition-all">
            <EditorToolbar />
            <textarea 
              className="w-full min-h-[120px] p-4 resize-none outline-none text-gray-800 placeholder:text-gray-300"
              placeholder="What is the Capital of Bangladesh?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Options Section */}
          {type !== 'Text' && (
            <div className="space-y-4 pt-2">
              {options.map((option) => (
                <div key={option.id} className="space-y-2">
                  <div className="flex items-center gap-4 px-1">
                    <div className="h-6 w-6 rounded-full border flex items-center justify-center text-[10px] font-bold text-gray-400 bg-gray-50">
                      {option.id}
                    </div>
                    <div className="flex items-center gap-2">
                      {type === 'MCQ' ? (
                        <RadioGroup value={options.find(o => o.isCorrect)?.id || ""} onValueChange={handleToggleCorrect}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value={option.id} id={`opt-${option.id}`} className="text-primary border-gray-300" />
                            <Label htmlFor={`opt-${option.id}`} className="text-sm font-medium text-gray-500 cursor-pointer">
                              Set as correct answer
                            </Label>
                          </div>
                        </RadioGroup>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={`opt-${option.id}`} 
                            checked={option.isCorrect} 
                            onCheckedChange={() => handleToggleCorrect(option.id)}
                            className="border-gray-300 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label htmlFor={`opt-${option.id}`} className="text-sm font-medium text-gray-500 cursor-pointer">
                            Set as correct answer
                          </Label>
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto text-gray-400 hover:text-red-500" onClick={() => handleRemoveOption(option.id)}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  
                  <div className="border rounded-lg overflow-hidden">
                    <EditorToolbar />
                    <textarea 
                      className="w-full min-h-[80px] p-3 resize-none outline-none text-gray-700 bg-gray-50/10 placeholder:text-gray-300"
                      placeholder="Enter option content..."
                      value={option.text}
                      onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}

              <Button 
                variant="ghost" 
                className="text-primary font-bold gap-2 p-0 h-auto hover:bg-transparent"
                onClick={handleAddOption}
              >
                <Plus size={18} /> Another options
              </Button>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-2 gap-3 pb-8">
          <Button 
            variant="outline" 
            className="h-12 px-12 border-primary text-primary hover:bg-primary/5 font-bold"
            onClick={() => handleSave(false)}
          >
            Save
          </Button>
          <Button 
            className="h-12 px-10 bg-primary hover:bg-primary/90 font-bold"
            onClick={() => handleSave(true)}
          >
            Save & Add More
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
