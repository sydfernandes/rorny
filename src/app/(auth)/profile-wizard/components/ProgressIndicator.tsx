"use client"

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const progress = Math.round((currentStep / totalSteps) * 100)
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-sm font-medium">
          {progress}% Complete
        </span>
      </div>
      
      <div 
        role="progressbar" 
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Profile completion progress"
        className="h-2 bg-secondary rounded-full overflow-hidden"
      >
        <div 
          className="h-full bg-primary transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
