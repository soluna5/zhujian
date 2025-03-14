<div className="fixed inset-0 bg-gradient-to-b from-[#0a1f44] to-[#051029] flex flex-col items-center justify-center z-50">
  <div className="w-full max-w-md px-4">
    <div className="mb-8 text-center">
      <h2 className="font-playfair text-3xl text-[#d4af37] mb-2">{title}</h2>
      <p className="text-[#ffffff]">{message}</p>
    </div>
    
    <div className="h-2 bg-[#132a4e] rounded-full overflow-hidden mb-4">
      <div 
        className="h-full bg-[#d4af37] transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    
    <div className="text-right text-sm text-[#d4af37]">
      {progress}%
    </div>
  </div>
</div> 