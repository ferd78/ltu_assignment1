interface StepButtonProps {
  number: number;
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  canDelete: boolean;
  theme: string | undefined;
}

export default function StepButton({ 
  number, 
  isActive, 
  onClick, 
  onDelete, 
  canDelete,
  theme 
}: StepButtonProps) {
  const buttonBg = theme === 'dark' ? 'bg-lighterblue' : 'bg-tealzero';

  return (
    <div className="flex items-center gap-2">
      <div className={`w-24 h-10 rounded-md flex items-center justify-center mb-4 ${buttonBg}`}>
        <button 
          onClick={onClick}
          className={`font-semibold text-white cursor-pointer ${
            isActive ? 'underline underline-offset-4' : 'hover:underline hover:underline-offset-4'
          }`}
        >
          Step {number}
        </button>
      </div>
      {canDelete && (
        <button
          onClick={onDelete}
          className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold hover:bg-red-600 mb-4"
        >
          ×
        </button>
      )}
    </div>
  );
}