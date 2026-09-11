import React, { useState, useEffect, useRef } from 'react';
import { X, Check, Image as ImageIcon, Trash2 } from 'lucide-react';
import { InterviewQuestion, QuestionCategory, QuestionImage } from '../types';
import { CATEGORIES } from '../data/categories';

interface AddEditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (question: InterviewQuestion) => void;
  editingQuestion?: InterviewQuestion | null;
  nextQuestionNumber: number;
}

export const AddEditQuestionModal: React.FC<AddEditQuestionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  editingQuestion,
  nextQuestionNumber,
}) => {
  const [category, setCategory] = useState<QuestionCategory>('C# / OOPS');
  const [questionNumber, setQuestionNumber] = useState<number>(nextQuestionNumber);
  const [title, setTitle] = useState('');
  const [images, setImages] = useState<QuestionImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [detailedPointsText, setDetailedPointsText] = useState('');
  const detailedPointsRef = useRef<HTMLTextAreaElement>(null);
  const [codeLanguage, setCodeLanguage] = useState('csharp');
  const [code, setCode] = useState('');
  const [codeExplanation, setCodeExplanation] = useState('');
  const [keyTakeawaysText, setKeyTakeawaysText] = useState('');
  const [interviewTips, setInterviewTips] = useState('');
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');

  useEffect(() => {
    if (editingQuestion) {
      setCategory(editingQuestion.category);
      setQuestionNumber(editingQuestion.questionNumber);
      setTitle(editingQuestion.title);
      setImages(editingQuestion.images || (editingQuestion.screenshot
        ? [{ id: `legacy-${editingQuestion.id}`, dataUrl: editingQuestion.screenshot }]
        : []));
      setDetailedPointsText(editingQuestion.detailedPoints.join('\n'));
      setCodeLanguage(editingQuestion.codeSnippet?.language || 'csharp');
      setCode(editingQuestion.codeSnippet?.code || '');
      setCodeExplanation(editingQuestion.codeSnippet?.explanation || '');
      setKeyTakeawaysText(editingQuestion.keyTakeaways ? editingQuestion.keyTakeaways.join('\n') : '');
      setInterviewTips(editingQuestion.interviewTips || '');
      setDifficulty(editingQuestion.difficulty || 'Medium');
    } else {
      setCategory('C# / OOPS');
      setQuestionNumber(nextQuestionNumber);
      setTitle('');
      setImages([]);
      setDetailedPointsText('');
      setCodeLanguage('csharp');
      setCode('');
      setCodeExplanation('');
      setKeyTakeawaysText('');
      setInterviewTips('');
      setDifficulty('Medium');
    }
  }, [editingQuestion, nextQuestionNumber, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const points = detailedPointsText
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const takeaways = keyTakeawaysText
      .split('\n')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const updated: InterviewQuestion = {
      id: editingQuestion ? editingQuestion.id : Date.now(),
      questionNumber: questionNumber,
      category: category,
      title: title.trim().toUpperCase(),
      screenshot: undefined,
      images: images.length > 0 ? images : undefined,
      detailedPoints: points.length > 0 ? points : [title.trim()],
      codeSnippet: code.trim()
        ? {
            language: codeLanguage,
            code: code.trim(),
            explanation: codeExplanation.trim() || undefined,
          }
        : undefined,
      keyTakeaways: takeaways.length > 0 ? takeaways : undefined,
      interviewTips: interviewTips.trim() || undefined,
      difficulty: difficulty,
      isBookmarked: editingQuestion?.isBookmarked || false,
      status: editingQuestion?.status || 'unviewed',
    };

    onSave(updated);
    onClose();
  };

  const handleScreenshotFile = async (file: File) => {
    if (!file.type.startsWith('image/')) return;
    setIsUploading(true);
    setUploadError('');
    try {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': file.type },
        body: file,
      });
      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json() as { src?: string };
      if (!result.src) throw new Error('Upload did not return an asset URL');
      setImages((current) => [
        ...current,
        { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, src: result.src },
      ]);
    } catch {
      setUploadError(`Unable to upload ${file.name}.`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    for (const file of Array.from(e.target.files || [])) {
      await handleScreenshotFile(file);
    }
    e.target.value = '';
  };

  const handleScreenshotPaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const imageItem = Array.from(e.clipboardData.items).find((item) =>
      item.type.startsWith('image/')
    );
    const file = imageItem?.getAsFile();
    if (!file) return;

    e.preventDefault();
    void handleScreenshotFile(file);
  };

  const insertImageAtCursor = (imageId: string) => {
    const textarea = detailedPointsRef.current;
    if (!textarea) return;
    const marker = `[[IMAGE:${imageId}]]`;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const nextText = `${detailedPointsText.slice(0, start)}${marker}${detailedPointsText.slice(end)}`;
    setDetailedPointsText(nextText);
    requestAnimationFrame(() => {
      textarea.focus();
      const cursor = start + marker.length;
      textarea.setSelectionRange(cursor, cursor);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 bg-slate-50">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              {editingQuestion ? 'Edit Question' : 'Add New Interview Question'}
            </h3>
            <p className="text-xs text-slate-500">
              {editingQuestion ? `Editing Question #${questionNumber}` : 'Add to your prep question bank'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {/* Number */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Question Number
              </label>
              <input
                type="number"
                min="1"
                max="9999"
                value={questionNumber}
                onChange={(e) => setQuestionNumber(parseInt(e.target.value) || 1)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as QuestionCategory)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {CATEGORIES.filter((c) => c.id !== 'All Topics').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Difficulty</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          {/* Question Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Question Title (Uppercase)
            </label>
            <textarea
              rows={2}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. WHAT IS METHOD OVERLOADING IN C#?"
              className="w-full rounded-lg border border-slate-200 p-3 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase font-semibold"
              required
            />
          </div>

          {/* Detailed Points */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Answer (Separate paragraphs by newlines)
            </label>
            <textarea
              rows={5}
              ref={detailedPointsRef}
              value={detailedPointsText}
              onChange={(e) => setDetailedPointsText(e.target.value)}
              placeholder="Enter explanation points, definitions, comparison details..."
              className="w-full rounded-lg border border-slate-200 p-3 text-xs leading-relaxed focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 font-sans"
              required
            />
          </div>

          {/* Screenshot */}
          <div
            onPaste={handleScreenshotPaste}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <ImageIcon className="h-4 w-4 text-blue-600" />
                Screenshot (Optional)
              </label>
              <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 transition-colors hover:bg-slate-100">
                {isUploading ? 'Uploading...' : 'Choose Image'}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleScreenshotChange}
                  multiple
                  disabled={isUploading}
                  className="sr-only"
                />
              </label>
            </div>
            {images.length > 0 ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {images.map((image, index) => (
                  <div key={image.id} className="relative overflow-hidden rounded-lg border border-slate-200 bg-white">
                    <img src={image.src || image.dataUrl} alt={`Screenshot ${index + 1} preview`} className="h-36 w-full object-contain" />
                    <div className="flex items-center justify-between border-t border-slate-100 p-2">
                      <span className="text-[11px] text-slate-500">Image {index + 1}</span>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => insertImageAtCursor(image.id)} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800">
                          Insert here
                        </button>
                        <button type="button" onClick={() => setImages((current) => current.filter((item) => item.id !== image.id))} className="flex items-center gap-1 text-[11px] font-semibold text-rose-600 hover:text-rose-800">
                          <Trash2 className="h-3 w-3" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-slate-500">
                Upload multiple images or paste an image here with Ctrl+V. Place the cursor in the answer, then select “Insert here”.
              </p>
            )}
            {uploadError && <p className="mt-2 text-[11px] font-semibold text-rose-600">{uploadError}</p>}
          </div>

          {/* Code Snippet */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800">
                Code Snippet (Optional)
              </label>
              <select
                value={codeLanguage}
                onChange={(e) => setCodeLanguage(e.target.value)}
                className="rounded border border-slate-300 bg-white px-2 py-1 text-[11px]"
              >
                <option value="csharp">C#</option>
                <option value="sql">SQL</option>
                <option value="javascript">JavaScript</option>
                <option value="json">JSON / Config</option>
              </select>
            </div>
            <textarea
              rows={4}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Enter C# or SQL code example here..."
              className="w-full rounded-lg border border-slate-200 bg-slate-900 p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:ring-1 focus:ring-emerald-400"
            />
            <input
              type="text"
              value={codeExplanation}
              onChange={(e) => setCodeExplanation(e.target.value)}
              placeholder="Brief explanation of code execution..."
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700"
            />
          </div>

          {/* Key Takeaways */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Key Takeaways (1 bullet per line)
            </label>
            <textarea
              rows={2}
              value={keyTakeawaysText}
              onChange={(e) => setKeyTakeawaysText(e.target.value)}
              placeholder="Fast facts to recall during an interview..."
              className="w-full rounded-lg border border-slate-200 p-2.5 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Interviewer Tips */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Interviewer Follow-up Tip
            </label>
            <input
              type="text"
              value={interviewTips}
              onChange={(e) => setInterviewTips(e.target.value)}
              placeholder="e.g. Interviewer might ask about memory overhead or boxing..."
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-98 transition-all"
            >
              <Check className="h-4 w-4" />
              <span>{editingQuestion ? 'Save Changes' : 'Create Question'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
