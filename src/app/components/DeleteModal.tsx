function DeleteModal({
  handleCancelDelete,
  handleConfirmDelete,
}: {
  handleCancelDelete: () => void;
  handleConfirmDelete: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Deleting Todo
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this todo? This action cannot be
          undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancelDelete}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            No
          </button>
          <button
            onClick={handleConfirmDelete}
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
