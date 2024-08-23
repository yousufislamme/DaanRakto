const Popup = () => {
  return (
    <div className="absolute -bottom-12 rounded-lg bg-teal-600 px-10 py-10 shadow-xl">
      <div className="grid grid-cols-3 gap-5">
        <div>
          <h4 className="text-xl font-bold">Blood have</h4>
          <span className="inline-block text-center text-lg">10k</span>
        </div>
        <div>
          <h4 className="text-xl font-bold">Blood have</h4>
          <span className="inline-block text-center text-lg">10k</span>
        </div>
        <div>
          <h4 className="text-xl font-bold">Blood have</h4>
          <span className="inline-block text-center text-lg">10k</span>
        </div>
      </div>
    </div>
  );
};

export default Popup;
