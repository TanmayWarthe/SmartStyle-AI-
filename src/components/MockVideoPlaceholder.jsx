export default function MockVideoPlaceholder() {
  return (
    <div className="bg-brand-dark rounded-lg p-8 border-8 border-gray-700 shadow-2xl">
      <div className="aspect-video bg-brand-darker rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 bg-brand-accent rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-black" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </div>
          <p className="text-gray-400 text-lg">Demo Video Placeholder</p>
          <p className="text-gray-500 text-sm mt-2">Click to play demo</p>
        </div>
      </div>
    </div>
  );
}
