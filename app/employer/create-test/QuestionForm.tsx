"use client";

import { useState, useEffect } from "react";
import { 
  Trash2, Undo2, Redo2, Bold, Italic, 
  List, ChevronRight,
  Plus, ArrowLeft, Save
} from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";

interface QuestionFormProps {
  initialData?: Question;
  onSave: (question: Question) => void;
  onCancel: () => void;
  questionNumber: number;
}

const TOOLBAR_BUTTON_CLASS = "p-2 rounded hover:bg-gray-100 text-gray-500 transition-colors";

const EditorToolbar = () => (
  <div className="flex items-center gap-1 border-b p-3 bg-gray-50/50 text-slate-800">
    <button className={TOOLBAR_BUTTON_CLASS}><Undo2 size={18} /></button>
    <button className={TOOLBAR_BUTTON_CLASS}><Redo2 size={18} /></button>
    <Separator orientation="vertical" className="h-5 mx-2" />
    <div className="flex items-center gap-1 text-sm font-semibold text-gray-600 px-3 py-1.5 cursor-pointer hover:bg-gray-100 rounded">
      Normal text <ChevronRight size={14} className="rotate-90 ml-1" />
    </div>
    <Separator orientation="vertical" className="h-5 mx-2" />
    <button className={TOOLBAR_BUTTON_CLASS}><List size={18} /></button>
    <Separator orientation="vertical" className="h-5 mx-2" />
    <button className={TOOLBAR_BUTTON_CLASS}><Bold size={18} /></button>
    <button className={TOOLBAR_BUTTON_CLASS}><Italic size={18} /></button>
  </div>
);

export function QuestionForm({ initialData, onSave, onCancel, questionNumber }: QuestionFormProps) {
  const [type, setType] = useState<QuestionType>(initialData?.type || "MCQ");
  const [title, setTitle] = useState(initialData?.title || "");
  const [score, setScore] = useState(initialData?.score || 1);
  const [options, setOptions] = useState<QuestionOption[]>(
    initialData?.options || [
      { id: "A", text: "", isCorrect: false },
      { id: "B", text: "", isCorrect: false },
    ]
  );

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setTitle(initialData.title);
      setScore(initialData.score);
      setOptions(initialData.options);
    }
  }, [initialData]);

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

  const handleSave = () => {
    onSave({
      id: initialData?.id || Math.random().toString(36).substr(2, 9),
      type,
      title,
      score,
      options: type === "Text" ? [] : options,
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCancel} className="rounded-full hover:bg-white shadow-sm">
            <ArrowLeft size={20} />
          </Button>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-[#6366f1] flex items-center justify-center text-white font-bold shadow-md">
              {questionNumber}
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              {initialData ? "Edit Question" : "Add New Question"}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-100 shadow-sm">
            <Label className="text-sm font-bold text-gray-500 ml-2">Score</Label>
            <Input 
              type="number" 
              value={score} 
              onChange={(e) => setScore(Number(e.target.value))}
              className="w-16 h-9 text-center font-bold border-none focus-visible:ring-0 bg-gray-50 rounded-lg text-lg"
            />
          </div>
          
          <Select value={type} onValueChange={(v) => v && setType(v as QuestionType)}>
            <SelectTrigger className="w-40 h-11 font-bold text-gray-700 bg-white shadow-sm rounded-xl border-gray-100">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MCQ" className="font-medium">Multiple Choice</SelectItem>
              <SelectItem value="Checkbox" className="font-medium">Checkbox</SelectItem>
              <SelectItem value="Text" className="font-medium">Text</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] rounded-2xl overflow-hidden bg-white mb-8">
        <CardContent className="p-8 space-y-8">
          <div className="space-y-4">
            <Label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Question Title</Label>
            <div className="border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#6366f1]/20 transition-all border-gray-100">
              <EditorToolbar />
              <textarea 
                className="w-full min-h-[150px] p-6 resize-none outline-none text-gray-800 placeholder:text-gray-300 text-lg"
                placeholder="What is the Capital of Bangladesh?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          {type !== 'Text' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-bold text-gray-600 uppercase tracking-wider">Options</Label>
                <span className="text-xs font-semibold text-gray-400">Mark the correct answer(s)</span>
              </div>
              
              <div className="space-y-4">
                {options.map((option, index) => (
                  <div key={option.id} className="group animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="h-8 w-8 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-xs font-bold text-gray-450">
                        {option.id}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {type === 'MCQ' ? (
                          <div 
                            onClick={() => handleToggleCorrect(option.id)}
                            className="flex items-center gap-2 cursor-pointer group/item"
                          >
                            <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center transition-all ${option.isCorrect ? 'border-[#6366f1] bg-[#6366f1]' : 'border-gray-200 bg-white'}`}>
                              {option.isCorrect && <div className="h-2 w-2 rounded-full bg-white" />}
                            </div>
                            <span className={`text-sm font-bold transition-colors ${option.isCorrect ? 'text-[#6366f1]' : 'text-gray-400'}`}>
                              Correct
                            </span>
                          </div>
                        ) : (
                          <div 
                             onClick={() => handleToggleCorrect(option.id)}
                             className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox 
                              checked={option.isCorrect} 
                              className="border-gray-200 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 rounded-md h-5 w-5"
                            />
                            <span className={`text-sm font-bold transition-colors ${option.isCorrect ? 'text-green-600' : 'text-gray-400'}`}>
                              Correct
                            </span>
                          </div>
                        )}
                      </div>

                      {options.length > 1 && (
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="ml-auto text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                          onClick={() => handleRemoveOption(option.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      )}
                    </div>
                    
                    <div className="border rounded-xl overflow-hidden border-gray-100 focus-within:border-[#6366f1]/30 transition-all">
                      <EditorToolbar />
                      <textarea 
                        className="w-full min-h-[100px] p-4 resize-none outline-none text-gray-700 bg-gray-50/20 placeholder:text-gray-300"
                        placeholder={`Option ${option.id} content...`}
                        value={option.text}
                        onChange={(e) => handleOptionTextChange(option.id, e.target.value)}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                variant="outline" 
                className="w-full h-14 border-dashed border-2 border-gray-200 text-[#6366f1] font-bold gap-3 rounded-2xl hover:bg-indigo-50 hover:border-[#6366f1]/30 transition-all"
                onClick={handleAddOption}
              >
                <Plus size={20} /> Add Another Option
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-4 pb-20">
        <Button 
          variant="ghost" 
          className="h-14 px-10 text-gray-500 font-bold hover:bg-gray-100 rounded-2xl transition-all"
          onClick={onCancel}
        >
          Discard Changes
        </Button>
        <Button 
          className="h-14 px-12 bg-[#6366f1] hover:bg-[#5558e6] text-white font-bold rounded-2xl transition-all shadow-lg flex gap-2"
          onClick={handleSave}
        >
          <Save size={20} />
          {initialData ? "Apply Changes" : "Save Question"}
        </Button>
      </div>
    </div>
  );
}
